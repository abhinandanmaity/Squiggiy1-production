

import Cart from "../../models/Cart";
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        //  console.log(req.body.userid)

        try {

            let cart = await Cart.find({ userid: req.body.userid, savelater: false })

            let carts = {}
            for (let item of cart) {
                if (item._id in carts) {
                    if (!carts[item._id]) {
                        carts[item._id]
                    }
                    if (!carts[item._id]) {
                        carts[item._id]
                    }
                } else {
                    carts[item._id] = JSON.parse(JSON.stringify(item))
                }
            }

            if (carts != undefined) {

                {
                    Object.keys(carts).map(async (item) => {

                        let n = await Cart.findByIdAndDelete({ _id: item })

                        // console.log(n)
                    })
                }
            }

            res.status(200).json({ success: "success" })

        } catch (err) {
            res.status(404).json(err)
        }


    } else {

        res.status(400).json({ error: "error" })
    }
}
