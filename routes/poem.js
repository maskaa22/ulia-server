const express = require('express');
const router = express.Router();
const {PoemDB} = require('../db/index');

router.get('/', async function(req, res) {
  try {

    const poems = await PoemDB.find();

    res.json(poems);
} catch (e) {
    console.log(e);
}
});
router.post('/', async function(req, res, next) {
  try {
    
    const creatPoem = await PoemDB.create(req.body);

    res.json(creatPoem);
} catch (e) {
    next(e);
}
});
router.post('/rating', async function(req, res, next) {
  try {
    const {_id, rating} = req.body;

    const updatePoem = await PoemDB.updateOne({_id: _id}, {rating: rating});

    res.json(updatePoem);
} catch (e) {
    next(e);
}
});

module.exports = router;
