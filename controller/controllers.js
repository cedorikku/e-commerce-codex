const { Inventory } = require('../models/inventory');
const { tempUserCart } = require('../models/tempCart');

const renderProducts = async (req, res) => {
    const items = await Inventory.find();
    console.log(items);
    res.render('index', { products: { items } });
};

const addToCart = async (req, res) => {
    const item = await Inventory.findOne({ name: req.body.name })
    const added = await Inventory.findByIdAndUpdate(item._id, { $inc: { stock: -1 } })
    let tempItem = await tempUserCart.findOne({name: item.name})
    if (tempItem) {
        await tempUserCart.findOneAndUpdate({_id: tempItem._id}, { $inc: { qty: 1 }});
        await tempUserCart.findOneAndUpdate({_id: tempItem._id}, { $inc: { subtotal: item.price }});
    } else {
        const newItem = new tempUserCart({
            name: item.name,
            price: item.price,
            qty: 1,
            category: item.category,
            subtotal: item.price * 1
        })
        newItem.save()
    };
};

module.exports = { renderProducts, addToCart};
