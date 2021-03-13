import express from "express";
import makeDb from "./mysqlpromisify";
import sqlConfig from "./sqlinterface";
import dotenv from "dotenv";
import accounts from "./Account/account.service";
import customers from "./Customer/customer.service";
import transaction from "./Transaction/transaction.service";
import session from "express-session";
import { Logger, RequestLogger } from "./Logger";
import bodyParser from "body-parser";

declare module "express-session" {
	export interface SessionData {
		username: string;
		customer_id: number;
		current_transactions: Array<number>;
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

const port = process.env.PORT || 8000;

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
// setInterval(async () => {
// 	await db.ping();
// }, 1000);

app.use("/api/accounts", accounts);

app.use("/api/customer", customers);

app.use("/api/transaction", transaction);

app.listen(port, () => {
	Logger.log(`Sever running on port ${port}`);
	/* client uses port 3000 sets proxy for server at port 8000 in development environment */
	if (port != 8000) {
		Logger.log(
			"Running client/server concurrently in development requires server port set to 8000",
			Logger.WARN
		);
	}
});
