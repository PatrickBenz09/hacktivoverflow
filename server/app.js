'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express();

const user = require('./routers/user');
const question = require('./routers/question');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/user', user)
app.use('/question', question)

app.listen(process.env.PORT || 3000)