// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import { connectDb } from "../../middleware/mongoose"
import Seller from "../../models/Seller";
var jwt = require('jsonwebtoken');

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // console.log(req.body.token)

        let t;

        // try {
        //     t = jwt.verify(req.body.token, process.env.JWT_SECRET_KEY)


        // } catch (err) {
        //     return res.status(402).json({ error: "error" })
        // }

        // console.log(t)

        // console.log(t.email);


        let user = await Seller.findOne({ resetToken: req.body.token, expireToken: { $gt: Date.now() } })

        // console.log(user)
        if (user) {

            res.status(200).json({ success: "true"})
        } else {
            res.status(400).json({ success: "error" })
        }

    } else {

        res.status(400).json({ error: "error" })
    }


}



