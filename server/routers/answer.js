'use strict'

const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/', answersController.findAll);
router.get('/:id', answersController.findOne);
router.get('/', answersController.createOne);
router.get('/:id', answersController.deleteOne);
router.get('/:id', answersController.updateOne);

module.exports = router;
