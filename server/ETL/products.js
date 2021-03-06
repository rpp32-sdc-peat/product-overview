const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Product } = require('../db/index.js');

const productsStream = fs.createReadStream(path.join(__dirname, '/../../data/product.csv'));

var productData = [];

(async () => {
  try {
    productsStream
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        try {
          productData.push({
            insertOne: {
              id: row['id'],
              name: row['name'],
              slogan: row['slogan'],
              description: row['description'],
              category: row['category'],
              default_price: row['default_price'],
              features: []
            }
          })

          if (productData.length === 5) {
            productsStream.pause();
            await Product.bulkWrite(productData);
            console.log(`Inserted ${productData.length} Product Data`);
            productData = [];
            productsStream.resume();
          }
        }
        catch (err) {
          throw err;
        }
      })
      .on('end', async () => {
        var count = await Product.count();
        console.log(`Imported ${count} Product CSV data`);
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));