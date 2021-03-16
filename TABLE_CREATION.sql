/**
 * SQL to initialize and populate tables in database bikeapp
 * 
 * Requires user with all privileges granted in database 'bikeapp'
 *
 * Usage: mysql -u user -p < TABLE_CREATION.sql
 */

/* select database */
use bikeapp;

/* turn off foreign key checks to force drop tables */
SET FOREIGN_KEY_CHECKS = 0;

/* drop all tables */
DROP TABLE IF EXISTS Account;
DROP TABLE IF EXISTS Customer;
DROP TABLE IF EXISTS BikeDock;
DROP TABLE IF EXISTS Transaction;

/* turn foreign key checks back on */
SET FOREIGN_KEY_CHECKS = 1;

/* create tables */
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
    price INT NOT NULL,
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
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    PRIMARY KEY(username)
);
/* insert dummy customer into Account and Customer tables */

/* insert dummy manager into Account table */

/* insert dummy owner into Account table*/

/* insert 8 docks into BikeDock table*/

/* insert renting price into ? */