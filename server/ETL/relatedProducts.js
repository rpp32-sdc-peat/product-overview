const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { RelatedProducts } = require('../db/index.js');

const relProductsStream = fs.createReadStream(path.join(__dirname, '/../../data/related.csv'));

var relProductsData = [];

(async () => {
  try {
    relProductsStream
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        try {
          await RelatedProducts.updateOne({ product_id: row['current_product_id'] }, {
            $push: {
              related_products: row['related_product_id']
            }}, {
              upsert: true
            });
        }
        catch (err) {
          throw err;
        }
      })
      .on('end', async () => {
        var count = await RelatedProducts.count();
        console.log(`Imported ${count} Related Products CSV data`);
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));