const express = require('express');
const router = express.Router();

const { questionsAndAnswers } = require('../controllers/questionsAndAnswers.js')
const { getQuestions, createQuestion, getAnswers, createAnswer } = questionsAndAnswers;

router.route('/questions')
  .get((req, res) => {getQuestions(req, res)})
  .post((req, res) => {createQuestion(req, res)})

router.route('/questions/:question_id/answers')
  .get((req, res) => {getAnswers(req, res)})
  .post((req, res) => {createAnswer(req, res)})

module.exports = router;
