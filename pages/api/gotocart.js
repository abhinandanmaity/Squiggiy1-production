

import Cart from "../../models/Cart";
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        let c = await Cart.findById({ _id: req.body._id })

        if (c) {

            c.savelater = false;

            await c.save();

            res.status(200).json({ success: "success" })
        } else {
            res.status(400).json({ error: "error" })
        }

    } else {

        res.status(400).json({ error: "error" })
    }
}