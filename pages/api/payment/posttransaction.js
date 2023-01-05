
import Order from '../../../models/Order';
import Cart from '../../../models/Cart';
import { connectDb } from '../../../middleware/mongoose';
import Product from '../../../models/Product';



export default async function handler(req, res) {

    await connectDb();

    // console.log(req.body.ORDERID)
    let order;

    //Initiate order
    if (req.body.STATUS == 'TXN_SUCCESS') {

        order = await Order.findOne({ orderid: req.body.ORDERID })

        order.paymentstatus = 'Paid'

        if (order.paymentinfo) {

            order.paymentinfo = req.body
        }

        await order.save();

        // console.log(order.products)

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

        res.redirect(`/user/order-summaries/?id=${order._id}`, 200)


    } else if (req.body.STATUS == 'PENDING') {

        order = await Order.findOne({ orderid: req.body.ORDERID })

        await Order.findByIdAndDelete({ _id: order._id })

    } else if (req.body.STATUS == 'TXN_FAILURE') {

        order = await Order.findOne({ orderid: req.body.ORDERID })

        await Order.findByIdAndDelete({ _id: order._id })

    }

    // res.status(200).json({ body: req.body })
    res.redirect(`/user/checkout`, 400)
}
