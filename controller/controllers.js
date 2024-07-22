const express = require('express')
const app = express()
const { Inventory } = require('../models/inventory');
const { tempUserCart } = require('../models/tempCart');
const { checkouts } = require('../models/checkouts');
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
        if (tempItem.qty < item.stock){
            await tempUserCart.findOneAndUpdate({name: item.name}, { $inc: { qty: 1, subtotal: item.price }});
            res.status(201).json({ message: "Success! Cart updated." });
        }
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
        res.status(201).json({ message: "Success! Item added to cart." });
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
        res.status(201).json({ message: "Success! Cart updated." });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

const renderCheckout = async (req, res) => {
    const cart = await tempUserCart.find();
    if (!cart || cart.length === 0) {
        res.redirect('/');
    } else {
        res.render('checkout', { cart })
    }
}

const checkOut = async (req, res) => {
    const cart = await tempUserCart.find();
    const result = await tempUserCart.aggregate([
        { $group: { _id: null, sumTotal: { $sum: "$subtotal" } } }
      ]);
    const sf = 49, initialamount = result.length > 0 ? result[0].sumTotal : 0;
    const userCheckout = new checkouts({
        fullname: req.body.fullname,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        zipcode: req.body.zipcode,
        country: req.body.country,
        mop: req.body.mop,
        sf: sf,
        initialamount: initialamount,
        grandtotal: sf + initialamount,
        usercart: cart
    })
    userCheckout.save()
    for(const item of cart) {
        await Inventory.findOneAndUpdate({name: item.name}, {$inc: {stock : -item.qty}})
    }
    await tempUserCart.deleteMany();
    res.status(201).json({ message: "Success! Cart updated." });
}

const deleteCartItem = async (req, res) => {
    const findID = await tempUserCart.findOne({name: req.body.name})
    await tempUserCart.deleteOne({_id: findID})
    res.status(201).json({ message: "Success! Cart updated." });
}

module.exports = { renderProducts, renderUserCart, addToCart, updateCart, renderCheckout, checkOut, deleteCartItem };