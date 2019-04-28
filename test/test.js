const knex = require('../db/knex');

describe('CRUD drums', () => {
  before(() => {
    return knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      });
    });
});