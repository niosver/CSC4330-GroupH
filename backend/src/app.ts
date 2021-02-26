import express from "express"
import makeDb from "./mysqlpromisify"
import sqlConfig from "./sqlinterface"
import dotenv from "dotenv"
import accounts from "./Account/account.service"
import customers from "./Customer/customer.service"

dotenv.config()
const app = express();
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

app.use("/customer",customers)

app.listen(port, () => {
    console.log(`Sever running on port ${port}`)
});