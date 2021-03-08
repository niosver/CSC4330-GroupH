import express from "express";
import { Account_Type, Account } from "./account.interface";
import { Customer } from "../Customer/customer.interface";
import bcrypt from "bcrypt";
import { Logger } from "../Logger";

const saltRounds = 10;
const router = express.Router();

const create_customer = "INSERT INTO Customer (firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) VALUES(?,?,?,?,?,?,?,?);";
const create_account = "INSERT INTO Account VALUES(?,?,?,?);";
const check_account_type = "SELECT account_type FROM Account WHERE username = ?;";
const check_login = "SELECT Count(*) FROM Account WHERE username = ? AND password = ?;";
const get_customer_id = "SELECT customer_id FROM Account WHERE username = ?;";
/**
 * @todo Troubleshoot:
 * {
 *   "error": {
 *       "code": "ER_PARSE_ERROR",
 *       "errno": 1064,
 *       "sqlMessage": "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''John','Doe','123 N. Madeup St.','1979-12-31 18:00:00.000','user1@email.com','41' at line 1",
 *       "sqlState": "42000",
 *       "index": 0,
 *       "sql": "INSERT INTO Customer('John','Doe','123 N. Madeup St.','1979-12-31 18:00:00.000','user1@email.com','411111111111111','John Doe','123 N. Madeup St.')"
 *    }
 * }
 */
router.post("/signup", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	Logger.log(json);
	try {
		await db.beginTransaction();
		/* not sure how you want to implement but client will need to know if the account already exists */
		// const check_account_exists = "SELECT customer_id FROM Account WHERE username = ?";
		// const account = await db.query(check_account_exists, [json.email]);
		// if (account) {
		// 	res.status(200).send("Account with that email already exists");
		//  next();
		// }
		let newC = new Customer(
			json.first_name,
			json.last_name,
			json.address,
			json.birthdate,
			json.email,
			json.cc_number,
			json.cc_name,
			json.billing_address
		);
		let customer = await db.query(create_customer, [
			newC.first_name,
			newC.last_name,
			newC.address,
			newC.birthdate,
			newC.email,
			newC.cc_number,
			newC.cc_name,
			newC.billing_address,
		]);
		let p_hash = await bcrypt.hash(json.password, saltRounds);
		let newA = new Account(json.username, p_hash, Account_Type.customer, customer.insertId);
		await db.query(create_account, [
			newA.username,
			newA.password,
			newA.account_type,
			newA.customer_id,
		]);
		req.session.username = newA.username;
		db.commit();
		res.status(200).send("OK");
	} catch (error) {
		db.rollback();
		res.status(400).send("Error creating new account");
		Logger.log(error, Logger.ERROR);
	}
});

router.post("/create_manager", async function (req, res) {
	let db = req.app.locals.db;
	try {
		let account = req.session.username;
		let type = await db.query(check_account_type, [account]);
		if (type != Account_Type.manager && type != Account_Type.owner) {
			res.status(500).send("Account does not have required permissions");
			return;
		}
		await db.beginTransaction();
		let json = req.body;
		let p_hash = await bcrypt.hash(json.password, saltRounds);
		let newA = new Account(json.username, p_hash, Account_Type.manager);
		await db.query(create_account, [
			newA.username,
			newA.password,
			newA.account_type,
			newA.customer_id,
		]);
		db.commit();
		res.status(200).send("OK");
	} catch (error) {
		db.rollback();
		res.status(400).send("Error creating new account");
		Logger.log(error, Logger.ERROR);
	}
});

router.get("/login", async function (req, res) {
	let db = req.app.locals.db;
	try {
		let json = req.body;
		let p_hash = await bcrypt.hash(json.password, saltRounds);
		let count = await db.query(check_login, [json.username, p_hash]);
		if (count == 1) {
			req.session.username = json.username;
			let customer_id = await db.query(get_customer_id, [json.username]);
			req.session.customer_id = customer_id;
			res.status(200).send("OK");
		} else {
			res.status(400).send("Account not found");
		}
	} catch (error) {
		res.status(400).send("Error retrieving account");
		Logger.log(error, Logger.ERROR);
	}
});

router.post("/logout", async function (req, res) {
	try {
		req.session.destroy(function (err) {
			res.status(200).send("OK");
		});
	} catch (error) {
		res.status(400).send("Error logging out");
		Logger.log(error, Logger.ERROR);
	}
});

export default router;
