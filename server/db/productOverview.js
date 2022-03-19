const { Product, Styles, RelatedProducts } = require('./index.js');

const redisClient = require('./redis.js');

// under 50ms for API queries -> check Thunder Client / Postman
// Redis and caching for optimization
// Redis allows uploading a bunch of keys for 'warming up'
// Do not set 'time to live' or else all the uploaded keys 'age out' and testing will be inefficient

// Test range -> half keys should already be in cache before testing
// Let k6 run for awhile to 'warm' it up

// Redis Schema:
// productId -> 'product', 'styles', 'relatedProducts' -> stringified data for each key

getOrSetCache = (hash, key, cb) => {
  return new Promise((resolve, reject) => {
    redisClient.hGet(hash, key, async (error, data) => {
      if (error) {
        return reject(error);
      }
      if (data !== null) {
        console.log(`REDIS ${key} data present`);
        return resolve(JSON.parse(data));
      } else {
        console.log(`REDIS ${key} data not present`);
        const data = await cb();
        redisClient.hSet(hash, key, JSON.stringify(data));
        resolve(data);
      }
    })
  })
}

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
      console.log(`GET /products/${productId}`);

      var cache = await getOrSetCache(productId, 'product', async () => {
        var data = await Product.findOne({ id: productId });
        return data;
      });

      return cache;
    }
    catch (error) {
      throw error;
    }
  },

  getStyles: async (productId) => {
    try {
      console.log(`GET /products/${productId}/styles`);

      var cache = await getOrSetCache(productId, 'styles', async () => {
        var data = await Styles.findOne({ product_id: productId });
        if (data) {
          var stylesData = {
            product_id: data.product_id,
            results: data.results
          };

          return stylesData;
        } else {
          return '';
        }
      });

      return cache;
    }
    catch (error) {
      throw error;
    }
  },

  getRelatedProducts: async (productId) => {
    try {
      console.log(`GET /products/${productId}/related`);

      var cache = await getOrSetCache(productId, 'relatedProducts', async () => {
        var data = await RelatedProducts.find({ product_id: productId });
        if (data) {
          var relProductsData = {
            product_id: productId,
            related_products: []
          };

          for (var i = 0; i < data.length; i++) {
            relProductsData.related_products.push(...data[i].relatedProducts);
          }

          return relProductsData;
        } else {
          return '';
        }
      })

      return cache;
    }
    catch (error) {
      throw error;
    }
  }
};
