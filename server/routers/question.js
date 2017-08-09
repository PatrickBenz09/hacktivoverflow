'use strict'

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');


router.get('/', questionController.findAll);
router.get('/:id', questionController.findOne);
router.get('/', questionController.createOne);
router.get('/:id', questionController.deleteOne);
router.get('/:id', questionController.updateOne);

router.get('/:id/:id2', questionController.pushAnswerToQuestion)

module.exports = router;
