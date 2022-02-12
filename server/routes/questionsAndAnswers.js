const express = require('express');
const router = express.Router();

const { questionsAndAnswers } = require('../controllers/questionsAndAnswers.js')
// console.log(questionsAndAnswers)

router.route('/questions')
  .get((req, res) => {questionsAndAnswers.getQuestions(req, res)})
  .post((req, res) => {
    console.log('hello')
    createQuestion.questionsAndAnswers(req, res)})

router.route('/questions/:question_id/answers')
  .get((req, res) => {
    questionsAndAnswers.getAnswers(req, res)
  })

module.exports = router;
