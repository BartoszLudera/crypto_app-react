const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2'); // Używamy mysql2
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'jwt_secret';
const DATA_FILE_PATH = "./coinData.json";

app.use(bodyParser.json());
app.use(cors());

// Połączenie z bazą danych
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'nela',
    database: 'crypto_data'
});

// Middleware do weryfikacji tokena JWT
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('No JWT token provided.');
    
    const tokenString = token.split(' ')[1]; // Pobierz token bez 'Bearer '
    jwt.verify(tokenString, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Invalid JWT token.');
        req.user = decoded;
        next();
    });
}

// Funkcja do generowania tokena JWT
function generateToken(username) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

// Funkcja do pobierania danych z CoinGecko API i zapisu do pliku
async function fetchDataAndSave() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&locale=en');
        if (!response.ok) {
            throw new Error('Failed to fetch data from CoinGecko API');
        }
        const data = await response.json();
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data));
        console.log('Data saved successfully');
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Wywołaj funkcję fetchDataAndSave oraz ustaw interwał
fetchDataAndSave();
setInterval(fetchDataAndSave, 60 * 1000); 

// Endpoint do pobierania danych walut
app.get('/api/data/currencies', (req, res) => {
    fs.readFile(DATA_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send({ error: "Error reading file" });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint do pobierania przykładowych danych
app.get('/api/data', verifyToken, (req, res) => {
    const data = {
        example: 'data'
    };
    res.json(data);
});

// Endpoint do rejestracji użytkownika
// Endpoint do rejestracji użytkownika
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Sprawdź, czy użytkownik o podanym loginie już istnieje
        const [existingUsers] = await connection.promise().execute('SELECT * FROM users WHERE username = ?', [username]);
        if (existingUsers.length > 0) {
            return res.status(400).send('Użytkownik o podanym loginie już istnieje.');
        }

        // Jeśli użytkownik nie istnieje, zarejestruj go
        const [rows, fields] = await connection.promise().execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        res.status(201).send('Użytkownik zarejestrowany pomyślnie.');
    } catch (error) {
        console.error('Błąd podczas rejestracji użytkownika:', error);
        res.status(500).send('Błąd podczas rejestracji użytkownika.');
    }
});


// Endpoint do logowania użytkownika
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows, fields] = await connection.promise().execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        if (rows.length > 0) {
            const token = generateToken(username);
            res.json({ 
                token: token,
                username: username
            });
        } else {
            res.status(401).send('Wrong login or password.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in.');
    }
});

app.post('/api/priceNote/add', verifyToken, async (req, res) => {
    const { username, coinName, price } = req.body;
    try {
      await connection.promise().execute('INSERT INTO price_note (username, nazwa_coina, cena) VALUES (?, ?, ?)', [username, coinName, price]);
      res.status(201).send('Notatka cenowa dodana pomyślnie.');
    } catch (error) {
      console.error('Błąd podczas dodawania notatki cenowej:', error);
      res.status(500).send('Wystąpił błąd podczas dodawania notatki cenowej.');
    }
});

app.delete('/api/priceNote/delete', verifyToken, async (req, res) => {
    const { coinName } = req.body;
    try {
      await connection.promise().execute('DELETE FROM price_note WHERE nazwa_coina = ?', [coinName]);
      res.status(200).send('Notatka cenowa usunięta pomyślnie.');
    } catch (error) {
      console.error('Błąd podczas usuwania notatki cenowej:', error);
      res.status(500).send('Wystąpił błąd podczas usuwania notatki cenowej.');
    }
});


app.get('/api/priceNote', verifyToken, async (req, res) => {
    const { username } = req.user;
    try {
      const [rows] = await connection.promise().execute('SELECT nazwa_coina AS name, cena AS price FROM price_note WHERE username = ?', [username]);
      res.json(rows);
    } catch (error) {
      console.error('Error fetching favorite coins:', error);
      res.status(500).send('Error fetching favorite coins.');
    }
  });


app.get('/api/favorites', verifyToken, async (req, res) => {
    const { username } = req.user;
    try {
      const [rows] = await connection.promise().execute('SELECT item FROM favorites WHERE username = ?', [username]);
      const favoriteCoins = rows.map(row => row.item); // Pobieramy tylko elementy z wyniku zapytania
      res.json(favoriteCoins);
    } catch (error) {
      console.error('Error fetching favorite coins:', error);
      res.status(500).send('Error fetching favorite coins.');
    }
  });

// Endpoint do dodawania ulubionego coina użytkownikowi
app.post('/api/favorites/add', verifyToken, async (req, res) => {
    const { username, coinId } = req.body;
    try {
        // Sprawdź, czy moneta już istnieje w ulubionych użytkownika
        const [existingFavorite] = await connection.promise().execute('SELECT * FROM favorites WHERE username = ? AND item = ?', [username, coinId]);
        if (existingFavorite.length > 0) {
            return res.status(400).send('Moneta jest już dodana do ulubionych.');
        }

        // Dodaj monete do ulubionych
        await connection.promise().execute('INSERT INTO favorites (username, item) VALUES (?, ?)', [username, coinId]);
        res.status(201).send('Moneta dodana do ulubionych.');
    } catch (error) {
        console.error('Błąd podczas dodawania ulubionej monety:', error);
        res.status(500).send('Błąd podczas dodawania ulubionej monety.');
    }
});

// Endpoint do usuwania ulubionego coina użytkownika
app.post('/api/favorites/remove', verifyToken, async (req, res) => {
    const { username, coinId } = req.body;
    try {
        // Usuń monete z ulubionych
        await connection.promise().execute('DELETE FROM favorites WHERE username = ? AND item = ?', [username, coinId]);
        res.status(200).send('Moneta usunięta z ulubionych.');
    } catch (error) {
        console.error('Błąd podczas usuwania ulubionej monety:', error);
        res.status(500).send('Błąd podczas usuwania ulubionej monety.');
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
