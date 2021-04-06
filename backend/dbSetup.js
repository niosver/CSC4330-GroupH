const mysql = require("mysql");
const dotenv = require('dotenv');
const util = require('util');

dotenv.config();

const config = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB,
};
const conn = mysql.createConnection(config);
conn.connect();

const query = util.promisify(conn.query).bind(conn);
const end = util.promisify(conn.end).bind(conn);

const setF = 'SET FOREIGN_KEY_CHECKS = 0;'
const drop1 = `DROP TABLE IF EXISTS Account;`
const drop2 = `DROP TABLE IF EXISTS Customer;`
const drop3 = `DROP TABLE IF EXISTS BikeDock;`
const drop4 = `DROP TABLE IF EXISTS Transaction;`
const resetF = 'SET FOREIGN_KEY_CHECKS = 1;'
const dock = `CREATE TABLE BikeDock(
    bike_dock_number INT,
    number_of_bikes INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    PRIMARY KEY (bike_dock_number)
);`
const cust = `CREATE TABLE Customer(
    customer_id INT AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    birthdate DATE NOT NULL,
    email VARCHAR(100),
    cc_number VARCHAR(16) NOT NULL,
    cc_name VARCHAR(100) NOT NULL,
    billing_address VARCHAR(100) NOT NULL,              
    PRIMARY KEY (customer_id)
);`
const trans = `CREATE TABLE Transaction(
    transaction_id INT AUTO_INCREMENT,
    price INT,
    damage_fee INT,
    cc_number VARCHAR(16) NOT NULL,              
    start_date DATETIME NOT NULL,
    end_date DATETIME,
    customer_id INT NOT NULL,
    origin_dock INT NOT NULL,
    destination_dock INT,
    status ENUM('in_progress','complete') NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (origin_dock) REFERENCES BikeDock(bike_dock_number),
    FOREIGN KEY (destination_dock) REFERENCES BikeDock(bike_dock_number),
    PRIMARY KEY (transaction_id)
);`
const acc = `CREATE TABLE Account(
    username VARCHAR(50),
    password VARCHAR(60),
    account_type ENUM('owner','manager','customer') NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    PRIMARY KEY(username)
);`
const c1 = `INSERT INTO Customer(firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) 
    VALUES("John","Doe","123 N. Madeup St.",now(),"user1@email.com","1234567891011121","John Doe","123 N. Madeup St.");`
const s1 = `SET @a_id = LAST_INSERT_ID();`
const a1 = `INSERT INTO Account VALUES("user1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","customer",@a_id);`
const c2 = `INSERT INTO Customer(firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) 
    VALUES("Jane","Doe","123 N. Madeup Ave.",now(),"user2@email.com","1211101987654321","Jane Doe","123 N. Madeup Ave.");`
const s2 = `SET @a_id = LAST_INSERT_ID();`
const a2 = `INSERT INTO Account VALUES("user2","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","customer",@a_id);`
const m1 = `INSERT INTO Account VALUES("man1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","manager",null);`
const o1 = `INSERT INTO Account VALUES("own1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","owner",null);`
const d1 = `INSERT INTO BikeDock VALUES(1,3,"Location 1");`
const d2 = `INSERT INTO BikeDock VALUES(2,3,"Location 2");`
const d3 = `INSERT INTO BikeDock VALUES(3,3,"Location 3");`
const d4 = `INSERT INTO BikeDock VALUES(4,3,"Location 4");`
const d5 = `INSERT INTO BikeDock VALUES(5,3,"Location 5");`
const d6 = `INSERT INTO BikeDock VALUES(6,3,"Location 6");`
const d7 = `INSERT INTO BikeDock VALUES(7,3,"Location 7");`
const d8 = `INSERT INTO BikeDock VALUES(8,3,"Location 8");`
const d9 = `INSERT INTO BikeDock VALUES(9,3,"Location 9");`
const d10 = `INSERT INTO BikeDock VALUES(10,3,"Location 10");`



async function reset() {
    await query(setF);
    await query(drop1);
    await query(drop2);
    await query(drop3);
    await query(drop4);
    await query(resetF);
    await query(dock);
    await query(cust);
    await query(trans);
    await query(acc);
    await query(c1);
    await query(s1);
    await query(a1);
    await query(c2);
    await query(s2);
    await query(a2);
    await query(m1);
    await query(o1);
    await query(d1);
    await query(d2);
    await query(d3);
    await query(d4);
    await query(d5);
    await query(d6);
    await query(d7);
    await query(d8);
    await query(d9);
    await query(d10);

    await end();
}
module.exports = reset;

