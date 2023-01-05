// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Seller from "../../models/Seller";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        let user = await Seller.findOne({ shopemail: req.body.shopemail })

        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY);

        if (user) {

            if ((req.body.shopemail === user.shopemail) && (req.body.password === bytes.toString(CryptoJS.enc.Utf8))) {

                let token = jwt.sign({ roll: user.roll, img: user.img, email: user.shopemail }, process.env.JWT_SECRET_KEY, { expiresIn: '25d' });

                user.resetToken = token
                user.expireToken = Date.now() + 2160000000

                await user.save();
                
                res.status(200).json({ token: token})
                // console.log(token)
            } else {
                res.status(400).json({ error: "Invalid credentials" })
            }

        } else {
            res.status(400).json({ error: "Invalid credentials" })
        }
    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
