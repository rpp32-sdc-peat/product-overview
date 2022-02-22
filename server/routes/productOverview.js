const productOverviewRouter = require('express').Router();

const { productOverview } = require('../db/productOverview.js');
const { getProducts, getProduct, getStyles, getRelatedProducts } = productOverview;

productOverviewRouter.get('/', async (req, res) => {
  try {
    var data = await getProducts(req, res);
    res.end(data);
  }
  catch (error) {
    throw error;
  }
});

productOverviewRouter.get('/:product_id', async (req, res) => {
  try {
    var data = await getProduct(req, res);
    res.end(data);
  }
  catch (error) {
    throw error;
  }
});

productOverviewRouter.get('/:product_id/styles', async (req, res) => {
  try {
    var data = await getStyles(req, res);
    res.end(data);
  }
  catch (error) {
    throw error;
  }
});

productOverviewRouter.get('/:product_id/related', async (req, res) => {
  try {
    var data = await getRelatedProducts(req, res);
    res.end(data);
  }
  catch (error) {
    throw error;
  }
});

module.exports = productOverviewRouter;
