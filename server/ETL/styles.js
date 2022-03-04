const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Styles } = require('../db/index.js');

const stylesStream = fs.createReadStream(path.join(__dirname, '/../../data/styles.csv'));

var stylesWriteData = [];

(async () => {
  try {
    stylesStream
      .pipe(csv.parse({ headers: true }))
      .on('data', async row => {
        try {
          await Styles.updateOne({ product_id: row['productId'] }, {
            $push: {
              results: {
                style_id: row['id'],
                name: row['name'],
                sale_price: (row['sale_price'] === 'null') ? 0 : row['sale_price'],
                original_price: row['original_price'],
                'default?': (row['default_style'] === 1) ? true : false,
                photos: [],
                skus: []
              }
            }
          }, {
            upsert: true
          });
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', async () => {
        var stylesCount = await Styles.count();
        console.log(`Imported ${stylesCount} Styles CSV data`);
      })
      .on('error', err => console.log(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));