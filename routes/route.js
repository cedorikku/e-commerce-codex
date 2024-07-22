const controller = require('../controller/controllers');

console.log('Routing successfully');

module.exports = (app) => {
    app.put('/api/cart', (req, res) => {
        controller.addToCart(req, res);
    });
    app.get('/', (req, res) => {
        controller.renderProducts(req, res);
    });
    app.get('/cart', (req, res) => {
        controller.renderUserCart(req, res);
    });
    app.put('/api/updateCart', (req, res) => {
        controller.updateCart(req, res);
    });
    app.get('/checkout', (req, res) => {
        controller.renderCheckout(req, res);
    });
    app.post('/api/checkoutData', (req, res) => {
        controller.checkOut(req, res);
    });
    app.delete('/api/deleteItem', (req, res) => {
        controller.deleteCartItem(req, res);
    });
};
