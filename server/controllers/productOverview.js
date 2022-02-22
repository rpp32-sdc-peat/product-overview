const axios = require('axios');

// query -> parameters inserted from front end
// : -> params (example -> :product_id)

const productOverview = {
  getProducts: async (req, res) => {
    const product_id = Number(req.query.product_id);
    await axios.get(`http://localhost:8080/qa/questions?product_id=${product_id}`)
      .then((result) => {
        res.send(result.data)
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  getStyles: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.get(`http://localhost:8080/qa/questions/${question_id}/answers`)
      .then((result) => {
        res.send(result.data)
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  createQuestion: async (req, res) => {
    await axios.post(`http://localhost:8080/qa/questions`, req.body)
      .then((result) => {
        res.send('Successfully posted new question')
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  createAnswer: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.post(`http://localhost:8080/qa/questions/${question_id}/answers/`, req.body)
      .then((result) => {
        res.send('Successfully posted new answer')
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  markQuestionHelpful: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/helpful`)
      .then((result) => {
        res.send('Successfully posted question helpfulness')
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  markQuestionReported: async (req, res) => {
    const question_id = Number(req.params.question_id);
    await axios.put(`http://localhost:8080/qa/questions/${question_id}/report`)
      .then((result) => {
        res.send(`Successfully reported question #${question_id}`)
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  markAnswerHelpful: async (req, res) => {
    const answer_id = Number(req.params.answer_id);
    await axios.put(`http://localhost:8080/qa/answers/${answer_id}/helpful`)
      .then((result) => {
        res.send('Successfully posted answer helpfullness')
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  },

  markAnswerReported: async (req, res) => {
    const answer_id = Number(req.params.answer_id);
    await axios.put(`http://localhost:8080/qa/answers/${answer_id}/report`)
      .then((result) => {
        res.send('Successfully reported answer')
      })
      .catch((err) => {
        res.status(500).send(`Error accessing DB ${err}`)
      })
  }
}

module.exports = productOverview;
