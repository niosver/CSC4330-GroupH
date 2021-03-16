import express from "express";
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
	"UPDATE Transaction SET end_date=?,price=?,destination_dock=?,status=? WHERE transaction_id=?;";
const get_trans = "SELECT * FROM Transaction WHERE transaction_id=?;";
const add_fee = "UPDATE Transaction SET damage_fee=? WHERE transaction_id=?;";

router.post("/rent", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	try {
		let id = req.session.customer_id;
		if (id == undefined) {
			res.status(400).send("Missing account info for rental.");
			return next();
		}
		let cc_num = await db.query(get_cc_number, [id]);
		let now = new Date();
		let trans = new Transaction(cc_num, now, id, json.dock);
		let result = await db.query(insert_trans, [
			trans.price,
			trans.cc_number,
			trans.start_date,
			trans.customer_id,
			trans.origin_dock,
			trans.status,
		]);
		let trans_id = result.insertId;
		if (trans_id >= 0) {
			if (req.session.current_transactions == undefined) {
				req.session.current_transactions = [];
			}
			req.session.current_transactions.push(trans_id);
			res.status(200).send(trans_id);
		} else throw Error;
	} catch (error) {
		Logger.log(error, Logger.ERROR);
		res.status(400).send("Unable to process rental");
	}
});

router.post("/return", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	let now = new Date();
	try {
		let e = req.session.current_transactions?.indexOf(json.transaction_id);
		if (e && e != -1) {
			db.beginTransaction();
			let trans = await db.query(get_trans, [json.transaction_id]);
			let u_trans = new Transaction(
				trans[0].cc_number,
				trans[0].start_date,
				trans[0].customer_id,
				trans[0].origin_dock
			);
			u_trans.set_end_date(now);
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
			req.session.current_transactions?.splice(e, 1);
			db.commit();
			res.status(200).send(price);
		} else throw Error;
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
		if (json.damage_fee > 0 && json.damage_fee < 200) {
			await db.query(add_fee, [json.damage_fee, json.transaction_id]);
			res.status(200).send("OK");
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

export default router;
