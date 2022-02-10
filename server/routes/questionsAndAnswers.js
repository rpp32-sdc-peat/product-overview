const express = require('express');
const router = express.Router();

const { questionsAndAnswers } = require('../controllers/questionsAndAnswers.js')
// console.log(questionsAndAnswers)

router.route('/qa/questions')
  .get(questionsAndAnswers.getQuestions)

module.exports = router;
