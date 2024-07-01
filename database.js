const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "mysql-silguagaitan.alwaysdata.net",
    user: "362549_esmeralda" ,
    password: "M@rtina2024" ,
    database: "silguagaitan_esmeralda",
});

connection.connect((error)=> {
    if(error) {
        return console.error(error);
    }
    console.log("¡Conexión Exitosa!");
});

module.exports = connection;