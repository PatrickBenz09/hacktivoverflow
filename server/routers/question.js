'use strict'

const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../helpers/auth');

router.get('/', questionController.findAll);
router.get('/:id', questionController.findOne);
router.post('/', authMiddleware, questionController.createOne);
router.delete('/:id', authMiddleware, questionController.deleteOne);
router.put('/:id', authMiddleware, questionController.updateOne);

// router.post('/:id/:id2', questionController.pushAnswerToQuestion)
router.post('/:id', authMiddleware, questionController.createOneAnswer)
router.get('/:id/answer', questionController.findAnswerOfOneQuestion);
router.put('/upvote/:id', questionController.upvoteQuestion)
router.put('/downvote/:id', questionController.downvoteQuestion)
router.put('/answer/:id', questionController.upvoteAnswer)

module.exports = router;
