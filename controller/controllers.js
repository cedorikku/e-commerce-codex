const express = require('express')
const app = express()
const { Inventory } = require('../models/inventory');
const { tempUserCart } = require('../models/tempCart');
app.use(express.json())

const renderProducts = async (req, res) => {
    const items = await Inventory.find();
    res.render('index', { items });
};

const renderUserCart = async (req, res) => {
    const cart = await tempUserCart.find();
    res.render('cart', { cart });
}

const addToCart = async (req, res) => {
    const item = await Inventory.findOne({ name: req.body.name })
    // const added = await Inventory.findByIdAndUpdate(item._id, { $inc: { stock: -1 } })
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

const getCart = async (req, res) => {
    const cartItems = await tempUserCart.find();
    console.log(cartItems)
    res.json(cartItems);
};

module.exports = { renderProducts, renderUserCart, addToCart, getCart};
