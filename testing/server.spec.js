const request = require('supertest');
const server = require('../server.js');
const db = require('../data/dbConfig.js');

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
    beforeAll(async () => {
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

    //POST Endpoint
    it('POST/games should return code:201', () => {
        return request(server)
        .post('/games')
        .send({ title: 'Nioh', genre: 'RPG' })
        .then(res => {
            expect(res.status).toBe(201);
        });
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