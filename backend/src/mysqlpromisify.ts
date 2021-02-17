import util from "util";
import mysql from "mysql";
import sqlConfig from "./sqlinterface";

function makeDb( config: sqlConfig ) {
    const connection = mysql.createConnection(config);
    return {
        //@ts-ignore
        query(sql: string,args) {
            return util.promisify(connection.query)
                //@ts-ignore
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end)
                .call(connection);
        },
        beginTransaction() {
            return util.promisify(connection.beginTransaction)
                .call(connection)
        },
        commit() {
            return util.promisify(connection.commit)
                .call(connection)
        },
        rollback() {
            return util.promisify(connection.rollback)
                .call(connection)
        }
    };
}

export default makeDb