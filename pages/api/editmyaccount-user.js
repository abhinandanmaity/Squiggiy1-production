
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {



    if (req.method == 'POST') {

        await connectDb();

        for (let i = 0; i < req.body.length; i++) {
            let p = await User.findByIdAndUpdate(req.body[i]._id, req.body[i])
        }

        res.status(200).json({ success: "success" })

    } else {
        res.status(400).json({ error: "Invalid request type" })
    }

}