// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../models/Order"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.userid)

        let order = await Order.findOne({ userid: req.body.email, orderid: req.body.orderid })

        if (order) {

            res.status(200).json({ order })

        } else {

            res.status(400).json({ error: "error" })
        }

    } else {

        res.status(400).json({ error: "error" })
    }


}


