const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Atish@2235",
  database: "little-learningss"
});

module.exports = db;
