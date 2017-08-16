'use strict'

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/', userController.findAll)
// router.post('/:id/:id2', userController.pushUserToQuestion)

module.exports = router;
