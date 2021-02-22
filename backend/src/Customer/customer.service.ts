import express from "express";
import {Customer} from "./customer.interface"

var router = express.Router();

router.post("/create_customer", async function(req,res) {
    res.send("Not implemented yet.")
});

export default router