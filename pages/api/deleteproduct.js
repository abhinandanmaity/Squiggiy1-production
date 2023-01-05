// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)

        let p = await Product.findByIdAndDelete({ _id: req.body.id })

        res.status(200).json({ success: "success" })

    } else {

        res.status(400).json({ error: "error" })
    }


}
