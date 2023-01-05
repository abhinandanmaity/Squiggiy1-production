
const mongoose = require('mongoose');


const WishlistSchema = new mongoose.Schema({

    userid: { type: String, required: true },
    productid: { type: String, required: true }

}, { timestamps: true });

const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);
export default Wishlist;