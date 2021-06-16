const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for property
const PropertySchema = new Schema({
  title: String,
  location: String,
  status: String,
  type: String,
  price: String,
  area: String,
  master_bedrooms: { type: Number, default: 0 },
  bedrooms: Number,
  bathrooms: Number,
  description: String,
  images: { type: Array, required: true }
})

//create model for Property
const Property = mongoose.model('property', PropertySchema);

module.exports = Property;
