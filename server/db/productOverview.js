const axios = require('axios');
const { Product, Styles, RelatedProducts } = require('./index.js');

exports.productOverview = {
  getProducts: async (page, count) => {
    try {
      var queryPage = 1;
      var queryCount = 5;

      console.log(page, count);

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
      var relProductsInfo = await RelatedProducts.findOne({ product_id: productId });
      return relProductsInfo.related_products;
    }
    catch (error) {
      throw error;
    }
  }
};
