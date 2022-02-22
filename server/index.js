const express = require('express');
const app = express();
const productOverviewRouter = require('./routes/productOverview.js');

app.use(express.json());
app.use('/products', productOverviewRouter);

app.listen(port, () => console.log('Listening on:', port));