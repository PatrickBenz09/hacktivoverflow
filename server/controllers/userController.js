'use strict'

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

const saltRounds = 9;

let register = (req, res) => {
  let salt = bcrypt.genSaltSync(saltRounds);
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
    name: req.body.name,
    email: req.body.email,
    salt: salt
  })
  .then(resp => res.send(resp))
  .catch(err => res.send(err))
}

let login = (req, res) => {
  User.findOne({ username: req.body.username })
  .then(resp => {
    if(bcrypt.compareSync(req.body.password, resp.password)) {
      const token = jwt.sign({
        id: resp._id,
        username: resp.username,
        name: resp.name,
        email: resp.email
      }, process.env.SECRET);
      req.headers.token = token;
      res.send(token);
    } else {
      res.send("Wrong Password!")
    }
  })
  .catch(err => {
    res.send(err + "  / User Not Found!")
  })
}

module.exports = {
  register,
  login
};
