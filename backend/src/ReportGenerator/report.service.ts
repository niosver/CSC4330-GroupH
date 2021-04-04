import express from "express";
import { Account_Type } from "../Account/account.interface";
import { gen } from "./reportGen";
import fs from "fs";

const router = express.Router();

router.get("/get_report", async function (req,res,next) {
    if(!(req.session.account_type == Account_Type.owner)) {
        const txt = await fs.readFileSync("./report.json").toString()
        const report = JSON.parse(txt)
        res.status(200).send(report)
    }
    else {
        res.status(400).send("Incorrect Account Type");
    }
});

router.get("/regenerate_report", async function (req,res,next) {
    if(!(req.session.account_type == Account_Type.owner)) {
        await gen()
        const txt = await fs.readFileSync("./report.json").toString()
        const report = JSON.parse(txt)
        res.status(200).send(report)
    }
    else {
        res.status(400).send("Incorrect Account Type");
    }
});

export default router;