
const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({

    userid: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    decs: { type: String, required: true },
    img: { type: String, required: true },
    mesure: { type: String },
    quantity: { type: Number, default: 0},
    price: { type: Number, required: true },
    discount: { type: Number },
    category: { type: String, required: true },
    avalibleQty: { type: Number },
    exdate: { type: String },

}, { timestamps: true });

// mongoose.models = {}
// export default mongoose.model("Product", ProductSchema);

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;