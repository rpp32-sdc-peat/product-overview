const express = require('express');
const router = express.Router();
const proxy = require('express-http-proxy');

const { questionsAndAnswers } = require('../controllers/questionsAndAnswers.js')
const { getQuestions, createQuestion, getAnswers, createAnswer, markQuestionHelpful, markQuestionReported, markAnswerHelpful, markAnswerReported } = questionsAndAnswers;

router.route('/questions')
  .get((req, res) => {proxy(getQuestions(req, res))})
  .post((req, res) => {proxy(createQuestion(req, res))})

router.route('/questions/:question_id/answers')
  .get((req, res) => {proxy(getAnswers(req, res))})
  .post((req, res) => {proxy(createAnswer(req, res))})

router.route('/questions/:question_id/helpful')
  .put((req, res) => {proxy(markQuestionHelpful(req, res))})

router.route('/questions/:question_id/report')
  .put((req, res) => {proxy(markQuestionReported(req, res))})

router.route('/answers/:answer_id/helpful')
  .put((req, res) => {proxy(markAnswerHelpful(req, res))})

router.route('/answers/:answer_id/report')
  .put((req, res) => {proxy(markAnswerReported(req, res))})

module.exports = router;
