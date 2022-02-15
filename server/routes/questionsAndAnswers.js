const express = require('express');
const router = express.Router();

const { questionsAndAnswers } = require('../controllers/questionsAndAnswers.js')
const { getQuestions, createQuestion, getAnswers, createAnswer, markQuestionHelpful, markQuestionReported, markAnswerHelpful, markAnswerReported } = questionsAndAnswers;

router.route('/questions')
  .get((req, res) => {getQuestions(req, res)})
  .post((req, res) => {createQuestion(req, res)})

router.route('/questions/:question_id/answers')
  .get((req, res) => {getAnswers(req, res)})
  .post((req, res) => {createAnswer(req, res)})


router.route('/questions/:question_id/helpful')
  .put((req, res) => {markQuestionHelpful(req, res)})

router.route('/questions/:question_id/report')
  .put((req, res) => {markQuestionReported(req, res)})

router.route('/answers/:answer_id/helpful')
  .put((req, res) => {markAnswerHelpful(req, res)})

router.route('/answers/:answer_id/report')
  .put((req, res) => {markAnswerReported(req, res)})

module.exports = router;
