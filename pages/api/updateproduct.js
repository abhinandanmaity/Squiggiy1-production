// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)

        if (req.body.id) {

            let product = await Product.findOne({ userid: req.body.userid, title: req.body.title, _id: req.body.id })

            if (product) {

                product.decs = req.body.decs;
                product.img = req.body.img;
                product.price = req.body.price;
                product.discount = req.body.discount;

                // console.log(req.body.uavalibleQty)

                if (req.body.uavalibleQty) {

                    product.avalibleQty = req.body.uavalibleQty;
                } else {

                    product.avalibleQty = req.body.avalibleQty;
                }

                await product.save();

                res.status(200).json({ success: "success" })

            } else {
                res.status(400).json({ error: "error" })
            }
        } else {

            let product = await Product.findOne({ userid: req.body.userid, title: req.body.title })

            if (product) {

                product.decs = req.body.decs;
                product.img = req.body.img;
                product.price = req.body.price;
                product.discount = req.body.discount;

                // console.log(req.body.uavalibleQty)

                if (req.body.uavalibleQty) {

                    product.avalibleQty = req.body.uavalibleQty;
                } else {

                    product.avalibleQty = req.body.avalibleQty;
                }

                await product.save();

                res.status(200).json({ success: "success" })

            } else {
                res.status(400).json({ error: "error" })
            }
        }

    } else {

        res.status(400).json({ error: "error" })
    }


}
