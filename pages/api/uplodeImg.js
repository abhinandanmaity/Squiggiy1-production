// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();
        
        let product = await Product.findOne({slug: req.body.productid})
        if(product){

            res.status(200).json({ product })
        }else{
            res.status(400).json({ error: "error" })

        }

    } else {

        res.status(400).json({ error: "error" })
    }


}



