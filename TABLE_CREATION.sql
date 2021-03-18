/**
 * SQL to initialize and populate tables in database bikeapp
 * 
 * Requires user with all privileges granted in database 'bikeapp'
 *
 * Usage: mysql -u user -p < TABLE_CREATION.sql
 */

/* Select database */
use bikeapp;

/* Turn off foreign key checks to force drop tables */
SET FOREIGN_KEY_CHECKS = 0;

/* Drop all tables */
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS BikeDock;
DROP TABLE IF EXISTS Transaction;

/* Turn foreign key checks back on */
SET FOREIGN_KEY_CHECKS = 1;

/* Create tables */
CREATE TABLE BikeDock(
    bike_dock_number INT,
    number_of_bikes INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    PRIMARY KEY (bike_dock_number)
);

CREATE TABLE Customer(
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
);

CREATE TABLE Transaction(
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
);

CREATE TABLE Account(
    username VARCHAR(50),
    password VARCHAR(60),
    account_type ENUM('owner','manager','customer') NOT NULL,
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    PRIMARY KEY(username)
);

/* Insert dummy customer "user1" with hashed password "password" into Account and Customer tables */
INSERT INTO Customer(firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) 
    VALUES("John","Doe","123 N. Madeup St.",now(),"user1@email.com","1234567891011121","John Doe","123 N. Madeup St.");
SET @a_id = LAST_INSERT_ID();
INSERT INTO Account VALUES("user1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","customer",@a_id);

/* Insert dummy customer "user2" with hashed password "password"into Account and Customer tables */
INSERT INTO Customer(firstname,lastname,address,birthdate,email,cc_number,cc_name,billing_address) 
    VALUES("Jane","Doe","123 N. Madeup Ave.",now(),"user2@email.com","1211101987654321","Jane Doe","123 N. Madeup Ave.");
SET @a_id = LAST_INSERT_ID();
INSERT INTO Account VALUES("user2","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","customer",@a_id);

/* Insert dummy manager "man1" with hashed password "password" into Account table */
INSERT INTO Account VALUES("man1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","manager",null);

/* Insert dummy owner "own1" with hashed password "password" into Account table*/
INSERT INTO Account VALUES("own1","$2b$10$y3mRo0u3oDcB4M1iUcxRVe0DtfYtPeZpY0W5sYh1g7sFkeqLvKHdO","owner",null);

/* Insert 10 docks into BikeDock table*/
INSERT INTO BikeDock VALUES(1,3,"Location 1");
INSERT INTO BikeDock VALUES(2,3,"Location 2");
INSERT INTO BikeDock VALUES(3,3,"Location 3");
INSERT INTO BikeDock VALUES(4,3,"Location 4");
INSERT INTO BikeDock VALUES(5,3,"Location 5");
INSERT INTO BikeDock VALUES(6,3,"Location 6");
INSERT INTO BikeDock VALUES(7,3,"Location 7");
INSERT INTO BikeDock VALUES(8,3,"Location 8");
INSERT INTO BikeDock VALUES(9,3,"Location 9");
INSERT INTO BikeDock VALUES(10,3,"Location 10");