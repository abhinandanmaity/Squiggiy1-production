
const mongoose = require('mongoose');


const SellerSchema = new mongoose.Schema({

    roll: { type: String, default: 'seller' },
    shopname: { type: String, required: true },
    shopemail: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    delivery: { type: String, required: true },
    categories: { type: String, required: true },
    pincode: { type: String },
    address: { type: String },
    state: { type: String },
    city: { type: String },
    img: { type: String },
    paytm_mid: { type: String },
    paytm_mkey: { type: String },
    resetToken: { type: String },
    expireToken: { type: Date },
    presetToken: { type: String },
    pexpireToken: { type: Date }

}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("Seller", SellerSchema);


// const Seller = mongoose.models.Seller || mongoose.model('Seller', SellerSchema);
// export default Seller;