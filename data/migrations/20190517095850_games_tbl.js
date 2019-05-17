exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl.increments()

        tbl
        .string('title', 128)
        .notNullable();

        tbl
        .string('genre', 128)
        .notNullable();

        tbl
        .integer('release')
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('games');
};
