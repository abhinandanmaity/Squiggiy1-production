
import Order from "../../models/Order";
import Product from "../../models/Product";
import { connectDb } from "../../middleware/mongoose"
import Seller from "../../models/Seller";


export default async function handler(req, res) {


    if (req.method == 'POST') {


        await connectDb();
        let add = 1
        // console.log(req.body.cart.product)

        if (!req.body.cart.product || req.body.cart.product == undefined) {

            {
                Object.keys(req.body.cart).map(async (item) => {

                    // console.log(`${req.body.cart[item].productid}`)
                    let product = await Product.findOne({ slug: `${req.body.cart[item].productid}` })
                    // console.log(product)
                    // console.log(product)
                    let pavaliblearea = await Seller.findOne({ shopemail: product.userid })

                    if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

                        if (!product || product.avalibleQty <= 0 || product.avalibleQty < req.body.cart[item].qty) {

                            res.status(400).json({ error: "Some products are out of stock, check your cart" })
                            return;
                        }
                        else {
                            add = 0;


                            let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to, paymentstatus: req.body.paymentstatus })

                            await order.save();


                            // console.log(req.body.cart)

                            // let q = await Product.findOne({ productid: req.body.cart['6291be0747325039567346e1'].productid })

                            // console.log(q)

                            if (!req.body.cart.product || req.body.cart.product == undefined) {

                                {
                                    Object.keys(req.body.cart).map(async (item) => {

                                        // console.log(`${req.body.cart[item].productid}`)
                                        let product = await Product.findOne({ slug: `${req.body.cart[item].productid}` })
                                        // console.log(product.avalibleQty)

                                        product.avalibleQty = product.avalibleQty - req.body.cart[item].qty

                                        await product.save()
                                    })
                                }
                            } else if (req.body.cart.product) {

                                let product = await Product.findOne({ slug: `${req.body.cart.product.slug}` })

                                // console.log(product.avalibleQty)

                                product.avalibleQty = product.avalibleQty - 1

                                await product.save()

                            }

                            let o = await Order.findOne({ orderid: req.body.oid })
                            res.status(200).json({ success: "success", id: o._id })
                        }
                    } else {

                        res.status(400).json({ error: "Some products are not servisable in your area" })
                        return;
                    }

                })
            }

        } else if (req.body.cart.product) {

            let product = await Product.findOne({ slug: `${req.body.cart.product.slug}` })
            // console.log(product)

            let pavaliblearea = await Seller.findOne({ shopemail: product.userid })

            if (pavaliblearea && pavaliblearea.pincode == req.body.pincode && pavaliblearea.state == req.body.state && pavaliblearea.city == req.body.city) {

                if (!product || product.avalibleQty <= 0) {

                    res.status(400).json({ error: "Some products are out of stock, check your cart" })
                    return;
                } else {
                    add = 0


                    let order = new Order({ userid: req.body.email, userphone: req.body.userphone, orderid: req.body.oid, products: req.body.cart, shippingaddress: { address: req.body.address, pincode: req.body.pincode, state: req.body.state, city: req.body.city }, amount: req.body.to, paymentstatus: req.body.paymentstatus })

                    await order.save();


                    // console.log(req.body.cart)

                    // let q = await Product.findOne({ productid: req.body.cart['6291be0747325039567346e1'].productid })

                    // console.log(q)

                    if (!req.body.cart.product || req.body.cart.product == undefined) {

                        {
                            Object.keys(req.body.cart).map(async (item) => {

                                // console.log(`${req.body.cart[item].productid}`)
                                let product = await Product.findOne({ slug: `${req.body.cart[item].productid}` })
                                // console.log(product.avalibleQty)

                                product.avalibleQty = product.avalibleQty - req.body.cart[item].qty

                                await product.save()
                            })
                        }
                    } else if (req.body.cart.product) {

                        let product = await Product.findOne({ slug: `${req.body.cart.product.slug}` })

                        // console.log(product.avalibleQty)

                        product.avalibleQty = product.avalibleQty - 1

                        await product.save()

                    }

                    let o = await Order.findOne({ orderid: req.body.oid })
                    res.status(200).json({ success: "success", id: o._id })
                }

            } else {

                res.status(400).json({ error: "Some products are not servisable in your area" })
                return;
            }
        }

        console.log(add)
        console.log(add === 0)

        if (add == 0) {

            console.log("checkout")
        }

    } else {
        res.status(400).json({ error: "Invalid request" })
    }
}
