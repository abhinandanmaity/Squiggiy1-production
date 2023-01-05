// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)

        let product = await Product.find({ userid: req.body.userid, title: req.body.title })

        if (product) {

            res.status(200).json({ success: "success", product })

        } else {
            res.status(400).json({ error: "error" })
        }

    } else {

        res.status(400).json({ error: "error" })
    }


}

