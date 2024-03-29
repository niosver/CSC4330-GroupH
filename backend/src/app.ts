import express from "express";
import makeDb from "./mysqlpromisify";
import sqlConfig from "./sqlinterface";
import dotenv from "dotenv";
import accounts from "./Account/account.service";
import customers from "./Customer/customer.service";
import transactions from "./Transaction/transaction.service";
import reports from "./ReportGenerator/report.service";
import docks from "./Dock/dock.service";
import session from "express-session";
import { Logger, RequestLogger } from "./Logger";
import bodyParser from "body-parser";
import { gen } from "./ReportGenerator/reportGen";
import { missing} from "./Transaction/missingCheck";
import path from "path";
declare module "express-session" {
	export interface SessionData {
		username: string;
		customer_id: number;
		current_transactions: Array<number>;
		account_type: string;
	}
}

dotenv.config();
const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2;
/* Applies logger middleware to routes */
app.use(RequestLogger());

/* Body parser is needed for accessing req.body */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Test route for client */
app.get("/hello", (_req, res) => {
	res.send("hello!");
});

app.use(
	"/api",
	session({
		key: "express_sid",
		//@ts-ignore
		secret: process.env.SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: {
			maxAge: TWO_HOURS,
			sameSite: true,
		},
	})
);

const config: sqlConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
};

const db = makeDb(config);
app.locals.db = db;

/* connection should be managed implicitly by mysql. 
   commenting out to test if connection times out without ping */
setInterval(async () => {
	await db.ping();
}, 1000);

const WEEK = 1000 * 60 * 60 * 24 * 7;
const DAY = 1000 * 60 * 60 * 24;
setInterval(async () => {
	await gen();
}, WEEK);

setInterval(async () => {
	missing();
},DAY);

app.use("/api/accounts", accounts);

app.use("/api/customers", customers);

app.use("/api/transactions", transactions);

app.use("/api/docks", docks);

app.use("/api/reports", reports);

/* serve static middleware and get catch all applied last so express router middleware takes priority */
if (process.env.PRODUCTION) {
	const frontend = path.resolve(__dirname, "../../frontend/build");
	Logger.log("Server running in production");
	app.use(express.static(frontend));
	app.get("/*", (_, res) => {
		res.sendFile(path.join(frontend, "index.html"));
	});
}

export { app };
