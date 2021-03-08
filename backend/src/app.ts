import express from "express"
import makeDb from "./mysqlpromisify"
import sqlConfig from "./sqlinterface"
import dotenv from "dotenv"
import accounts from "./Account/account.service"
import customers from "./Customer/customer.service"
import session from "express-session"

declare module "express-session" {
    export interface SessionData {
        username: string,
        customer_id: number
    }
}

dotenv.config()
const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2

app.use(session({
    //@ts-ignore
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: TWO_HOURS,
        sameSite: true
    }
}));

const port = process.env.PORT || 8000;

const config: sqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
}

const db = makeDb(config);
app.locals.db = db;

setInterval(async () => {
    await db.ping()
},1000);

app.use('/accounts', accounts);

app.use("/customer",customers);

app.listen(port, () => {
    console.log(`Sever running on port ${port}`)
});