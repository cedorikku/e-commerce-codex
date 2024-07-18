const controller = require('../controller/controller');
console.log('Routing successfully');
module.exports = app => {
    app.put('/api/cart', controller.addToCart);
};