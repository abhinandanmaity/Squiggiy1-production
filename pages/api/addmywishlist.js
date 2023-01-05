// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Wishlist from "../../models/Wishlist";
import { connectDb } from "../../middleware/mongoose";


export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        let wish = await Wishlist.findOne({ productid: req.body.productid })

        // console.log(wish)

        if (!wish || wish == null || wish == undefined) {

            let w = new Wishlist({ userid: req.body.email, productid: req.body.productid })

            await w.save();

            res.status(200).json({ success: "success" })

        } else {

            res.status(400).json({ error: "Invalid credentials" })
        }

    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
