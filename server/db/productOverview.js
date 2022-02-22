const axios = require('axios');
const { Product, Styles, RelatedProducts } = require('./product.js');

// query -> parameters inserted from front end
// : -> params (example -> :product_id)

const productOverview = {
  getProducts: async (page, count) => {
    try {
      // page -> page of results to return. Default: 1
      // count -> how many results per page to return. Default: 5
      var queryPage = 1;
      var queryCount = 5;

      if (page) {
        queryPage = Number(page);
      }

      if (count) {
        queryCount = Number(count);
      }

      var productList = await Product.find({}).skip(30 * queryPage).limit(queryCount);

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
  }

  getStyles: async (productId) => {
    try {
      var stylesInfo = await Styles.findOne({ product_id: productId });
      return stylesInfo;
    }
    catch (error) {
      throw error;
    }
  }

  getRelatedProducts: async (productId) => {
    try {
      var relProductsInfo = await RelatedProducts.findOne({ product_id: productId });
      return relProductsInfo.related_products;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = productOverview;
