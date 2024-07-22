const mongoose = require('mongoose');

const checkoutsSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: Number, required: true },
    country: { type: String, required: true },
    mop: { type: String, required: true },
    sf: { type: Number, required: true },
    initialamount: { type: Number, required: true },
    grandtotal: { type: Number, required: true },
    usercart: []
}, { timestamps: true });

const checkouts = mongoose.model('checkouts', checkoutsSchema);
module.exports = { checkouts };
