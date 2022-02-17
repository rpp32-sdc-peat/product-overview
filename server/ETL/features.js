const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Product } = require('../db/product.js');

const featuresStream = fs.createReadStream(path.join(__dirname, '/../../data/features.csv'));

var featuresData = [];

(async () => {
  try {
    featuresStream
      .pipe(csv())
      .on('data', async row => {
        try {
          featuresData.push({
            id: row['product_id'],
            feature: row['feature'],
            value: row['value']
          });

          if (featuresData.length === 500) {
            featuresStream.pause();

            for (var i = 0; i < featuresData.length; i++) {
              await Product.updateOne({ id: featuresData[i].id }, { $addToSet: { features: { feature: featuresData[i].feature, value: featuresData[i].value }}});
            }

            console.log(`Inserted ${featuresData.length} features from Features CSV`);

            featuresData = [];

            featuresStream.resume();
          }
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log('Imported Features CSV data');
        currentProductId = 1;
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));