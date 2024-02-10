const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'jwt_secret'; 

let users = [
    { username: 'a', password: 'a' }
];
let favorites = {};

app.use(bodyParser.json());
app.use(cors()); 


function generateToken(username) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).send('No token JWT.');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).send('Wrong token JWT.');
        req.user = decoded;
        next();
    });
}

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
    res.status(201).send('User register.');
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = generateToken(username);
        console.log(token);
        res.json({ token });
    } else {
        res.status(401).send('Wrong login or password.');
    }
});

app.post('/api/add-to-favorites', verifyToken, (req, res) => {
    const { username } = req.user; // Pobierz nazwę użytkownika z zdekodowanego tokenu JWT
    const { item } = req.body; // Pobierz identyfikator monety z ciała żądania

    if (!favorites[username]) {
        favorites[username] = [];
    }

    if (!favorites[username].includes(item)) {
        // Sprawdź, czy moneta już istnieje w ulubionych, aby uniknąć duplikatów
        favorites[username].push(item);
        res.status(200).send('Element został dodany do ulubionych.');
    } else {
        res.status(400).send('Element już istnieje w ulubionych.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
