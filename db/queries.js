const knex = require('./knex'); //connection!

module.exports = {
  getAll(){
    return knex('drum');
  },

  getOne(id){
    return knex('drum').where('id', id).first();
  },

  create(newDrum){
    return knex('drum').insert(newDrum, '*');
  },

  update(id, drum){
    return knex('drum').where('id', id).update(drum, '*');
  },

  delete(id){
    return knex('drum').where('id', id).del();
  }
}
