import makeDb from "../mysqlpromisify";
import sqlConfig from "../sqlinterface";
import dotenv from "dotenv";
import { Transaction, Status } from "./transaction.interface";
import fs from "fs";

dotenv.config();

const config: sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
};

const db = makeDb(config);

const checkMissing = 'SELECT transaction_id FROM Transaction WHERE status="in_progress" AND start_date >= curdate() + INTERVAL 1 DAY;';
const add_fee = 'UPDATE Transaction SET damage_fee=?,status="complete",end_date=?,price=? WHERE transaction_id=?;';
export async function missing() {
    try {
        var results:any = await db.query(checkMissing,[]);
        for(var i=0;i<results.length;i++) {
            await db.query(add_fee,[500,new Date(),0,results[0].transaction_id]);
        }
    }
    catch (error){
        console.log(error);
		return;
    }
}