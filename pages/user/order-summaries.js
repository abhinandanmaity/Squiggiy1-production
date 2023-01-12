import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import jsCookie from 'js-cookie';
import User from '../../models/User';
import { parseCookies } from 'nookies'
import mongoose from 'mongoose'
import Order from '../../models/Order';
import Link from 'next/link';
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");



const Ordersummeris = ({ order }) => {

    // jsCookie.set('o_id', 'undefined', { path: '/user' });

    // let a = CryptoJS.AES.decrypt(o_id.toString(), `${process.env.CRYPTO_SECRET_KEY}`)
    // let c = a.toString(CryptoJS.enc.Utf8)

    // let c = CryptoJS.AES.decrypt(o_id, `${process.env.CRYPTO_SECRET_KEY}`)

    // console.log(c.toString(CryptoJS.enc.Utf8))
    // console.log(c.toString(CryptoJS.enc.Utf8))
    // console.log(order.products)

    // jsCookie.remove('o_id', { path: '/user' })

    const [total, setTotal] = useState()
    const [stotal, setStotal] = useState()
    const [dtotal, setDtotal] = useState()

    let to = 0;
    let sto = 0;
    let dto = 0;


    useEffect(() => {

        {
            Object.keys(order.products).map((item) => {

                to += parseInt((order.products[item].price) - (((order.products[item].price) * order.products[item].discount) / 100));
                setTotal(to);
                sto += order.products[item].price;
                setStotal(sto);
                dto = stotal - total;
                setDtotal(dto);
            })
        }

    }, [total, stotal, dtotal])

    return (

        <div>

            <Head>
                <title>Squiggiy - Order Summaries</title>
                <meta name="description" content="Squiggiy" />
                <link rel="icon" href="/favicon.png" />
            </Head>


            <div className="min-h-screen py-5">


                <div className="2xl:container 2xl:mx-auto py-11 px-4 md:px-6 xl:px-20">
                    <div className="flex flex-col xl:flex-row justify-center items-center space-y-10 xl:space-y-0 xl:space-x-8">
                        {/* <div className="w-full lg:w-9/12 xl:w-full">
                            <img className="w-full hidden xl:block" src="/deliveryimg1.jpg" alt="wardrobe " />
                        </div> */}
                        <div className="flex justify-center flex-col items-start w-full lg:w-9/12 xl:w-full">
                            <h3 className="text-lg md:text-xl xl:text-2xl  font-semibold leading-7 xl:leading-9 w-full md:text-left text-gray-800">Order Summary</h3>
                            <p className="text-sm sm:text-base leading-none mt-4 text-gray-800">Order ID : <span className="font-bold">{order.orderid}</span></p>

                            <h2 className="text-sm py-2">Your order has been successfully placed. Check your order details.</h2>

                            {Object.keys(order.products).map((item) => {
                                // console.log(cart[item].title)
                                // console.log(order.products[item].slug)
                                return (


                                    <div key={order.products[item].productid} className="flex justify-center items-center w-full mt-8 flex-col space-y-2 cursor-pointer">


                                        <Link href={`/product/${order.products[item].productid ? order.products[item].productid : order.products[item].slug}`}>
                                            <div className="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
                                                <div className="-m-px w-40 md:w-32">

                                                    <img className="w-28 h-20" src={order.products[item].img} alt="squiggiy" />

                                                </div>
                                                <div className="flex justify-between items-center flex-row w-full p-4 md:px-8">
                                                    <div className="flex flex-col  justify-start items-start">

                                                        {order.products[item].quantity > 0 && <h3 className="text-sm sm:text-base w-full font-semibold leading-6 md:leading-5 text-gray-800"> {order.products[item].title} ({order.products[item].quantity} {order.products[item].mesure})</h3>}

                                                        {order.products[item].quantity == 0 && <h3 className="text-sm sm:text-base w-full font-semibold leading-6 md:leading-5 text-gray-800">{order.products[item].title}</h3>}

                                                        <div className="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                                                            <p className="text-xs sm:text-sm leading-none text-gray-600">Quantity: <span className="text-gray-800 ">{!order.products[item].qty ? '1' : order.products[item].qty}</span></p>
                                                        </div>
                                                    </div>
                                                    <div className="flex mt-4 md:mt-0 justify-end items-center w-full">
                                                        <p className="text-sm font-semibold leading-5 lg:leading-6 text-gray-800">₹ {order.products[item].qty ? ((parseInt((order.products[item].price) - (((order.products[item].price) * order.products[item].discount) / 100))) * order.products[item].qty) : ((parseInt((order.products[item].price) - (((order.products[item].price) * order.products[item].discount) / 100))))}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        </Link>

                                    </div>
                                )
                            })
                            }


                            <div className="flex flex-col justify-start items-start mt-8 xl:mt-10 space-y-10 w-full">
                                <div className="flex justify-between items-start flex-col md:flex-row w-full md:w-auto space-y-8 md:space-y-0 md:space-x-14 xl:space-x-8 lg:w-full">
                                    <div className="flex jusitfy-start items-start flex-col space-y-2">
                                        <p className="text-sm  font-semibold leading-4 text-gray-800">Billing Status</p>
                                        <p className="text-xs leading-5 text-gray-600">{order.paymentstatus == 'Case on delivery' ? 'Pending' : 'Paid'}</p>
                                    </div>
                                    <div className="flex jusitfy-start items-start flex-col space-y-2">
                                        <p className="text-sm  font-semibold leading-4 text-gray-800">Shipping Address</p>
                                        <p className="text-xs leading-5 text-gray-600">{order.shippingaddress.address}, {order.shippingaddress.city}, {order.shippingaddress.state}-{order.shippingaddress.pincode}</p>
                                    </div>
                                    <div className="flex jusitfy-start items-start flex-col space-y-2">
                                        <p className="text-sm  font-semibold leading-4 text-gray-800">Payment Method</p>
                                        <p className="text-xs leading-5 text-gray-600">{order.paymentstatus == 'Case on delivery' ? 'Case on delivery' : 'Online Payment'}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full space-y-4">
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                        <div className="flex justify-between w-full">
                                            <p className="text-sm  leading-4 text-gray-800">Subtotal</p>
                                            <p className="text-sm leading-4 text-gray-600">₹ {stotal}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-sm leading-4  text-gray-800">
                                                Discount
                                            </p>
                                            <p className="text-sm leading-4 text-gray-600">-₹ {dtotal}</p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-sm  leading-4 text-gray-800">Shipping Charge</p>
                                            <p className="text-sm leading-4 text-gray-600">Free </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-sm  font-semibold leading-4 text-gray-800">Total</p>
                                        <p className="text-sm font-semibold leading-4 text-gray-600">₹ {order.amount}</p>
                                    </div>
                                    <div className="flex w-full justify-center items-center pt-1 md:pt-4 xl:pt-8 space-y-6 md:space-y-8 flex-col">

                                        <Link href={`/user/track-order/?id=${order._id}`}>
                                            <button className="py-2 rounded-lg hover:bg-pink-600 w-full text-sm sm:text-base font-medium leading-4 text-white bg-pink-700 ">Track Your Order</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}



export async function getServerSideProps(context) {

    global.mongoose = {
        conn: null,
        promise: null
    }

    if (!global.mongoose && !global.mongoose.conn) {

        console.log("This is a Existing connection")
        // return global.mongoose.conn;
    } else {

        console.log("This is a new connection")
        const user = process.env.MONGODB_USER;
        const password = process.env.MONGODB_PASSWORD;
        const database = process.env.MONGO_DATABASE;

        const connectionString = `mongodb+srv://${user}:${password}@cluster0.j5s3z.mongodb.net/${database}?retryWrites=true&w=majority`

        const promise = mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        }).then(mongoose => mongoose);


        global.mongoose = {
            conn: await promise,
            promise
        }
    }

    const cookies = parseCookies(context);

    const token = cookies.token != "undefined" ? cookies.token : "";

    let t;
    // console.log(o_id)
    // console.log(CryptoJS.AES.decrypt(o_id, process.env.CRYPTO_SECRET_KEY).toString(CryptoJS.enc.Utf8))

    try {
        t = jwt.verify(token, process.env.JWT_SECRET_KEY)

    } catch (err) {

        jsCookie.remove('token', { expires: 1 });

        return {

            redirect: {
                permanent: false,
                destination: "/user/login",
            },

            props: {}

        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let user = await User.findOne({ roll: t.roll, email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })
    // console.log(context.query.id)

    let id = context.query.id


    let ord = await Order.find({ userid: t.email })

    let order = ""
    if (id) {
        try {

            order = await Order.findById({ _id: id })
        } catch (err) {

            let a = 11111111111121;
            let b = 999999999999984;

            return {

                redirect: {
                    permanent: false,
                    destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`
                },

                props: {}

            }
        }

    } else {

        let a = 11111111111121;
        let b = 999999999999984;

        return {

            redirect: {
                permanent: false,
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`
            },

            props: {}

        }
    }

    // console.log(order)

    if (!order || order == undefined || order == null) {

        let a = 11111111111121;
        let b = 999999999999984;

        return {

            redirect: {

                permanent: false,
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random() * Date.now())}`
            },

            props: {}

        }

    }


    for (let item of ord) {

        // console.log(item.products)

        if (item.products && item.products.product) {

            // let p = await Product.findOne({ slug: item.products.product.slug })

            if (item.userid == user.email && item.paymentstatus != "Initiate") {

            }

            if (item.paymentstatus == "Initiate") {

                let o = await Order.findByIdAndDelete({ _id: item._id })
            }

        } else if (item.products && item.paymentstatus != "Initiate") {

        }
        else {

            if (item.paymentstatus == "Initiate") {

                let o = await Order.findByIdAndDelete({ _id: item._id })
            }
        }
    }


    if (order) {


        // console.log(order)
        if (!user) {

            jsCookie.remove('token');
            return {

                redirect: {
                    permanent: false,
                    destination: "/user/login",
                },

                props: {}
            }
        }

        return {
            props: { order: JSON.parse(JSON.stringify(order)) }
        }
    }

}



export default Ordersummeris