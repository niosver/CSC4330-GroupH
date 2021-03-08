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
    cc_number VARCHAR(16) NOT NULL,              
    transaction_date DATE NOT NULL,
    customer_id INT NOT NULL,
    origin_dock INT NOT NULL,
    destination_dock INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (origin_dock) REFERENCES BikeDock(bike_dock_number),
    FOREIGN KEY (destination_dock) REFERENCES BikeDock(bike_dock_number),
    PRIMARY KEY (transaction_id)
);

CREATE TABLE Account(
    username VARCHAR(50),
    password VARCHAR(60),
    account_type ENUM('owner','manager','customer'),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    PRIMARY KEY(username)
);