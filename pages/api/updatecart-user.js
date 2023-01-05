// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Cart from "../../models/Cart"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)
        let cart = await Cart.findById({ _id: req.body._id })

        if (cart) {

            cart.qty = req.body.qty

            await cart.save()

            res.status(200).json({ success: "success" })
        } else {
            res.status(400).json({ error: "error" })
        }
    } else {

        res.status(400).json({ error: "error" })
    }


}

