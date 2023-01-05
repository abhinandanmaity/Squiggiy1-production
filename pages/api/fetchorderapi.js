// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Order from "../../models/Order"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        let order = await Order.find({ userid: 'abhinandanmaity1122@gmail.com' })

        order = order.reverse()

        let orders = {}

        for (let item of order) {
            if (item.orderid in order) {
                if (!orders[item.orderid]) {
                    orders[item.orderid]
                }
            } else {
                orders[item.orderid] = JSON.parse(JSON.stringify(item))
            }
        }

        let i = 0;
        let h = {}

        for (const item in orders) {

            // console.log(order[item])

            // console.log(item)
            // console.log(Object.keys(h).includes(item.toString()))

            if (!Object.keys(orders).includes(item.toString())) {

                // console.log("kjdfkjkfdj")
                // console.log(i)

                if (i < totalResult && i <= 5) {
                    // console.log("concat")
                    h[item] = orders[item]
                    i = i + 1;
                } else {
                    return;
                }
                // console.log(h)
                // console.log(i)
            }

        }


        res.status(200).json({ h })

    } else {

        res.status(400).json({ error: "error" })
    }


}
