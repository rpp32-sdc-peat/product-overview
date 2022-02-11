const axios = require('axios');

exports.questionsAndAnswers = {
  getQuestions: async (req, res) => {
    await axios.get('http://localhost:8080/qa/questions/')
    .then((result) => {
      res.send(result.data)
    })
  }
}
