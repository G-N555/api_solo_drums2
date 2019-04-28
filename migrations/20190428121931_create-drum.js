
exports.up = function(knex, Promise) {
  return knex.schema.createTable('drum', (table) => {
    table.increments();
    table.text('name');
    table.text('brand');
    table.text('size');
    table.text('material');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drum');
};
