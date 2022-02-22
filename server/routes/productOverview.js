const productOverviewRouter = require('express').Router();
const proxy = require('express-http-proxy');

const { productOverview } = require('../controllers/productOverview.js')

productOverviewRouter.route('/')
  .get((req, res) => {proxy(getQuestions(req, res))})


productOverviewRouter.route('/:product_id')
  .get((req, res) => {proxy(getAnswers(req, res))})


productOverviewRouter.route('/:product_id/styles')
  .get((req, res) => {proxy(markQuestionHelpful(req, res))})

productOverviewRouter.route('/:product_id/related')
  .get((req, res) => {proxy(markQuestionReported(req, res))})

module.exports = productOverviewRouter;