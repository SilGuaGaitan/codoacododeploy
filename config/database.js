
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: "mysql-silguagaitan.alwaysdata.net",
    user: "362549_esmeralda",
    password: "M@rtina2024",
    database: "silguagaitan_esmeralda",
    connectionLimit: 5
});

export default pool;
