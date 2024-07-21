const express = require('express');
const ejs = require('ejs');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;

app.use(express.json(), express.static('public'));

require('./config/conf');

const controller = require('./controller/controllers')
app.put('/api/cart', controller.addToCart)

app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  controller.renderProducts(req, res);
});

app.get('/cart', (req, res) => {
  controller.renderUserCart(req, res);
});

app.put('/api/updateCart', (req, res) => {
  controller.updateCart(req,res);
});

app.get('/checkout', (req, res) => {
  controller.renderCheckout(req, res);
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});