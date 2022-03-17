require('dotenv').config();

const uri = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@ec2-18-206-68-240.compute-1.amazonaws.com:27017/product-info`;

var mongoose = require('mongoose');

// var mongoDB = 'mongodb://127.0.0.1:27017/product-info';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;

db.on('connect', () => console.log('Connection established at ', uri));
db.on('error', () => console.error.bind(console, 'MongoDB connection error:'));

const productSchema = new mongoose.Schema({
  id: {type: Number, index: true},
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
  product_id: {type: Number, index: true},
  results: [{
    style_id: {type: Number, index: true},
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

productSchema.index({ id: 1 });
stylesSchema.index({ product_id: 1, 'results.style_id': 1 });
relatedProductsSchema.index({ product_id: 1 });

const Product = mongoose.model('Product', productSchema);
const Styles = mongoose.model('Styles', stylesSchema);
const RelatedProducts = mongoose.model('RelatedProducts', relatedProductsSchema);

module.exports = { Product, Styles, RelatedProducts };