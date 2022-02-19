const productOverviewRouter = require('express').Router();
const proxy = require('express-http-proxy');

const { productOverview } = require('../controllers/productOverview.js')

productOverviewRouter.route('/')
  .get((req, res) => {proxy(getQuestions(req, res))})
  .post((req, res) => {proxy(createQuestion(req, res))})

productOverviewRouter.route('/:product_id')
  .get((req, res) => {proxy(getAnswers(req, res))})
  .post((req, res) => {proxy(createAnswer(req, res))})

productOverviewRouter.route('/:product_id/styles')
  .put((req, res) => {proxy(markQuestionHelpful(req, res))})

productOverviewRouter.route('/questions/:question_id/report')
  .put((req, res) => {proxy(markQuestionReported(req, res))})

productOverviewRouter.route('/answers/:answer_id/helpful')
  .put((req, res) => {proxy(markAnswerHelpful(req, res))})

productOverviewRouter.route('/answers/:answer_id/report')
  .put((req, res) => {proxy(markAnswerReported(req, res))})

module.exports = productOverviewRouter;


productOverviewRouter.get('/', (req, res) => {
  console.log('product');
  res.status(200).send('PRODUCT OVERVIEW: GET');
})

module.exports = productOverviewRouter;