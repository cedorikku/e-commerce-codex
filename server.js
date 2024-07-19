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

app.get('/api/getCart', (req, res) =>  {
  controller.getCart(req,res)})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});