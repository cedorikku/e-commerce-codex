const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: String,
  price: Double, 
  stock: Number,
  category: String,
});

module.exports = mongoose.model("products", productsSchema);