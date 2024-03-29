import express from "express";
import { Account_Type } from "../Account/account.interface";
import { Logger } from "../Logger";
import { Transaction, Status } from "./transaction.interface";

const router = express.Router();
/*  Rent is sent only dock number and cookie
    Return is sent only dock and cookie
*/
const get_cc_number = "SELECT cc_number FROM Customer WHERE customer_id=?;";
const insert_trans =
	"INSERT INTO Transaction(price,cc_number,start_date,customer_id,origin_dock,status)" +
	"VALUES(?,?,?,?,?,?);";
const update_trans =
	"UPDATE Transaction SET end_date=?,price=?,destination_dock=?,status=?,damage_fee=0 WHERE transaction_id=?;";
const add_fee = "UPDATE Transaction SET damage_fee=? WHERE transaction_id=?;";
const lookup_trans =
	'SELECT * FROM Transaction WHERE transaction_id=? AND customer_id=? AND status="in_progress";';
const get_active_trans = 'SELECT * FROM Transaction WHERE customer_id=? AND status="in_progress";';
const get_complete_trans = 'SELECT * FROM Transaction WHERE customer_id=? AND status="complete";';

const get_bike_number = "SELECT * FROM BikeDock WHERE bike_dock_number=?;";
const insert_bike_number = "UPDATE BikeDock SET number_of_bikes=? WHERE bike_dock_number=?;";

router.post("/rent", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	let result;
	try {
		if (!req.session.customer_id) {
			res.status(400).send("Please login");
			return next();
		}
		db.beginTransaction();
		let id = req.session.customer_id;
		if (id == undefined) {
			res.status(400).send("Missing account info for rental.");
			return next();
		}
		result = await db.query(get_cc_number, [id]);
		const cc_num = result[0].cc_number;
		let now = new Date();
		let trans = new Transaction(cc_num, now, id, json.dock);
		result = await db.query(insert_trans, [
			trans.price,
			trans.cc_number,
			trans.start_date,
			trans.customer_id,
			trans.origin_dock,
			trans.status,
		]);
		const trans_id = result.insertId;
		result = await db.query(get_bike_number, [json.dock]);
		if (result[0].number_of_bikes > 0) {
			let num = result[0].number_of_bikes - 1;
			result = await db.query(insert_bike_number, [num, json.dock]);
		} else {
			db.rollback();
			res.status(400).send("Unable to rent bike");
			return next();
		}

		if (trans_id >= 0) {
			db.commit();
			res.status(200).send({ transaction_id: trans_id, origin_dock: trans.origin_dock });
		} else throw Error;
	} catch (error) {
		db.rollback();
		Logger.log(error, Logger.ERROR);
		res.status(400).send("Unable to process rental");
	}
});

router.post("/return", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	let now = new Date();
	let result;
	try {
		if (!req.session.customer_id) {
			res.status(400).send("Please login");
			return next();
		}
		const request_trans_id = parseInt(json.transaction_id, 10); // extra safety in case transaction_id is sent as string
		db.beginTransaction();
		result = await db.query(lookup_trans, [request_trans_id, req.session.customer_id]);
		if (result.length > 0) {
			const trans = result[0];
			let u_trans = new Transaction(
				trans.cc_number,
				trans.start_date,
				trans.customer_id,
				trans.origin_dock
			);
			u_trans.set_end_date(now);
			if (!json.destination_dock) {
				throw new Error("No destination dock was supplied");
			}
			u_trans.set_destination(json.destination_dock);
			let price = u_trans.calculate_price();
			u_trans.set_status(Status.complete);
			await db.query(update_trans, [
				now,
				price,
				json.destination_dock,
				u_trans.status,
				json.transaction_id,
			]);

			result = await db.query(get_bike_number, [json.destination_dock]);
			if (result[0].number_of_bikes < 6) {
				let num = result[0].number_of_bikes + 1;
				result = await db.query(insert_bike_number, [num, json.destination_dock]);
			} else {
				db.rollback();
				res.status(400).send("Unable to return bike");
				return next();
			}

			db.commit();
			res.status(200).send({ price: price });
		} else {
			db.rollback();
			res.status(400).send("Unable to find transaction");
		}
	} catch (error) {
		db.rollback();
		res.status(400).send("Unable to process return");
		Logger.log(error, Logger.ERROR);
	}
});
/*  Req contains transaction_id and damage charge
 */
router.post("/damage_charge", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	try {
		if (!(req.session.account_type == Account_Type.manager)) {
			res.status(400).send("Please login as a manager");
			return next();
		}
		if (json.damage_fee > 0 && json.damage_fee < 200) {
			await db.query(add_fee, [json.damage_fee, json.transaction_id]);
			res.status(200).send({
				transaction_id: json.transaction_id,
				damage_fee: json.damage_fee,
			});
			return next();
		} else {
			res.status(400).send("Error: fee above maximum");
			return next();
		}
	} catch (error) {
		res.status(400).send("Unable to process fee.");
		Logger.log(error, Logger.ERROR);
	}
});

router.get("/active_transactions", async function (req, res, next) {
	let db = req.app.locals.db;
	type TransRes = { transaction_id: number; origin_dock: number; start_date: Date };
	let list: TransRes[] = [];
	try {
		if (req.session.customer_id) {
			let result = await db.query(get_active_trans, [req.session.customer_id]);
			for (let i = 0; i < result.length; i++) {
				const { transaction_id, origin_dock, start_date } = result[i];
				list.push({ transaction_id, origin_dock, start_date });
			}
			res.status(200).send({ active_transactions: list });
		} else {
			res.status(400).send("Unable to determine customer_id, are you logged it?");
			return next();
		}
	} catch (error) {
		res.status(400).send("Unable to process request");
		Logger.log(error, Logger.ERROR);
	}
});
router.get("/complete_transactions", async function (req, res, next) {
	let db = req.app.locals.db;
	type TransRes = {
		origin_dock: number;
		destination_dock: number;
		start_date: Date;
		end_date: Date;
		damage_fee: number;
		price: number;
	};
	let list: TransRes[] = [];
	try {
		if (req.session.customer_id) {
			let result = await db.query(get_complete_trans, [req.session.customer_id]);
			for (let i = 0; i < result.length; i++) {
				const {
					origin_dock,
					destination_dock,
					start_date,
					end_date,

					price,
				} = result[i];
				let { damage_fee } = result[i];
				damage_fee = damage_fee ? damage_fee : 0;
				list.push({
					origin_dock,
					destination_dock,
					start_date,
					end_date,
					damage_fee,
					price,
				});
			}
			res.status(200).send({ complete_transactions: list });
		} else {
			res.status(400).send("Unable to determine customer_id, are you logged it?");
			return next();
		}
	} catch (error) {
		res.status(400).send("Unable to process request");
		Logger.log(error, Logger.ERROR);
	}
});

const get_last_hour =
	"SELECT transaction_id,start_date,end_date,origin_dock,destination_dock FROM Transaction WHERE damage_fee=0 AND end_date >= curdate() - INTERVAL 1 HOUR;";
router.get("/recent_returns", async function (req, res, next) {
	let db = req.app.locals.db;
	try {
		if (!(req.session.account_type == Account_Type.manager)) {
			res.status(400).send("Please login as a manager");
			return next();
		}
		let result = await db.query(get_last_hour);
		res.status(200).send(result);
	} catch (error) {
		res.status(400).send("Unable to process request.");
		Logger.log(error, Logger.ERROR);
	}
});

export default router;
