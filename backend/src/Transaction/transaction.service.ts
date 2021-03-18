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
const add_fee = "UPDATE Transaction SET damage_fee=? WHERE transaction_id=?;";
const lookup_trans ="SELECT * FROM Transaction WHERE transaction_id=? AND customer_id=? AND status=\"in_progress\";"
const get_trans = "SELECT * FROM Transaction WHERE customer_id=? AND status=\"in_progress\";"

router.post("/rent", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	let result;
	try {
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
		if (trans_id >= 0) {
			if (req.session.current_transactions == undefined) {
				req.session.current_transactions = [];
			}
			req.session.current_transactions.push(trans_id);
			res.status(200).send({ transaction_id: trans_id });
		} else throw Error;
	} catch (error) {
		Logger.log(error, Logger.ERROR);
		res.status(400).send("Unable to process rental");
	}
});
/*
Current implementation of storing transactions in memory does not work. For example:
	1. user logs in as user1 => session: {customer_id: 1, transactions: []}
	2. user1 rents bike from dock 1 => session: {customer_id: 1, transactions: [3]}
	3. user1 logs out  => session: undefined
	4. user1 logs back in => session: {customer_id: 1, transactions: []}
	5. user1 returns bike to dock 1 => {customer_id: 1, transactions: []} => [] does not contain 3
	
Fix1: remove transactions entirely from session and just query in this function
	- await `SELECT * FROM Transaction WHERE transaction_id=id1, customer_id=id2, status=in_progress`

Fix2: initialize transactions in session inside login function
	- req.session.current_transaction = await `SELECT * FROM Transaction WHERE customer_id=id, status=in_progress`
	- may be complicated to add `if customer` check
	- adds additional error case for login if transaction query fails

*/
router.post("/return", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	let now = new Date();
	let result;
	try {
		const request_trans_id = parseInt(json.transaction_id, 10); // extra safety in case transaction_id is sent as string
		db.beginTransaction();
		result = await db.query(lookup_trans,[request_trans_id,req.session.customer_id]);
		if(result.length>0) {
			const trans = result[0];
			let u_trans = new Transaction(
				trans.cc_number,
				trans.start_date,
				trans.customer_id,
				trans.origin_dock
			);
			u_trans.set_end_date(now);
			if(!json.destination_dock) {
				throw new Error;
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
			db.commit();
			res.status(200).send({ price: price });
		}
		else {
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

router.get("/active_transactions", async function (req,res,next) {
	let db = req.app.locals.db;
	let list:number[]=[];
	try {
		if(req.session.customer_id) {
			let result = await db.query(get_trans,[req.session.customer_id]);
			for(var i=0;i<result.length;i++) {
				list.push(result[i].transaction_id);
			}
			res.status(200).send({transaction_ids: list});
		}
		else {
			res.status(400).send("Unable to determine customer_id, are you logged it?");
			return next();
		}
	}
	catch (error) {
		res.status(400).send("Unable to process request");
		Logger.log(error, Logger.ERROR);
	}
});

export default router;
