import makeDb from "../mysqlpromisify";
import sqlConfig from "../sqlinterface";
import dotenv from "dotenv";
import { DockReport, Report } from "./report.interface";
import fs from "fs";

dotenv.config();

const config: sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
};

const db = makeDb(config);
var results:any;
var result:any;
var dock:DockReport;
const rent_rev = "SELECT SUM(price) AS rev,Count(*) AS num FROM Transaction WHERE status=\"complete\" AND start_date >= curdate() - INTERVAL 1 WEEK;";
const dock_info = "SELECT origin_dock,location,Count(*) AS num,SUM(price) AS rev FROM Transaction LEFT JOIN BikeDock ON Transaction.origin_dock = BikeDock.bike_dock_number WHERE status=\"complete\" AND origin_dock=? AND start_date >= curdate() - INTERVAL 1 WEEK;";
const diff_return = "SELECT Count(*) AS num FROM Transaction WHERE origin_dock=? AND destination_dock!=? AND start_date >= curdate() - INTERVAL 1 WEEK;";
const diff_rent = "SELECT Count(*) As num FROM Transaction WHERE origin_dock!=? AND destination_dock=? AND start_date >= curdate() - INTERVAL 1 WEEK;";
const get_loc = "SELECT location FROM BikeDock WHERE bike_dock_number=?;";
export async function gen() {
	try {
		results = await db.query(rent_rev,[]);
		result = results[0];
		let report = new Report(result.rev,result.rent);
		for(var i = 1;i<=10;i++) {
			results = await db.query(dock_info,[i]);
			result = results[0];
			if(result.bike_dock_number) {
				dock = new DockReport(result.bike_dock_number,result.location,result.num,result.rev);
			}
			else {
				results = await db.query(get_loc,[i]);
				dock = new DockReport(i,results[0].location,result.num,result.rev);
			}
			results = await db.query(diff_return,[i,i]);
			dock.add_other_rent(result.num);
			results = await db.query(diff_rent,[i,i]);
			dock.add_other_return(result.num);
			report.push(dock);
		}
		let data = JSON.stringify(report);
		fs.writeFileSync('./report.json',data,{flag:'w+'});
		return;
	}
	catch (error) {
		console.log(error);
		return;
	}
}