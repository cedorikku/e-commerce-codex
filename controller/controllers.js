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
    const inventory = await Inventory.find();
    const cart = await tempUserCart.find();
    res.render('cart', { cart, inventory} );
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
            stock: item.stock,
            qty: 1,
            category: item.category,
            subtotal: item.price * 1
        })
        newItem.save()
    };
};

const updateCart = async (req, res) => {
    // Ensure first that there is a cart item
    let cartId;
    let cartItem;

    try {
        // Find
        cartItem = await tempUserCart.findOne({name: req.body.prodName});
        if (!cartItem) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        cartId = cartItem._id;

        // Update
        const newQuantity = parseInt(req.body.quantity, 10);
        if (isNaN(newQuantity) || newQuantity < 1) { 
            return res.status(400).json({ error: "Invalid quantity" });
        }
        
        await tempUserCart.findOneAndUpdate({_id: cartId}, {qty: newQuantity});
        await tempUserCart.findOneAndUpdate({_id: cartId}, {subtotal: newQuantity * cartItem.price})
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const renderCheckout = async (req, res) => {
    const cart = await tempUserCart.find();
    res.render('checkout', { cart })
}

module.exports = { renderProducts, renderUserCart, addToCart, updateCart, renderCheckout };