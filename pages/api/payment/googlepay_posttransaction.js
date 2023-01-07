
import Order from '../../../models/Order';
import Cart from '../../../models/Cart';
import { connectDb } from '../../../middleware/mongoose';
import Product from '../../../models/Product';



export default async function handler(req, res) {


    if (req.method == 'POST') {
        await connectDb();

        // console.log(req)
        // console.log(req.body)
        // console.log(req.body.paymentinfo)
        // console.log(req.body.oid)

        let order;
        order = await Order.findOne({ orderid: req.body.oid })

        if (order) {

            // console.log(order)
            // console.log(order._id)
            order.paymentstatus = 'Paid'

            order.paymentinfo = req.body.paymentinfo

            await order.save();

            if (order.products.product) {

                let product = await Product.findOne({ slug: order.products.product.slug })
                // console.log(product.avalibleQty)

                product.avalibleQty = product.avalibleQty - 1

                await product.save()
            } else {

                {
                    Object.keys(order.products).map(async (item) => {

                        // console.log(`${req.body.cart[item].productid}`)
                        let product = await Product.findOne({ slug: `${order.products[item].productid}` })
                        // console.log(product.avalibleQty)

                        product.avalibleQty = product.avalibleQty - order.products[item].qty

                        await product.save()
                    })
                }

            }

            //clear cart
            if (!order.products.product) {

                let cart = await Cart.find({ userid: order.userid })


                {
                    Object.keys(cart).map(async (item) => {

                        // console.log(`${req.body.cart[item].productid}`)
                        await Cart.findByIdAndDelete({ _id: cart[item]._id })
                        // console.log(product.avalibleQty)
                        // console.log(cart[item]._id)
                    })
                }
            }

            res.status(200).json({ success: "success", order })
            // console.log(Object.keys(order._id))
            // res.redirect(`/user/order-summaries/?id=${order._id}`, 200);

        }else{

            res.status(400).json({ error: "Invalid credentials" })
        }
        // res.redirect(`/user/checkout`, 400)
    }else{

        res.status(400).json({ error: "Invalid credentials" })
    }

}