const models = require('../models/model');

const addToCart = async (req, res) => {
    const { name } = req.body;  // Destructure to get 'title' from the request body
    console.log(`Item name received: ${name}`);

    try {
        const item = models.invSchema.findOne({ name: name });  // Find item by name
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        console.log(item._id);

        // Additional logic to add to cart, e.g., updating stock, creating cart item, etc.
        
        res.status(200).json({ message: 'Item processed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { addToCart };
