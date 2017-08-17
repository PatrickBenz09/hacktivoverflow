'use strict'

const Question = require('../models/Question');

let findAll = (req, res) => {
  Question.find({})
  .populate('author', 'username name email')
  .populate('answers.author', 'username name email')
  .populate('upvotes', 'username name email')
  .populate('downvotes', 'username name email')
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let findOne = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .populate('author', 'username name email')
  .populate('answers.author', 'username name email')
  .populate('upvotes', 'username name email')
  .populate('downvotes', 'username name email')
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

let createOne = (req, res) => {
  Question.create({
    title: req.body.title,
    content: req.body.content,
    author: req.headers.id,
    // author: '598b5f58a5277d5fd52fac73',
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

// let pushAnswerToQuestion = (req, res) => {
//   Question.update(
//     { _id: req.params.id },
//     { $push: { answer: req.params.id2 } })
//   .then(resp => res.send(resp))
//   .catch(err => res.send(err))
// }

let createOneAnswer = (req, res) => {
  Question.update({ _id: req.params.id }, {
    $push: {
      answers: {
        content: req.body.content,
        author: req.headers.id,
        // approval: ,
        upvotes: [],
        downvotes: []
      }
    }
  })
  .then(resp => res.send(resp))
  .catch(err => res.send(err))
}

let findAnswerOfOneQuestion = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .populate('author', 'username name email')
  .populate('answers.author', 'username name email')
  .populate('upvotes', 'username name email')
  .populate('downvotes', 'username name email')
  .then(resp => res.send(resp.answers))
  .catch(err => res.send(err));
}

let upvoteQuestion = (req, res) => {
  // Question.findOne({ downvotes: { $in: [req.params.id] } })
  Question.findOne({ _id: req.params.id })
  .populate('upvotes', 'username name email')
  .populate('downvotes', 'username name email')
  .then(resp => {
    let alreadyDownvoted = resp.downvotes.map(r => r._id.toString())
    alreadyDownvoted = alreadyDownvoted.includes(req.headers.id)

    if(alreadyDownvoted) {
      console.log('sudah ada downvote, jadi saya akan hapus downvotean anda -- Menghapus.....');
      Question.update({ _id: req.params.id }, { $pullAll: { downvotes: [req.headers.id] }})
      .then(resp1 => {
        console.log('sudah saya hapus downvotean anda.');
        Question.update({ _id: req.params.id }, { $push: { upvotes: req.headers.id }})
        .then(resp2 => {
          let currentDownvotes = resp.downvotes.filter(ru => !ru._id.equals(req.headers.id))
          let currentUpvotes = resp.upvotes
          currentUpvotes.push({ _id: req.headers.id })
          res.json({ resp: resp1, status: 'negateDownvoteThenUpvote', currentUpvotes: currentUpvotes, currentDownvotes: currentDownvotes })
        })
        .catch(err2 => res.send(err2));
      })
      .catch(err1 => res.send(err1))
    }
    else {
      console.log('belum ada downvote saya');
      //
      let alreadyUpvoted = resp.upvotes.map(r => r._id.toString())
      alreadyUpvoted = alreadyUpvoted.includes(req.headers.id)

      if(alreadyUpvoted) {
        console.log('sudah pernah saya upvote');
        Question.update({ _id: req.params.id }, { $pullAll: { upvotes: [req.headers.id] }})
        .then(resp1 => {
          let currentUpvotes = resp.upvotes.filter(ru => !ru._id.equals(req.headers.id))
          res.json({ resp: resp1, status: 'negateUpvote', currentUpvotes: currentUpvotes, currentDownvotes: resp.downvotes })
        })
        .catch(err1 => res.send(err1))
      }
      else {
        Question.update({ _id: req.params.id }, { $push: { upvotes: req.headers.id }})
        .then(resp1 => {
          let currentUpvotes = resp.upvotes
          currentUpvotes.push({ _id: req.headers.id })
          res.json({ resp: resp1, status: 'upvote', currentUpvotes: currentUpvotes, currentDownvotes: resp.downvotes })
        })
        .catch(err1 => res.send(err1));
      }
    }
  })
  .catch(err => res.send(err))
}

let downvoteQuestion = (req, res) => {
  Question.findOne({ _id: req.params.id })
  .populate('downvotes', 'username name email')
  .populate('upvotes', 'username name email')
  .then(resp => {
    let alreadyUpvoted = resp.upvotes.map(r => r._id.toString())
    alreadyUpvoted = alreadyUpvoted.includes(req.headers.id)

    if(alreadyUpvoted) {
      console.log('sudah ada upvote, jadi saya akan hapus upvotean anda -- Menghapus.....');
      Question.update({ _id: req.params.id }, { $pullAll: { upvotes: [req.headers.id] }})
      .then(resp1 => {
        console.log('sudah saya hapus upvotean anda.');
        Question.update({ _id: req.params.id }, { $push: { downvotes: req.headers.id }})
        .then(resp2 => {
          let currentUpvotes = resp.upvotes.filter(rd => !rd._id.equals(req.headers.id))
          let currentDownvotes = resp.downvotes
          currentDownvotes.push({ _id: req.headers.id })
          res.json({ resp: resp1, status: 'negateUpvoteThenDownvote', currentUpvotes: currentUpvotes, currentDownvotes: currentDownvotes })
        })
        .catch(err2 => res.send(err2));
      })
      .catch(err1 => res.send(err1))
    }
    else {
      console.log('belum ada upvote saya');
      //
      let alreadyDownvoted = resp.downvotes.map(r => r._id.toString())
      alreadyDownvoted = alreadyDownvoted.includes(req.headers.id)

      if(alreadyDownvoted) {
        console.log('sudah pernah saya downvote');
        Question.update({ _id: req.params.id }, { $pullAll: { downvotes: [req.headers.id] }})
        .then(resp1 => {
          console.log(resp.downvotes);
          let currentDownvotes = resp.downvotes.filter(rd => !rd._id.equals(req.headers.id))
          console.log('obelehiho');
          console.log(currentDownvotes);
          res.json({ resp: resp1, status: 'negateDownvote', currentUpvotes: resp.upvotes, currentDownvotes: currentDownvotes })
        })
        .catch(err1 => res.send(err1))
      }
      else {
        Question.update({ _id: req.params.id }, { $push: { downvotes: req.headers.id }})
        .then(resp1 => {
          console.log('downvoting..');
          let currentDownvotes = resp.downvotes
          currentDownvotes.push({ _id: req.headers.id })
          res.json({ resp: resp1, status: 'downvote', currentUpvotes: resp.upvotes, currentDownvotes: currentDownvotes })
        })
        .catch(err1 => res.send(err1));
      }
    }
  })
  .catch(err => res.send(err))
}

let upvoteAnswer = (req, res) => {
  Question.update(
    { answers: { _id: req.params.id } }, {
    $push: {
      answers: { upvotes: req.headers.id } /* This is User ID */
    }
  })
  .then(resp => res.send(resp))
  .catch(err => res.send(err));
}

module.exports = {
  findAll,
  findOne,
  createOne,
  deleteOne,
  updateOne,
  // pushAnswerToQuestion,
  createOneAnswer,
  findAnswerOfOneQuestion,
  upvoteQuestion,
  downvoteQuestion,
  upvoteAnswer
};
