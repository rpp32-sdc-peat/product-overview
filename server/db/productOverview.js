const axios = require('axios');
const { Product, Styles, RelatedProducts } = require('./index.js');

// under 50ms for API queries -> check Thunder Client / Postman
// Redis and caching for optimization
// Redis allows uploading a bunch of keys for 'warming up'
// Do not set 'time to live' or else all the uploaded keys 'age out' and testing will be inefficient

// Test range -> half keys should already be in cache before testing
// Let k6 run for awhile to 'warm' it up

exports.productOverview = {
  getProducts: async (page, count) => {
    try {
      var queryPage = 1;
      var queryCount = 5;

      if (page !== '' && page !== undefined) {
        queryPage = Number(page);
      }

      if (count !== '' && count !== undefined) {
        queryCount = Number(count);
      }

      var productList = await Product.find({}).skip((queryPage > 1 ? 30 * queryPage : 0)).limit(queryCount);

      return productList;
    }
    catch (error) {
      throw error;
    }
  },

  getProduct: async (productId) => {
    try {
      var productDetails = await Product.findOne({ id: productId });
      return productDetails;
    }
    catch (error) {
      throw error;
    }
  },

  getStyles: async (productId) => {
    try {
      var stylesInfo = await Styles.findOne({ product_id: productId });
      return stylesInfo;
    }
    catch (error) {
      throw error;
    }
  },

  getRelatedProducts: async (productId) => {
    try {
      var relProductsInfo = await RelatedProducts.find({ product_id: productId });
      var relProductsData = {
        product_id: productId,
        related_products: []
      };
      for (var i = 0; i < relProductsInfo.length; i++) {
        relProductsData.related_products.push(...relProductInfo[i].relatedProducts);
      }
      return relProductsData;
    }
    catch (error) {
      throw error;
    }
  }
};
