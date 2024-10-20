const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "women_safety",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = connection;
