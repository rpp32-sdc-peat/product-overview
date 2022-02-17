const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Product } = require('../db/product.js');

const productsStream = fs.createReadStream(path.join(__dirname, '/../../data/product.csv'));

var productData = [];

(async () => {
  try {
    productsStream
      .pipe(csv())
      .on('data', async row => {
        try {
          productData.push({
            id: row['id'],
            name: row['name'],
            slogan: row['slogan'],
            description: row['description'],
            category: row['category'],
            default_price: row['default_price'],
          });

          if (productData.length === 10000) {
            productsStream.pause();

            await Product.create(productData);

            console.log(`Inserted ${productData.length} product data from Product CSV`);

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
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));