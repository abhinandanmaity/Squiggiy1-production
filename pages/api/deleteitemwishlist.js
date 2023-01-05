
import { connectDb } from "../../middleware/mongoose"
import Wishlist from "../../models/Wishlist";

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

            let n = await Wishlist.findOneAndDelete({ productid: req.body.productid })

            res.status(200).json({ success: "success" })

    } else {

        res.status(400).json({ error: "error" })
    }
}