const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Product } = require('../db/index.js');

const featuresStream = fs.createReadStream(path.join(__dirname, '/../../data/features.csv'));

var featuresData = [];

(async () => {
  try {
    featuresStream
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        try {
          await Product.updateOne({ id: row['product_id'] }, {
            $addToSet: {
              features: {
                feature: row['feature'],
                value: row['value']
              }
            }
          })
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log(`Imported Features CSV data`);
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));