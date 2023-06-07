import mysql from "promise-mysql";
import config from "./../config";
import { createPool } from "mysql2/promise";
 
export const connection = mysql.createPool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.password
});



const getConnection = () => {
    return connection;
};



module.exports = {
    getConnection
};  

//mysql: 
//be4fedc2a25755:9408c432@us-cdbr-east-06.cleardb.net/heroku_6c69b5bd46c3da9?reconnect=true