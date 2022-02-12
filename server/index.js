const express = require('express');
const expressStaticGzip = require("express-static-gzip");
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

// Import your routers here
const productOverviewRouter = require('./routes/productOverview.js');
const questionsAndAnswersRouter = require('./routes/questionsAndAnswers.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/../client/dist'))
app.use("/", expressStaticGzip(path.join(__dirname, '/../client/dist'), {
  enableBrotli: true
}));

// Place your routers
app.use('/productOverview', productOverviewRouter);
app.use('/qa', questionsAndAnswersRouter);

app.listen(port, () => console.log('Listening on:', port));
