// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import Seller from "../../models/Seller"
import { connectDb } from "../../middleware/mongoose"

export default async function handler(req, res) {

    if (req.method == 'POST') {

        await connectDb();

        let pro = await Product.findOne({ title: req.body[0].title, userid: req.body[0].userid, quantity: req.body[0].quantity, mesure: req.body[0].mesure })

        // console.log(pro)
        // console.log(!pro)

        let s = await Seller.findOne({ userid: req.body.userid })

        if (s.address && s.pincode && s.phone && s.paytm_mid && s.paytm_mkey && s.state && s.city) {

            // console.log("hochboj")

            if (!pro || pro == null || pro == undefined) {
                // console.log(pro)
                let p;
                for (let i = 0; i < req.body.length; i++) {

                    p = new Product({

                        userid: req.body[i].userid,
                        title: req.body[i].title,
                        slug: req.body[i].slug,
                        decs: req.body[i].decs,
                        img: req.body[i].img,
                        quantity: req.body[i].quantity,
                        mesure: req.body[i].mesure,
                        price: req.body[i].price,
                        discount: req.body[i].discount,
                        category: req.body[i].category,
                        avalibleQty: req.body[i].avalibleQty,
                        exdate: req.body[i].exdate,

                    })
                    await p.save();
                }

                res.status(200).json({ success: "success" })

            } else {

                res.status(400).json({ e: "Invalid request type" })
            }

        } else {

            res.status(400).json({ se: "Invalid request typeo" })
        }

    } else {
        res.status(400).json({ error: "Invalid request typeoe" })
    }

}

// export default connectDb(handler);