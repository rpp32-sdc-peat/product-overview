var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/product-info';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('connect', console.log('Connection established at ', mongoDB));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const productSchema = new mongoose.Schema({
  productId: {type: Number, unique: true},
  name: {type: String},
  slogan: {type: String},
  description: {type: String},
  category: {type: String},
  default_price: {type: Number},
  styles: [{
    styleId: {type: stylesSchema, default: {}}
  }]
});

const stylesSchema = new mongoose.Schema({
  product_id: {type: Number},
  styles: [{
    name: {type: String},
    sale_price: {type: Number},
    original_price: {type: Number},
    default_style: {type: Number}
  }]
  photos: [{thumbnail_url: {type: String}, url: {type: String}}],
  skus: [{
    quantity: {type: Number},
    size: {type: String}
  }]
});

const Product = mongoose.model('Product', productSchema);
const Styles = mongoose.model('Styles', stylesSchema);

module.exports = { Product, Styles };