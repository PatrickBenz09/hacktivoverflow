'use strict'

const jwt = require('jsonwebtoken');
require('dotenv').config()

let auth = function(req, res, next) {
  const token = req.headers.token
  if(token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      console.log(decoded);
      console.log(token);
      next();
    })
  } else {
    res.send("Please Login!")
  }
}

module.exports = auth;
