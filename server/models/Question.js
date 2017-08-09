'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = require('./Answer');

const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  answers: [answerSchema],
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
