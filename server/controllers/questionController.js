'use strict'

const Question = require('../models/Question');

let findAll = (req, res) => {
  Question.find({})
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let findOne = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let createOne = (req, res) => {
  Question.create({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    answers: [],
    upvotes: [],
    downvotes: []
  })
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let deleteOne = (req, res) => {
  Question.deleteOne({ _id: req.params.id })
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let updateOne = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .then(resp1 => {

    Question.updateOne({ _id: req.params.id }, {
      $set: {
        title: req.body.title || resp1.title,
        content: req.body.content || resp1.content
      }
    })
    .then(resp2 => res.send(resp2))
    .catch(err => res.send(err));

  })
  .catch(err => res.send(err));
}

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne
};
