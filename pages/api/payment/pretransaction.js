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

            // {
            //     Object.keys(req.body.cart).map(async (item) => {

            //         // console.log(`${req.body.cart[item].productid}`)
            //         let product = await Product.findOne({ slug: `${req.body.cart[item].productid}` })
            //         // console.log(product)

            //         let pavaliblearea = await Seller.findOne({ shopemail: product.userid })


            //         if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

            //             if (!product || product.avalibleQty <= 0 || product.avalibleQty < req.body.cart[item].qty) {

            //                 return res.status(400).json({ error: "Some products are out of stock, check your cart" })

            //             } else {
            //                 a = 0;


            //Initiae for payment
            var paytmParams = {};

            // console.log(req.body.oid)
            // console.log("jfkj")

            paytmParams.body = {
                "requestType": "Payment",
                "mid": req.body.paytm_mid,
                "websiteName": "YOUR_WEBSITE_NAME",
                "orderId": req.body.oid,
                "callbackUrl": `${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/payment/posttransaction`,
                "txnAmount": {
                    "value": req.body.to,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": req.body.email,
                },
            };

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), req.body.paytm_mkey)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            const requestAsync = async () => {

                return new Promise(() => {

                    var options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${req.body.paytm_mid}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            // response = JSON.parse(response).body
                            // console.log(response);

                            resolve(response)

                            response = JSON.parse(response).body
                            res.status(200).json({ response })

                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                })
            }

            // initiate order
            let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to })

            await order.save();

            await requestAsync();
            // console.log(myr)

            res.status(200).json({ success: "success" })



            //             }
            //         } else {
            //             res.status(400).json({ error: "Some products are not servisable in your area" })
            //             return
            //         }
            //     })
            // }

        } else if (req.body.cart.product) {

            // console.log("kldsklsd")
            // let product = await Product.findOne({ slug: `${req.body.cart.product.slug}` })

            // let pavaliblearea = await Seller.findOne({ shopemail: product.userid })
            // // console.log(pavaliblearea)

            // if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

            //     if (!product || product.avalibleQty <= 0) {

            //         return res.status(400).json({ error: "Some product is out of stock, check your cart" })

            //     } else {
            //         a = 0;


            //Initiae for payment
            var paytmParams = {};

            // console.log(req.body.oid)
            // console.log("jfkj")

            paytmParams.body = {
                "requestType": "Payment",
                "mid": req.body.paytm_mid,
                "websiteName": "squiggiy",
                "orderId": req.body.oid,
                "callbackUrl": `${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/payment/posttransaction`,
                "txnAmount": {
                    "value": req.body.to,
                    "currency": "INR",
                },
                "userInfo": {
                    "custId": req.body.email,
                },
            };

            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), req.body.paytm_mkey)

            paytmParams.head = {
                "signature": checksum
            };

            var post_data = JSON.stringify(paytmParams);

            const requestAsync = async () => {

                return new Promise(() => {

                    var options = {

                        /* for Staging */
                        // hostname: 'securegw-stage.paytm.in',

                        /* for Production */
                        hostname: 'securegw.paytm.in',

                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${req.body.paytm_mid}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };

                    var response = "";
                    var post_req = https.request(options, function (post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });

                        post_res.on('end', function () {
                            // response = JSON.parse(response).body
                            // console.log(response);

                            resolve(response)

                            response = JSON.parse(response).body
                            res.status(200).json({ response })

                        });
                    });

                    post_req.write(post_data);
                    post_req.end();
                })
            }

            // initiate order
            let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to })

            await order.save();

            await requestAsync();
            // console.log(myr)

            res.status(200).json({ success: "success" })

            //     }

            // } else {
            //     res.status(400).json({ error: "Some products are not servisable in your area" })
            //     return;
            // }

        }


    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
