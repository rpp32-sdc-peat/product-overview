const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Styles } = require('../db/product.js');

const stylesStream = fs.createReadStream(path.join(__dirname, '/../../data/styles.csv'));

// var dataCount = 0;
var stylesWriteData = [];

(async () => {
  try {
    stylesStream
      .pipe(csv())
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
              }}},
              upsert: true
            }
          });

          if (stylesWriteData.length === 500) {
            stylesStream.pause();
            await Styles.bulkWrite(stylesWriteData);
            console.log(`Imported ${stylesWriteData.length} Styles CSV Data`);
            stylesWriteData = [];
            stylesStream.resume();
          }

          // var findStyle = await Styles.find({ product_id: row['productId'] });

          // stylesData.push({
          //   style_id: row['id'],
          //   name: row['name'],
          //   sale_price: (row['sale_price'] === 'null') ? 0 : row['sale_price'],
          //   original_price: row['original_price'],
          //   'default?': (row['default_style'] === 1) ? true : false,
          // })

          // if (stylesData.filter(style => style.product_id === row['productId']).length === 0) {
          //   stylesStream.pause();

          //   await Styles.create({
          //     product_id: row['productId'],
          //     results: stylesData
          //   });

          //   stylesData = [];

          //   console.log(`Style Data Created: ${row['productId']}`);

          //   stylesStream.resume();
          // }


          // var findStyle = await Styles.find({ product_id: row['productId'] });

          // // console.log(findStyle.length);

          // if (findStyle.length === 0) {
          //   stylesStream.pause();


          //   // dataCount++;

          //   stylesStream.resume();
          // } else {
          //   stylesStream.pause();

          //   await Styles.updateOne({ product_id: row['productId'] }, {
          //     $addToSet: {
          //       results: {
          //         style_id: row['id'],
          //         name: row['name'],
          //         sale_price: (row['sale_price'] === 'null') ? 0 : row['sale_price'],
          //         original_price: row['original_price'],
          //         'default?': (row['default_style'] === 1) ? true : false,
          //       }
          //     }
          //   });

          //   console.log(`Style Data Updated: ${row['productId']}`);

          //   // dataCount++;

          //   stylesStream.resume();

          // }
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log(`Imported ${Styles.count()} Styles CSV data`);
        currentProductId = 1;
        process.exit();
      })
      .on('error', err => console.log(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));