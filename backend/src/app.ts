import express from 'express';
import makeDb from './mysqlpromisify';
import sqlConfig from './sqlinterface';
import dotenv from 'dotenv';
import accounts from './Account/account.service';
import customers from './Customer/customer.service';
import session from 'express-session';
import { Logger, RequestLogger } from './Logger';

declare module 'express-session' {
  export interface SessionData {
    username: string;
    customer_id: number;
  }
}

dotenv.config();
const app = express();
const TWO_HOURS = 1000 * 60 * 60 * 2;

app.use(RequestLogger());
app.use(
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

setInterval(async () => {
  await db.ping();
}, 1000);

/* Test route for client */
app.get('/hello', (_req, res) => {
  res.send('hello!');
});
app.use('/accounts', accounts);

app.use('/customer', customers);

app.listen(port, () => {
  const message = `Sever running on port ${port}`;
  Logger.log(message);
});
