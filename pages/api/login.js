// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

// JWT_SECRET_KEY=SDDFF%*&^%#GFGjwts763267ecretHJJK%^^&**(%^5475jhdh
//     CRYPTO_SECRET_KEY=secretkey123kjsdkj%$&^%#@54545JHJHOIUN438hdfjhhJ&*&#297$&@)(*#$(#HJHIDSJFHi54545454^

export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        // console.log("hjhjhj");
        let user = await User.findOne({ email: req.body.email })

        let bytes = CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_SECRET_KEY);


        if (user) {


            if ((req.body.email === user.email) && (req.body.password === bytes.toString(CryptoJS.enc.Utf8))) {

                let token = jwt.sign({ roll: user.roll, img: user.img, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '25d' });

                user.resetToken = token
                user.expireToken = Date.now() + 2160000000

                await user.save();

                res.status(200).json({ token: token })
                // const t = jwt.verify(token, 'SDDFF%*&^%#GFGjwts763267ecretHJJK%^^&**(%^5475jhdh')
                // // console.log(t)
                // console.log(t.email);

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

