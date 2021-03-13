import express from "express";
import {Customer} from "./customer.interface"

var router = express.Router();

const get_customer = "SELECT * FROM Customer WHERE customer_id = ?;"
const update_customer = "UPDATE Customer SET first_name=?,last_name=?,address=?,birthdate=?,email=?," +
"cc_number=?,cc_name=?,billing_address=? WHERE customer_id = ?;"

router.put("/update_customer", async function(req,res) {
    res.send("Not implemented");
});

router.get("/me", async function(req,res) {
    
    try {
        let db = req.app.locals.db;
        let results = await db.query(get_customer,[req.session.customer_id]);
        if (results instanceof Customer) {
            res.status(200).send(results);
        }
        else throw Error;
    }
    catch {
        res.status(400).send("Failed to retrieve correctly formated customer data.");
    }
});

export default router