
const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({

    userid: { type: String, required: true },
    productid: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    qty: { type: Number, default: 1 },
    mesure: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number },
    category: { type: String},
    quantity: { type: Number, default: 0 },
    savelater: { type: Boolean, default: false }

}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', CartSchema);
export default Cart;
