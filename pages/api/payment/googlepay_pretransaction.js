import { resolve } from 'path';
import Product from '../../../models/Product';
import Order from '../../../models/Order';
import { connectDb } from '../../../middleware/mongoose';
import Seller from '../../../models/Seller';

const https = require('https');
const PaytmChecksum = require('paytmchecksum')


export default async function handler(req, res) {

    /*
    * import checksum generation utility
    * You can get this utility from https://developer.paytm.com/docs/checksum/
    */


    if (req.method == 'POST') {


        // console.log(req.body.paytm_mkey)
        // console.log(req.body.paytm_mid)
        let a = 1;
        //Connect with mongodb
        await connectDb();
        // console.log(req.body.cart)


        //Check if the products avalibleQty are avalible or not
        if (!req.body.cart.product || req.body.cart.product == undefined) {

            {
                Object.keys(req.body.cart).map(async (item) => {

                    // console.log(`${req.body.cart[item].productid}`)
                    let product = await Product.findOne({ slug: `${req.body.cart[item].productid}` })
                    // console.log(product)

                    let pavaliblearea = await Seller.findOne({ shopemail: product.userid })


                    if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

                        if (!product || product.avalibleQty <= 0 || product.avalibleQty < req.body.cart[item].qty) {

                            return res.status(400).json({ error: "Some products are out of stock, check your cart" })

                        } else {
                            a = 0;


                            // initiate order
                            let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to })

                            await order.save();

                            res.status(200).json({ success: "success" })

                        }
                    } else {
                        res.status(400).json({ error: "Some products are not servisable in your area" })
                        return
                    }
                })
            }

        } else if (req.body.cart.product) {

            // console.log("kldsklsd")
            let product = await Product.findOne({ slug: `${req.body.cart.product.slug}` })

            let pavaliblearea = await Seller.findOne({ shopemail: product.userid })
            // console.log(pavaliblearea)

            if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

                if (!product || product.avalibleQty <= 0) {

                    return res.status(400).json({ error: "Some product is out of stock, check your cart" })

                } else {
                    a = 0;



                    // initiate order
                    let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to })


                    await order.save();

                    res.status(200).json({ success: "success" })

                }

            } else {
                res.status(400).json({ error: "Some products are not servisable in your area" })
                return;
            }

        }


    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
