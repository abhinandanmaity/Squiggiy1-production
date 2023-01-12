
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
                        }else{

                            res.status(200).json({ success: "success" })
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
                }else{

                    res.status(200).json({ success: "success" })
                }

            } else {

                res.status(400).json({ error: "Some products are not servisable in your area" })
                return;
            }
        }

        // console.log(add)
        // console.log(add === 0)

    } else {
        res.status(400).json({ error: "Invalid request" })
    }
}
