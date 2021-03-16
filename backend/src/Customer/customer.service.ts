import express from "express";
import { Customer } from "./customer.interface";

const router = express.Router();

const get_customer = "SELECT * FROM Customer WHERE customer_id = ?;";
const update_customer =
	"UPDATE Customer SET first_name=?,last_name=?,address=?,birthdate=?,email=?," +
	"cc_number=?,cc_name=?,billing_address=? WHERE customer_id = ?;";

router.put("/update_customer", async function (req, res) {
	res.send("Not implemented");
});

router.get("/me", async function (req, res) {
	try {
		let db = req.app.locals.db;
		let results = await db.query(get_customer, [req.session.customer_id]);
		let customer = new Customer(
			results[0].firstname,
			results[0].lastname,
			results[0].address,
			results[0].birthdate,
			results[0].email,
			"",
			"",
			""
		);
		res.status(200).send(customer);
	} catch {
		res.status(400).send("Failed to retrieve correctly formated customer data.");
	}
});

export default router;
