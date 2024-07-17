const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  price: Float32Array, 
  stock: Number,
  category: String,
});

module.exports = mongoose.model("inventory", inventorySchema);