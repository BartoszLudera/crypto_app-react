const mysql = require('mysql');

// Ustaw połączenie z bazą danych
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ustawienia użytkownika
  password: 'nela', // Hasło użytkownika
  database: 'cryptoapp' // Nazwa twojej bazy danych
});

// Nawiązanie połączenia
connection.connect((err) => {
  if (err) {
    console.error('Błąd połączenia: ' + err.stack);
    return;
  }

  console.log('Połączono z bazą danych MySQL.');
});

// Przykładowe zapytanie SQL
connection.query('SELECT * FROM users', (err, rows) => {
  if (err) throw err;

  console.log('Wiersze: ', rows);
});

// Zakończenie połączenia
connection.end((err) => {
  if (err) {
    console.error('Błąd zakończenia połączenia: ' + err.stack);
    return;
  }
  console.log('Połączenie zakończone.');
});
