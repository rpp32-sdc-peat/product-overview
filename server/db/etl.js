const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
// const { Product, Styles } = require('./product.js');

// var readProductData = fs.createReadStream(path.join(__dirname, '/../data/product.csv'));
// var readFeaturesData = fs.createReadStream(path.join(__dirname, '/../data/features.csv'));

(fs.createReadStream(path.join(__dirname, '/../../data/product.csv'))
  .pipe(csv())
  .on('data', async productData => {
    // var newProduct = new Product({
    //   productId: productData['id']
    //   name: productData['name'],
    //   slogan: productData['slogan'],
    //   description: productData['description'],
    //   category: productData['category'],
    //   default_price: productData['default_price'],
    //   styles: [{
    //     styleId: {type: stylesSchema, default: {}}
    //   }]
    // });

    // console.log(productData['id']);

    var listOfStyles = await readStylesData(productData['id']);
    var listOfPhotos = await readPhotosData(productData['id']);
    var listOfSkus = await readSkusData(productData['id']);

    readStylesData(productData['id'])
      // .then(result => console.log(result));

    // console.log(listOfStyles);
    // console.log(listOfPhotos);
    // console.log(listOfSkus);

    // var newStyle = new Styles({
    //   product_id: productData['id'],
    //   styles: listOfStyles,
    //   photos: listOfPhotos,
    //   skus: listOfSkus
    // })

    // await newProduct.save();
  })
  .on('error', err => console.log(err))
);

var readStylesData = async (currentProductId) => {
  var stylesList = [];

  const stylesStream = fs.createReadStream(path.join(__dirname, '/../../data/styles.csv'));

  stylesStream
    .pipe(csv())
    .on('data', stylesData => {
      if (stylesData['productId'] === currentProductId) {
        stylesList.push({
          styleId: stylesData['id'],
          styles: [{
            name: stylesData['name'],
            sale_price: stylesData['sale_price'],
            original_price: stylesData['original_price'],
            default_style: stylesData['default_style']
          }],
        })
      } else {
        stylesStream.pause();
        console.log('paused');
        return;
      }
    })
    .on('end', () => {
      console.log(stylesList);
    })
    .on('error', err => console.log(err));

  // return stylesList;
}

var readPhotosData = async (currentProductId) => {
  var photosList = [];
  await fs.createReadStream(path.join(__dirname, '/../../data/photos.csv'))
    .pipe(csv())
    .on('data', async photoData => {
      if (photoData['styleId'] === currentProductId) {
        photosList.push({
          photoId: photoData['id'],
          url: photoData['url'],
          thumbnail_url: photoData['thumbnail_url']
        })
      }
    })
    .on('error', err => console.log(err));

  return photosList;
}

var readSkusData = async (currentProductId) => {
  var skusList = [];
  await fs.createReadStream(path.join(__dirname, '/../../data/skus.csv'))
    .pipe(csv())
    .on('data', async skuData => {
      if (skuData['styleId'] === currentProductId) {
        skusList.push({
          skuId: skuData['id'],
          size: skuData['size'],
          quantity: skuData['quantity']
        })
      }
    })
    .on('error', err => console.log(err));

  return skusList;
}



// ----------------

// fs.createReadStream('cities.csv')
//   .pipe(csv())
//   .on('data', (data) => {
//     let zipArr = data['zips'].split(" ");
//     var newCity = new City({
//       cityName: data['city'],
//       state:data['state_name'],
//       cityDisplayName:data['display_name'],
//       zips:zipArr,
//     });

//     newCity.save(function(err, item) {
//       if (item) {
//         count++
//         console.log(", "+count);
//       }
//       if (err) {
//        console.log("Error")
//       }
//     });
//     })
//   .on('end', () => {
//     console.log("Done");
//   });