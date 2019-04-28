const request = require('supertest');
const expect = require('chai').expect;
const knex = require('../db/knex');
const app = require('../app');
const fixtures = require('./fixtures');

describe('CRUD drums', () => {
  before((done) => {
    knex.migrate.latest()
      .then(() => {
        return knex.seed.run();
      }).then(() => done());
  });
  
  it('lists all records', (done) => {
    request(app)
      .get('/api/v1/drums')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('array');
        expect(response.body).to.deep.equal(fixtures.drums);
        done();
      });
  });

  it('lists one record by Id"1"', (done) => {
    request(app)
      .get('/api/v1/drums/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.drums[0]);
        done();
      });
  });

  it('lists one record by Id"5"', (done) => {
    request(app)
      .get('/api/v1/drums/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        expect(response.body).to.deep.equal(fixtures.drums[4]);
        done();
      });
  });

  it('creates a new Drum', (done) => {
    request(app)
      .post('/api/v1/drums')
      .send(fixtures.drum)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.drum.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.drum);
        done();
      });
  });

  it('updates a Drum', (done) => {
    fixtures.drum.size = "99x99"
    request(app)
      .put('/api/v1/drums/11')
      .send(fixtures.drum)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.drum.id = response.body.id;
        expect(response.body).to.deep.equal(fixtures.drum);
        done();
      });
  });

  it('deletes a Drum', (done) => {
    request(app)
      .delete('/api/v1/drums/11')
      .send(fixtures.drum)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).to.be.a('object');
        fixtures.drum.id = response.body.id;
        expect(response.body).to.deep.equal({
          deleted: true
        });
        done();
      });
  });
});