const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Hoang1609@",
    database: "case_md3",
});

module.exports = connection;