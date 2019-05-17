const db = require('./data/dbConfig.js');

module.exports = {
    get,
    findById,
    add,
}

function get() {
    return db('games')
};

function findById(id) {
    return db('games')
    .where({ id })
    .first()
};

function add(games) {
    return db('games')
    .insert(games)
    .then(id => {
        return findById(id[0])
    });
};