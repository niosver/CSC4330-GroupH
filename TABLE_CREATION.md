CREATE TABLE BikeDock(
    bike_dock_number INT,
    number_of_bikes INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    PRIMARY KEY (bike_dock_number),
);

CREATE TABLE Customer(
    customer_id INT AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    address VARCHAR(100),
    birthdate DATE NOT NULL,
    email VARCHAR(100),
    cc_info VARCHAR(100) NOT NULL,              //possibly change on how we recognize CC info
    PRIMARY KEY (customer_id),
);

CREATE TABLE Transaction(
    transaction_id INT AUTO_INCREMENT,
    price INT NOT NULL,
    cc_info VARCHAR(100) NOT NULL,              //possibly change on how we recognize CC info
    transaction_date DATE NOT NULL,
    customer_id INT NOT NULL,
    origin_dock INT NOT NULL,
    destination_dock INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    FOREIGN KEY (origin_dock) REFERENCES BikeDock(bike_dock_number),
    FOREIGN KEY (destination_dock) REFERENCES BikeDock(bike_dock_number),
    PRIMARY KEY (transaction_id),
);

CREATE TABLE Account(
    username VARCHAR(50),
    password VARCHAR(60), //bcrypt generates 60 character long hashes
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('customer','manager','owner')),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id),
    PRIMARY KEY(username),
);