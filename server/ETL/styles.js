const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Styles } = require('../db/product.js');

const stylesStream = fs.createReadStream(path.join(__dirname, '/../../data/styles.csv'));

var stylesWriteData = [];

(async () => {
  try {
    stylesStream
      .pipe(csv.parse({ headers: true}))
      .on('data', async row => {
        try {
          stylesWriteData.push({
            updateOne: {
              filter: { product_id: row['productId'] },
              update: { $addToSet: { results: {
                style_id: row['id'],
                name: row['name'],
                sale_price: (row['sale_price'] === 'null') ? 0 : row['sale_price'],
                original_price: row['original_price'],
                'default?': (row['default_style'] === 1) ? true : false,
                photos: [],
                skus: []
              }}},
              upsert: true
            }
          });

          if (stylesWriteData.length === 500) {
            await Styles.bulkWrite(stylesWriteData);
            console.log(`Imported ${stylesWriteData.length} Styles CSV Data`);
            stylesWriteData = [];
          }
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log(`Imported All Styles CSV data`);
        currentProductId = 1;
        process.exit();
      })
      .on('error', err => console.log(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));