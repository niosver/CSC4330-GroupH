import express from "express";
import {Account_Type,Account} from "./account.interface"
import {Customer} from "../Customer/customer.interface"
import bcrypt from "bcrypt";

const saltRounds = 10;
var router = express.Router();
const create_customer = "INSERT INTO Customer(?,?,?,?,?,?,?,?)"
const create_account = "INSERT INTO Account(?,?,?,?)"

router.post('/signup', async function(req,res) {
    let db = req.app.locals.db;
    try{
        await db.beginTransaction();
        let json = req.body;
        let newC = new Customer(json.first_name,json.last_name,json.address,json.birthdate,json.email,json.cc_number,json.cc_name,json.billing_address);
        let customer = await db.query(create_customer,[newC.first_name,newC.last_name,newC.address,newC.birthdate,newC.email,newC.cc_number,newC.cc_name,newC.billing_address]);
        let p_hash = await bcrypt.hash(json.password,saltRounds);
        let newA = new Account(json.username,p_hash,Account_Type.customer,customer.customer_id);
        await db.query(create_account,[newA.username,newA.password,newA.account_type,newA.customer_id]);
        db.commit();
        res.status(200).send("OK");
    }
    catch{
        db.rollback();
        res.status(400).send("Error Creating new customer");
    }
});

router.post('/create_manager', async function(req,res) {
    let db = req.app.locals.db;
    try{
        await db.beginTransaction();
        let json = req.body;
        let p_hash = await bcrypt.hash(json.password,saltRounds);
        let newA = new Account(json.username,p_hash,Account_Type.manager);

        await db.query(create_account,[newA.username,newA.password,newA.account_type,newA.customer_id]);
        db.commit();
        res.status(200).send("OK");
    }
    catch{
        db.rollback();
        res.status(400).send("Error creating new account");
    }
});

router.get('/login', async function(req,res) {
    res.send("Not implemented");
});


export default router