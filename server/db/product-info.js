var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/product-info';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('connect', console.log(mongoDB, ': Connection Established!'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productSchema = new mongoose.Schema({
  productId: {type: Number, unique: true},
  name: {type: String},
  slogan: {type: String},
  description: {type: String},
  defaultPrice: {type: Number},
  styles: [{
    styleId: {type: stylesSchema, default: {}}
  }]
});

const stylesSchema = new mongoose.Schema({
  style_id: {type: Number, unique: true},
  photos: {thumbnail_url: String, url: String},
  skus: [{
    quantity: {type: Number},
    size: {type: String}
  }]
});

// Product = {
//   _id: "ObjectID('AAAA')",
//   name: string,
//   slogan: string,
//   description: string,
//   defaultPrice: number,
//   styles: ["ObjectID('BBBB')", "ObjectID('BBBB')", "ObjectID('BBBB')"]
// };

// Styles = {
//   style_id: "ObjectID('BBBB')",
//   photos: { thumbnail_url: string, url: string }
//   skus: "ObjectID('BBBB')"
// }

// Sizes = {

// }

// Ratings = {
//   _id: "ObjectID('AAAA')",
//   average: number
// }
