const mysql = require('mysql2');

const connect = mysql.createConnection({
  host: '127.0.0.1',
  // port: 3306,
  user: 'root',
  password: 'Samsung12',
  database: 'museum-2-dev',
});

connect.connect((error: Error) => {
  if (error) {
    console.error(error);
    throw new Error('Error connecting to DB');
  }
  console.log('Database connected');
});

module.exports = connect;
