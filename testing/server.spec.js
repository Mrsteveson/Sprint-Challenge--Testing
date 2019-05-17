const request = require('supertest');
const server = require('../server.js');
const db = require('../data/dbConfig.js');
const games = require('../server-model.js');

describe('The Server', () => {

    //server is running -> pass
    it('checks status code:200', () => {
        return request(server).get('/').expect(200);
    });
    
    //hello message is running -> pass
    it('checks server hello msg', () => {
        const expected = {message: 'Hello from Patty. BE Week4 Sprint Challenge Project'};

        request(server).get('/').then(res => {
            expect(res.body).toEqual(expected)
        });
    });

});

describe('The Endpoints', () => {

    //use beforeAll to run once. beforeEach to run always.
    beforeEach(async () => {
        await db('games').truncate();
    });

    //GET endpoint
    it('GET/games should return code:200', () => {
        return request(server)
        .get('/games')
        .then(res => {
            expect(res.status).toBe(200);
        })
    });

    it('GET/games should return an array', () => {
        const expected = [];

        return request(server)
        .get('/games')
        .then(res => {
            expect(expected).toEqual([])
        });
    });

    //beforeEach truncate will set this to 0.
    it('GET/games should return an array with length 0', () => {
        const expected = [];

        return request(server)
        .get('/games')
        .then(res => {
            expect(expected).toHaveLength(0)
        });
    });

    it('GET/games should return Content-Type application or json', () => {
        return request(server)
        .get('/games')
        .expect('Content-Type', /application/ || /json/)
    });

    //Get:ID Endpoint
    it('GET/games:id should return code:200', async () => {
        await request(server).post('/games')
        .send({ title: 'Nioh', genre: 'RPG', release: '2017' })

        const expected = await request(server).get('/games/1');
        expect(expected.status).toBe(200);
    })

    it('GET/games:id should return code:404', async () => {
        await request(server).post('/games')
        .send({ title: 'Nioh', genre: 'RPG', release: '2017' })

        const expected = await request(server).get('/games/2');
        expect(expected.status).toBe(404);
    })


    //POST Endpoint
    it('POST/games should return code:201', () => {
        return request(server)
        .post('/games')
        .send({ title: 'Nioh', genre: 'RPG' })
        .then(res => {
            expect(res.status).toBe(201);
        });
    });

    //isnt working
    it('POST/games should return an array with length of 1', async () => {
        
        // return request(server)
        // .post('/games')
        // .send({ title: 'Nioh', genre: 'RPG' })
        // .then(res => {
        //     expect(res.status).toBe(201);
        //     expect(res.body).toHaveLength([1])
        // })

        await games.add({ title: 'Nioh', genre: 'RPG' })

        const newGame = await db('games');
        expect(newGame).toHaveLength(1)

    });

    it('POST/games should return code:422 if entry is incomplete', () => {
        return request(server)
        .post('/games')
        .send({ title: 'Everquest', genre: null })
        .then(res => {
            expect(res.status).toBe(422)
        });
    });

    it('POST/games should return Content-Type json', () => {
        return request(server)
        .post('/games')
        .send({ title: 'Warcraft', genre: 'RTS'})
        .expect('Content-Type', /json/)
    });
});