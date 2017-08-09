'use strict'

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.get('/', questionController.findAll);
router.get('/:id', questionController.findOne);
router.post('/', questionController.createOne);
router.delete('/:id', questionController.deleteOne);
router.put('/:id', questionController.updateOne);

// router.post('/:id/:id2', questionController.pushAnswerToQuestion)

module.exports = router;
