var execsql = require('execsql');
import dotenv from "dotenv";
export function resetDB() {
    dotenv.config();
    dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    };
    sql = 'use bikeapp;';
    sqlFile = __dirname + '../../TABLE_CREATION.sql';
    execsql.exec.config(dbConfig)
        .exec(sql)
        .execFile(sqlFile, function(err,results){
            console.log(results);
        }).end();
}
