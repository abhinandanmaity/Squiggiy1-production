// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import Product from "../../models/Product";
import Cart from "../../models/Cart";
import { connectDb } from "../../middleware/mongoose";


export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        let user = await User.findOne({ email: req.body.userid })
        let p = await Product.findOne({ slug: req.body.productid })

        let c = await Cart.findOne({ productid: req.body.productid })


        if (user) {
            // console.log(c)

            if (!c || c == null || c == undefined) {

                // console.log("hoga")

                if ((req.body.userid === user.email && p.avalibleQty > 0)) {

                    let cart;
                    // console.log("loooo")
                    if (req.body.quantity) {

                        cart = new Cart({ userid: user.email, productid: req.body.productid, quantity: req.body.quantity, title: req.body.title, img: req.body.img, mesure: req.body.mesure, discount: req.body.discount, price: req.body.price })

                    } else {

                        cart = new Cart({ userid: user.email, productid: req.body.productid, title: req.body.title, img: req.body.img, mesure: req.body.mesure, discount: req.body.discount, price: req.body.price })
                    }

                    await cart.save();

                    res.status(200).json({ success: "success" })

                } else {
                    res.status(400).json({ error: "Invalid credentials" })
                }

            } else {
                res.status(400).json({ e: "Invalid credentials" })
            }

        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }


    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
