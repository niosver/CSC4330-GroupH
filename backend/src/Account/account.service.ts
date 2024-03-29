import express from "express";
import { Account_Type, Account } from "./account.interface";
import { Customer } from "../Customer/customer.interface";
import bcrypt from "bcrypt";
import { Logger } from "../Logger";

const saltRounds = 10;
const router = express.Router();

const create_customer =
	"INSERT INTO Customer (firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) VALUES(?,?,?,?,?,?,?,?);";
const create_account = "INSERT INTO Account VALUES(?,?,?,?);";
const check_account_type = "SELECT account_type FROM Account WHERE username = ?;";
const check_login = "SELECT Count(*) FROM Account WHERE username = ? AND password = ?;";
const get_customer_id = "SELECT customer_id FROM Account WHERE username = ?;";
const unique_email = "SELECT Count(*) AS count FROM Customer WHERE email = ?;";
const unique_username = "SELECT Count(*) As count FROM Account WHERE username = ?;";

router.post("/signup", async function (req, res, next) {
	let db = req.app.locals.db;
	let json = req.body;
	try {
		let unique = await db.query(unique_email, [json.email]);
		if (unique[0].count > 0) {
			res.status(400).send("Account with that email already exists");
			return next();
		}
		unique = await db.query(unique_username, [json.username]);
		if (unique[0].count > 0) {
			res.status(400).send("Account with that username already exists");
			return next();
		}
		await db.beginTransaction();
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
		req.session.customer_id = customer.insertId;
		db.commit();
		res.status(200).send({ username: newA.username, account_type: newA.account_type });
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
		type = type[0].account_type;
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

router.post("/login", async function (req, res) {
	let db = req.app.locals.db;
	let json = req.body;
	try {
		const result = await db.query("select * from Account where username = ?", [json.username]);
		const user = result[0];
		/* Not sure best way to handle but bcrypt.compare must be used because
		   a new hash will be different than the original hash despite sharing the same unhashed password */
		// let p_hash = await bcrypt.hash(json.password, saltRounds);
		// let count = await db.query(check_login, [json.username, p_hash]);
		await bcrypt.compare(json.password, user.password, async function (err, same) {
			if (err) {
				Logger.log(err, Logger.ERROR);
			}
			if (same) {
				req.session.username = json.username;
				req.session.account_type = user.account_type;
				req.session.customer_id = user.customer_id;
				res.status(200).send({ username: json.username, account_type: user.account_type });
			} else {
				res.status(400).send("Account not found");
			}
		});
	} catch (error) {
		res.status(400).send("Error retrieving account");
		Logger.log(error, Logger.ERROR);
	}
});
/* Method for client auth class to call to check if user is logged in before
   redirecting to login page. Client uses this method for customer/owner/manager
 */
router.get("/me", async function (req, res) {
	if (!req.session.username) {
		res.status(401).send("User not authenticated/signed-in");
	} else {
		res.status(200).send({
			username: req.session.username,
			account_type: req.session.account_type,
		});
	}
});
router.post("/logout", async function (req, res) {
	try {
		if (req.session.username) {
			res.clearCookie("express_sid");
			req.session.destroy(() => {
				res.status(200).send("OK");
			});
		} else {
			res.status(400).send("No user to logout");
		}
	} catch (error) {
		res.status(400).send("Error logging out");
		Logger.log(error, Logger.ERROR);
	}
});

export default router;
