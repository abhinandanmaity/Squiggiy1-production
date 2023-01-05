// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Seller from "../../models/Seller";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');
import jsCookie from 'js-cookie'



export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        jsCookie.remove('token')

        res.redirect(`/`, 200)

    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}
