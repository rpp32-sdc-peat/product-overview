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
          relProductsData.push({
            updateOne: {
              filter: { product_id: row['current_product_id'] },
              update: { $addToSet: { related_products: row['related_product_id'] }},
              upsert: true
            }
          });
          // console.log(row['current_product_id'], row['related_product_id']);

          if (relProductsData.length === 1000) {
            relProductsStream.pause();
            await RelatedProducts.bulkWrite(relProductsData);

            console.log(`Inserted ${relProductsData.length} related products data from Related Products CSV`);

            relProductsData = [];
            relProductsStream.resume();
          }
        }
        catch (err) {
          throw err;
        }
      })
      .on('end', async () => {
        var count = await RelatedProducts.count();
        console.log(`Imported ${count} Related Products CSV data`);
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));