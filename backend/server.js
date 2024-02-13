const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'jwt_secret';
const DATA_FILE_PATH = "./coinData.json";
const favorites =[]

let users = [{ username: 'a', password: 'a' }];

app.use(bodyParser.json());
app.use(cors());

function generateToken(username) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('No JWT token provided.');
    
    const tokenString = token.split(' ')[1]; // Get token without 'Bearer '
    jwt.verify(tokenString, JWT_SECRET, (err, decoded) => {
        console.log('dupa112312313');
        if (err) return res.status(401).send('Invalid JWT token.');
        req.user = decoded;
        next();
    });
}

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

fetchDataAndSave();
setInterval(fetchDataAndSave, 60 * 1000); 

app.get('/api/data/currencies', (req, res) => {
    console.log('fetchign works good');
    fs.readFile('coinData.json', 'utf8', (err, data) => {
        if (err) {
          console.error("Error reading file:", err);
          return res.status(500).send({ error: "Error reading file" });
        }
        
        res.json(JSON.parse(data));
      });
    
});


app.get('/api/data', verifyToken, (req, res) => {
    const data = {
        example: 'data'
    };
    res.json(data);
});

app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
    const newUser = { username, password };
    users.push(newUser);
    res.status(201).send('User registered.');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(username);
        res.json({ 
            token:token,
            username:username
         });
    } else {
        res.status(401).send('Wrong login or password.');
    }
});

app.post('/api/add-to-favorites', verifyToken, (req, res) => {
    
    const { username, item } = req.body;

   
    if (!favorites[username]) {
        favorites[username] = [];
    }

    
    favorites[username].push(item);

    console.log(favorites[username]);

    
    res.send({ success: true, message: 'Item added to favorites.' });
});


app.get('/api/get-favorites/:username', verifyToken, (req, res) => {
    const { username } = req.params;
    
    // Sprawdzenie, czy istnieje lista ulubionych dla danego użytkownika
    if (userFavorites[username]) {
        res.json(userFavorites[username]);
    } else {
        res.status(404).send('Favorites not found for the specified user.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
