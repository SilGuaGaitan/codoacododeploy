//import { createPool } from "mysql2/promise";
const mysql = require("mysql2");

const connection = mysql.createConnection({
   /* host: "mysql-silguagaitan.alwaysdata.net",
    user: "362549_esmeralda" ,
    password: "M@rtina2024" ,
    database: "silguagaitan_esmeralda",
    connectionLimit:5,*/
    host: "localhost",
    user:"root",
    password:"",
    database:"silguagaitan_esmeralda",
    connectionlimit:5,
});

connection.connect((error)=> {
    if(error) {
        return console.error(error);
    }
    console.log("¡Conexión Exitosa!");
});

module.exports = connection;
/*// test connection
pool.getConnection()
    .then(connection => {
        console.log('Conexion Exitosa');
        connection.release();
    })
    .catch(error => {
        console.log('Error al conectar a la base de datos', error);
    });

*/
export default pool;