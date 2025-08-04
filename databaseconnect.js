export function connect(){
    require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // replace with actual host
  user: process.env.DB_USER,              // replace with actual username
  password: process.env.DB_PASSWORD,          // replace with actual password
  database: process.env.DB_NAME,     // replace with actual database name
  port: 3306                          // Default MySQL port
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Query example
connection.query('SELECT * FROM your_table', (err, results) => {
  if (err) throw err;
  console.log(results);
});
return connection;

}