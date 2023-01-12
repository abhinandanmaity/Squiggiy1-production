
const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({

    userid: { type: String, required: true },
    userphone: { type: Number, required: true },
    orderid: { type: String, required: true, unique: true },
    paymentinfo: { type: Object },
    products: { type: Object, required: true },
    shippingaddress: {
        address: { type: String, required: true },
        pincode: { type: Number, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true }
    },
    amount: { type: Number, required: true },
    paymentstatus: { type: String, default: 'Initiate' },
    orderstatus: { type: String, default: 'ok' },
    deliverystatus: { type: String, default: 'Initiate' },
    shippedtime: { type: String, default: 'Pending' },
    outofdeliverytime: { type: String, default: 'Pending' },
    deliverytime: { type: String, default: 'Pending' },
    oiddate: { type: String, default: new Date() }

}, { timestamps: true });

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
