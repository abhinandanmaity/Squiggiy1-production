// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Seller from "../../models/Seller";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        const { shopname, shopemail, phone, delivery, categories } = req.body;

        let user = new Seller({ shopname, shopemail, phone, delivery, categories, password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString() });


        let token = jwt.sign({ roll: user.roll, img: user.img, email: user.shopemail }, process.env.JWT_SECRET_KEY, { expiresIn: '25d' });

        user.resetToken = token
        user.expireToken = Date.now() + 2160000000

        await user.save();

        res.status(200).json({ token: token, user: { shopemail } })

    } else {
        res.status(400).json({ error: "Invalid request type" })
    }
}
