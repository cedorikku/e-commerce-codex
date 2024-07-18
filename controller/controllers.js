const { Inventory } = require('../models/inventory');
const { tempUserCart } = require('../models/tempCart');

const addToCart = async (req, res) => {
    const item = await Inventory.findOne({ name: req.body.name }); 
    const added = await Inventory.findByIdAndUpdate(item._id, { $inc: { stock: -1 } });
    const tempItem = await tempUserCart.findOne({name: item.name})
    .then((tempItem) => {
        const addedItem = tempUserCart.findOneAndUpdate(tempItem._id, { $inc: { qty: 1 } });
    })
    .catch(tempItem => {
        const newItem = new tempUserCart({
            name: item.name,
            price: item.price,
            qty: 1,
            category: item.category
        })
        const addedItem = newItem.save()
    });
};

module.exports = { addToCart };
