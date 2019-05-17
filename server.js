const express = require('express');
const server = express();
const db = require('./server-model.js');

// Import Routers
// const gamesRouter = require('');

// Configure Middleware
server.use(express.json());

// Use Routers
// server.use('/api/games', gamesRouter);

// Server Test. Hello Msg.
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from Patty. BE Week4 Sprint Challenge Project'})
});

//Get list of games. 1entry seeded.
server.get('/games', (req, res) => {
    db.get()
    .then(games => {
        res.status(200).json(games)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

//Get game by id.
server.get('/games/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
    .then(game => {
        if(game) {
            res.status(200).json(game)
        } else {
            res.status(404).json({ message: 'The specified project does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    });
});

//Add a Game.
server.post('/games', (req, res) => {
    const newGame = req.body;

    if(!newGame.title || !newGame.genre) {
        res.status(422).json({ message: "Broken post request."})
    } else {
        db.add(newGame)
        .then(game => {
            res.status(201).json(game)
        })
        .catch(err => {
            res.status(500).json(err.message)
        });
    };
    
});

module.exports = server;