const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Styles } = require('../db/product.js');

const skusStream = fs.createReadStream(path.join(__dirname, '/../../data/skus.csv'));

var skusList = [];
var currentStyleId = 1;

(async () => {
  try {
    skusStream
      .pipe(csv())
      .on('data', async row => {
        try {
          if (row['styleId'] === currentStyleId) {
            skusList.push({
              skuId: row['id'],
              size: row['size'],
              quantity: row['quantity']
            })
          } else {
            skusStream.pause();

            await Styles.updateOne({ $and: [{ product_id: currentStyleId }, { results: { style_id: row['styleId']} }] }, { results: [{ skus: skusList }] });

            skusList = [];
            currentStyleId++;

            console.log(`Added Skus for style ID: ${row['styleId']}`);

            skusStream.resume();
          }
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log('Imported Skus CSV data');
        currentStyleId = 1;
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));