const productOverviewRouter = require('express').Router();

const { productOverview } = require('../db/productOverview.js');
const { getProducts, getProduct, getStyles, getRelatedProducts } = productOverview;

// query -> parameters inserted from front end
// : -> params (example -> :product_id)

productOverviewRouter.get('/', async (req, res) => {
  try {
    var [page, count] = [req.query.page, req.query.count];
    var data = await getProducts(page, count);
    res.status(200).send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

productOverviewRouter.get('/:product_id', async (req, res) => {
  try {
    var productId = req.params.product_id;
    var data = await getProduct(productId);
    res.status(200).send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

productOverviewRouter.get('/:product_id/styles', async (req, res) => {
  try {
    var productId = req.params.product_id;
    var data = await getStyles(productId);
    res.status(200).send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

productOverviewRouter.get('/:product_id/related', async (req, res) => {
  try {
    var productId = req.params.product_id;
    var data = await getRelatedProducts(productId);
    console.log(data);
    res.status(200).send(data);
  }
  catch (error) {
    res.status(500).send(error);
  }
});

module.exports = productOverviewRouter;
