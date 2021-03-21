var mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();



dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
};
sqlFile = __dirname + './../TABLE_CREATION.sql';
execsql.config(dbConfig)
    .execFile(sqlFile, function(err,results){
        console.log(results);
    }).end();



