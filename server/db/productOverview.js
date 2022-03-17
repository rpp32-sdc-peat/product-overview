const axios = require('axios');
const { Product, Styles, RelatedProducts } = require('./index.js');

const redis = require('redis');
const deployed = process.env.IPS;

const redisClient = redis.createClient({ url: `redis://3.209.152.176:6379` });

redisClient.on('error', err => {
  console.log('Redis Connection Error: ' + err);
})

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
      await redisClient.hGet(productId, 'product', async (error, product) => {
        if (error) console.error(error);
        if (product !== null) {
          return JSON.parse(product);
        } else {
          var productDetails = await Product.findOne({ id: productId });
          await redisClient.hSet(productId, 'product', JSON.stringify(productDetails));
          return productDetails;
        }})
    }
    catch (error) {
      throw error;
    }
  },

  getStyles: async (productId) => {
    try {
      await redisClient.hGet(productId, 'styles', async (error, styles) => {
        if (error) console.error(error);
        if (styles !== null) {
          return JSON.parse(styles);
        } else {
          var stylesInfo = await Styles.findOne({ product_id: productId });
          if (stylesInfo) {
            var stylesData = {
              product_id: stylesInfo.product_id,
              results: stylesInfo.results
            };
            await redisClient.hSet(productId, 'styles', JSON.stringify(stylesData));
            return stylesData;
          } else {
            return;
          }
        }
      })
    }
    catch (error) {
      throw error;
    }
  },

  getRelatedProducts: async (productId) => {
    try {
      await redisClient.hGet(productId, 'relatedProducts', async (error, relProds) => {
        if (error) console.error(error);
        if (relProds !== null) {
          return JSON.parse(relProds);
        } else {
          var relProductsInfo = await RelatedProducts.find({ product_id: productId });
          if (relProductsInfo) {
            var relProductsData = {
              product_id: productId,
              related_products: []
            };
            for (var i = 0; i < relProductsInfo.length; i++) {
              relProductsData.related_products.push(...relProductInfo[i].relatedProducts);
            }
            await redisClient.hSet(productId, 'relatedProducts', JSON.stringify(relProductsData));
            return relProductsData;
          } else {
            return;
          }
        }
      })
    }
    catch (error) {
      throw error;
    }
  }
};
