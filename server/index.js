const express = require('express');
const app = express();
const cors = require('cors');
const productOverviewRouter = require('./routes/productOverview.js');

app.use(express.json());
app.use(cors());
app.use('/products', productOverviewRouter);

module.exports = app;