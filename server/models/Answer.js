'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  approval: {
    type: Boolean,
    default: false
  },
  upvotes: [{ Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ Schema.Types.ObjectId, ref: 'User' }]
}, {
  timestamps: true
})

module.exports = answerSchema;
