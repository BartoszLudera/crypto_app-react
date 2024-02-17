const mysql = require('mysql');

// Utwórz połączenie z bazą danych
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'nela',
    database: 'crypto_data'
});

// Połącz się z bazą danych
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = connection;
