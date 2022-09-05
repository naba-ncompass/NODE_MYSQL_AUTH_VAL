const mysql = require('mysql');
const config = require('../Config/config');
const responsehandler = require("../Utilities/response_handler");

async function connection() {
    return new Promise(function (resolve, reject) {
        var con = mysql.createConnection({
            host: config['host'],
            user: config['user'],
            password: config['password'],
            database: config['database'],
            insecureAuth : true,
            auth_plugin: 'mysql_native_password'
        });
        con.connect(function (err) {
            if (err)
            {
                 reject(err);
            }
            resolve(con);
        });
    });
}


const executeQuery = async function (query, inputData = []) {
    try {
        let con = await connection().catch(function reject(error) {
            throw error;
        });
        return new Promise(function (resolve, reject) {
            con.query(query, inputData, function (err, result) {
                if (err) reject(err);
                resolve(result);
                con.end();
            });
        });
    } catch (error) {
        return responsehandler.makeErrorResponse("AUTHENTICATION FAILED ");
    } 
}


module.exports = {
    executeQuery
};

