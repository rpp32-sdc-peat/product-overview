const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Styles } = require('../db/index.js');

const skusStream = fs.createReadStream(path.join(__dirname, '/../../data/skus.csv'));

var skusWriteData = [];

(async () => {
  try {
    skusStream
      .pipe(csv.parse({ headers: true, quote: null }))
      .on('data', async row => {
        try {
          await Styles.updateOne({ 'results.style_id': row['styleId']}, {
            $push: {
              'results.$.skus': {
                quantity: row['quantity'],
                size: row['size']
              }
            }
          })
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log('Imported All Skus CSV data');
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));