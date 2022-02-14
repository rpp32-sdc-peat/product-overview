const axios = require('axios');

exports.questionsAndAnswers = {
  getQuestions: async (req, res) => {
    const product_id = Number(req.query.product_id);
    await axios.get(`http://localhost:8080/qa/questions?product_id=${product_id}`)
      .then((result) => {
        res.send(result.data)
    })
  },

  getAnswers: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.get(`http://localhost:8080/qa/questions/${question_id}/answers`)
      .then((result) => {
        res.send(result.data)
      })
  },

  createQuestion: async (req, res) => {
    await axios.post(`http://localhost:8080/qa/questions`, req.body)
      .then((result) => {
        res.send('Successfully posted new question')
      })
  },

  createAnswer: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.post(`http://localhost:8080/qa/questions/${question_id}/answers/`, req.body)
      .then((result) => {
        res.send('Successfully posted new answer')
      })
  }
}
