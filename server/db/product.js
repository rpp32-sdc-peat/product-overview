var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/product-info';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('connect', () => console.log('Connection established at ', mongoDB));
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));

const productSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  name: {type: String},
  slogan: {type: String},
  description: {type: String},
  category: {type: String},
  default_price: {type: Number},
  features: [{
    feature: {type: String},
    value: {type: String}
  }]
});

const stylesSchema = new mongoose.Schema({
  product_id: {type: Number},
  results: [{
    style_id: {type: Number, unique: true},
    name: {type: String},
    sale_price: {type: Number},
    original_price: {type: Number},
    'default?': {type: Boolean},
    photos: [{thumbnail_url: {type: String}, url: {type: String}}],
    skus: [{
      quantity: {type: Number},
      size: {type: String}
    }]
  }],
});

const relatedProductsSchema = new mongoose.Schema({
  product_id: {type: Number},
  related_products: [Number]
})

const Product = mongoose.model('Product', productSchema);
const Styles = mongoose.model('Styles', stylesSchema);
const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

module.exports = { Product, Styles, RelatedProducts };