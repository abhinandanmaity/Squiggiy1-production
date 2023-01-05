
import Cart from "../../models/Cart";
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        let cart = await Cart.findOne({ productid: req.body.productid })

        // console.log(cart)
        try {

            let n = await Cart.findByIdAndDelete({ _id: cart._id })

            res.status(200).json({ success: "success" })

        } catch (err) {
            res.status(404).json(err)
        }


    } else {

        res.status(400).json({ error: "error" })
    }
}