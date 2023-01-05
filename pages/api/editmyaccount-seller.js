
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Seller from "../../models/Seller";
import { connectDb } from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");


export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        // cloudinary.uploader.upload(
        //     "Abhinandan Maity.jpg"
        //     , {

        //         // upload_preset: "my_preset",
        //         use_filename: true,
        //         unique_filename: false,
        //         folder: "Sellers"

        //     }, (error, result) => {
        //         console.log(result, error);
        //     });

        req.body[0].paytm_mkey = CryptoJS.AES.encrypt(req.body[0].paytm_mkey, process.env.CRYPTO_SECRET_KEY).toString()
        req.body[0].paytm_mid = CryptoJS.AES.encrypt(req.body[0].paytm_mid, process.env.CRYPTO_SECRET_KEY).toString()
        // console.log(req.body[0].paytm_mkey);
        // console.log(req.body[0].paytm_mid);

        for (let i = 0; i < req.body.length; i++) {
            let p = await Seller.findByIdAndUpdate(req.body[i]._id, req.body[i])
        }

        res.status(200).json({ success: "success" })

    } else {
        res.status(400).json({ error: "Invalid request type" })
    }

}