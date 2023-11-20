const express = require('express');
const router = express.Router();
const {CommentDB} = require('../db/index');

router.get('/', async function(req, res) {
  try {
    const comments = await CommentDB.find().populate('user_id').populate('poem_id');

    res.json(comments);
} catch (e) {
    console.log(e);
}
});
router.post('/', async function(req, res, next) {
  try {
    
    const createdComment = await CommentDB.create(req.body);

    res.json(createdComment);
} catch (e) {
    next(e);
}
});

module.exports = router;
