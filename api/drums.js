const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidId (req, res, next){
  if(!isNaN(req.params.id)) return next();
  next(new Error ('Invalid Id'));
}

function validDrum (drum){
  const hasName = typeof drum.name === 'string' && drum.name.trim !== '';
  const hasBrand = typeof drum.brand === 'string' && drum.brand.trim !== '';
  const hasSize = typeof drum.size === 'string' && drum.size.trim !== '';
  const hasMaterial = typeof drum.material === 'string' && drum.material.trim !== '';
  return hasName && hasBrand && hasSize && hasMaterial;
}

router.get('/', (req, res) => {
  queries.getAll().then(drums => {
    res.json(drums);
  });
});

router.get('/:id', isValidId, (req, res, next) => {
  queries.getOne(req.params.id).then(drum => {
    if(drum){
    res.json(drum);
    } else {
      next();
    }
  })
});

router.post('/', (req, res, next) => {
  if(validDrum(req.body)) {
    queries.create(req.body).then(drums => {
      res.json(drums[0]);
    });
  } else {
    next (new Error('Invalid Drum'));
  };
});

router.put('/:id', isValidId, (req, res, next) => {
  if(validDrum(req.body)) {
    queries.update(req.params.id, req.body).then(drums => {
      res.json(drums[0]);
    });
  } else {
    next (new Error('Invalid Drum'));
  }
});

router.delete('/:id', isValidId, (req,res) => {
    queries.delete(req.params.id).then(() =>{
      res.json({
        deleted: true
      });
    });
});

module.exports = router;