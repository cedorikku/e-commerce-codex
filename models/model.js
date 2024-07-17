const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: String,
  price: Float32Array, 
  stock: Number,
  category: String,
});

module.exports = mongoose.model("products", productsSchema);