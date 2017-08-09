'use strict'

const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');

router.get('/', answersController.findAll);
router.get('/:id', answersController.findOne);
router.post('/', answersController.createOne);
router.delete('/:id', answersController.deleteOne);
router.put('/:id', answersController.updateOne);

module.exports = router;
