const { Inventory } = require('../models/model');

const addToCart = async (req, res) => {
    const item = await Inventory.findOne({ name: req.body.name }); 
    const added = await Inventory.findByIdAndUpdate(item._id, { $inc: { stock: -1 } });
};

module.exports = { addToCart };
