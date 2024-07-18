const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,
    price: Number, 
    stock: Number,
    category: String,
  });

const invSchema = mongoose.model("inventories", inventorySchema);
module.exports = { invSchema };