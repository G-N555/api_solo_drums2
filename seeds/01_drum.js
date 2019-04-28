const drums = require('../drums')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drum').del()
    .then(function () {
      return knex('drum').insert(drums);
    });
};
