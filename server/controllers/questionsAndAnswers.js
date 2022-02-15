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
  },
// ============================ continue =====>
  markQuestionHelpful: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/helpful`)
      .then((result) => {
        res.send('Successfully posted question helpfulness')
      })
  },

  markQuestionReported: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/report`, req.body)
      .then((result) => {
        res.send(`Successfully reported question #${question_id}`)
      })
  },

  markAnswerHelpful: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/answers/`, req.body)
      .then((result) => {
        res.send('Successfully posted new answer')
      })
  },

  markAnswerReported: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/answers/`, req.body)
      .then((result) => {
        res.send('Successfully posted new answer')
      })
  }

}
