const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { Styles } = require('../db/product.js');

const photosStream = fs.createReadStream(path.join(__dirname, '/../../data/photos.csv'));

var photosWriteData = [];

(async () => {
  try {
    photosStream
      .pipe(csv())
      .on('data', async row => {
        try {
          photosWriteData.push({
            updateOne: {
              filter: { results.style_id: row['styleId'] },
              update: { $addToSet: { results.photos: {
                thumbnail_url: row['thumbnail_url'],
                url: row['url']
              }}}
            }
          });

          if (photosWriteData.length === 500) {
            photosStream.pause();
            await Styles.bulkWrite(stylesWriteData);
            console.log(`Imported ${photosWriteData.length} Photos CSV Data`);
            photosWriteData = [];
            photosStream.resume();
          }
        }
        catch (err) {
          throw err;
        }
      })
      .on('end', () => {
        console.log(`Imported all Photos CSV data`);
        process.exit();
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));