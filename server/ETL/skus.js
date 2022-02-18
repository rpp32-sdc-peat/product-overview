const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Styles } = require('../db/product.js');

const skusStream = fs.createReadStream(path.join(__dirname, '/../../data/skus.csv'));

var skusWriteData = [];

(async () => {
  try {
    skusStream
      .pipe(csv.parse({ headers: true, quote: null }))
      .on('data', async row => {
        try {
          skusWriteData.push({
            updateOne: {
              filter: { 'results.style_id': row['styleId'] },
              update: { $addToSet: { 'results.$.skus': {
                quantity: row['quantity'],
                size: row['size']
              }}},
            }
          });

          if (skusWriteData.length === 10000) {
            await Styles.bulkWrite(skusWriteData);
            console.log(`Imported ${skusWriteData.length} Skus CSV Data`);
            skusWriteData = [];
          }
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log('Imported All Skus CSV data');
        currentStyleId = 1;
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));