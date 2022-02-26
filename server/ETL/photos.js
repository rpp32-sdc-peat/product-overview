const fs = require('fs');
const csv = require('fast-csv');
const path = require('path');
const { Styles } = require('../db/index.js');

const photosStream = fs.createReadStream(path.join(__dirname, '/../../data/photos.csv'));

var photosWriteData = [];

(async () => {
  try {
    photosStream
      .pipe(csv.parse({ headers: true, quote: null }))
      .on('data', async row => {
        try {
          await Styles.updateOne({ 'results.style_id': row['styleId'] }, {
            $push: {
              'results.$.photos': {
                thumbnail_url: row['thumbnail_url'],
                url: row['url']
            }}
          })
        }
        catch (err) {
          console.error(err);
        }
      })
      .on('end', () => {
        console.log(`Imported all Photos CSV data`);
      })
      .on('error', err => console.error(err));
  }
  catch (err) {
    throw err;
  }
})().catch(err => console.error(err));