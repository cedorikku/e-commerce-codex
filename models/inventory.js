const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    picture: {type: String, required: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
});

const Inventory = mongoose.model('Inventory', inventorySchema);
module.exports = { Inventory };
