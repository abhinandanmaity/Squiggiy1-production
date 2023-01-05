// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cart from "../../models/Cart"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)
        let cart = await Cart.find({ userid: req.body.userid })


        let carts = {}
        for (let item of cart) {
            if (item._id in carts) {
                if (!carts[item._id]) {
                    carts[item._id]
                }
                if (!carts[item._id]) {
                    carts[item._id]
                }
            } else {
                carts[item._id] = JSON.parse(JSON.stringify(item))
            }
        }

        res.status(200).json({ carts })
    } else {

        res.status(400).json({ error: "error" })
    }


}


