import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Order from '../../models/Order'
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import User from '../../models/User'
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import Seller from '../../models/Seller'
import { GrView } from 'react-icons/gr';
import BaseCard from '../../src/components/baseCard/BaseCard';
import { Grid, Stack, Pagination } from "@mui/material";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import Product from '../../models/Product'


const Myorders = ({ orders, user }) => {


    // console.log(orders)

    let id = 1;
    const result = {};
    const [page, setPage] = useState(1);
    // console.log(orders)

    let i = (page * 5) - 1;
    let j = (page * 5) - 5;
    for (const item in orders) {

        if (i == j - 1) {
            break
        }

        if (Object.keys(orders).length > i) {

            result[item] = orders[i]
        }
        i--;

    }
    // Object.keys(result).reverse()

    // console.log(result)

    React.useEffect(() => {

        let i = (page * 5) - 1;
        let j = (page * 5) - 5;
        result = [];
        for (const item in orders) {

            if (i == j - 1) {
                break
            }

            if (Object.keys(orders).length > i) {

                result[item] = orders[i]
            }
            i--;
        }

        //     console.log(i)
        //     // result.reverse()

    }, [page]);


    return (

        <div>

            <Head>
                <title>Squiggiy - My Orders</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className="min-h-screen py-2">

                <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                    <div className="flex justify-center items-center p-8">
                        <h1 className="text-lg text-pink-500 font-bold">My Orders</h1>
                    </div>





                    <BaseCard title="" className="">
                        <Table
                            aria-label="simple table"
                            sx={{
                                mt: 1,
                                whiteSpace: "nowrap",
                            }}
                        >

                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h7">
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h7">
                                            Order ID
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h7">
                                            Address
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography color="textSecondary" variant="h7">
                                            Payment
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h7">
                                            Status
                                        </Typography>
                                    </TableCell>

                                    <TableCell align="right">
                                        <Typography color="textSecondary" variant="h7">
                                            Price
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.keys(result).map((item) => {

                                    return (
                                        <TableRow key={result[item]._id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {id++}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: "180",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {result[item].orderid}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6"
                                                    sx={{
                                                        fontWeight: "180",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    {result[item].shippingaddress.address.slice(0, 16)}{result[item].shippingaddress.address.length > 16 ? "..." : ""}, {result[item].shippingaddress.pincode}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>

                                                {result[item].paymentstatus === "Case on delivery" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "secondary.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].paymentstatus}
                                                ></Chip> : ""}

                                                {result[item].paymentstatus === "Paid" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "success.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].paymentstatus}
                                                ></Chip> : ""}

                                            </TableCell>
                                            <TableCell>

                                                {result[item].deliverystatus === "Cancle" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "error.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].deliverystatus}
                                                ></Chip> : ""}

                                                {result[item].deliverystatus === "Delivered" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "success.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].deliverystatus}
                                                ></Chip> : ""}

                                                {result[item].deliverystatus === "OutOfDelivery" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "secondary.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].deliverystatus}
                                                ></Chip> : ""}
                                                {result[item].deliverystatus === "Initiate" ? <Chip
                                                    sx={{
                                                        pl: "3px",
                                                        pr: "3px",
                                                        backgroundColor: "primary.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label={result[item].deliverystatus}
                                                ></Chip> : ""}
                                            </TableCell>

                                            <TableCell align="right">

                                                <Typography variant="h6"

                                                    sx={{
                                                        fontWeight: "200",
                                                        fontSize: "14px",
                                                    }}

                                                >₹ {result[item].amount}</Typography>
                                            </TableCell>
                                            <TableCell align="right">

                                                {result[item].deliverystatus != "Cancle" || result[item].deliverystatus != "Delivered" ? <div >

                                                    <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/user/order-summaries/?id=${result[item]._id}`}>
                                                        <GrView className="cursor-pointer" />
                                                    </Link>
                                                </div> : <div></div>}

                                            </TableCell>
                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </BaseCard>


                    {Object.keys(orders).length > 5 ?

                        <div className="pt-0.5 pb-12 flex justify-end ">

                            <Grid container spacing={0}>
                                <Grid item xs={12} lg={12}>
                                    <BaseCard >
                                        <Stack spacing={2}>
                                            <Pagination count={Math.ceil(Object.keys(orders).length / 5)} color="primary" defaultPage={1} onChange={(event, value) => { setPage(value) }} />
                                        </Stack>
                                    </BaseCard>
                                </Grid>
                            </Grid>
                        </div>

                        :

                        <div className=""></div>}

                    {Object.keys(orders).length > 0 ?

                        <div className=""></div>
                        :

                        <div className="text-center">Still now you have not any ordered.</div>
                    }


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
    // console.log(token)

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
    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let order = await Order.find({ userid: t.email })

    // console.log(order)

    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })


    // let initiorder = await Order.find({ paymentstatus: 'Initiate' })

    // console.log(order)
    // console.log(initiorder)
    order = order.reverse()


    if (!user) {

        jsCookie.remove('token', { expires: 1 });
        return {

            redirect: {
                permanent: false,
                destination: "/user/login",
            },

            props: {}

        }
    } else if (!user && seller) {

        let a = 11111111111121;
        let b = 999999999999984;

        return {

            redirect: {
                permanent: false,
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`,
            },

            props: {}

        }
    } else if (!user && !seller) {

        let a = 11111111111121;
        let b = 999999999999984;

        return {

            redirect: {
                permanent: false,
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`,
            },

            props: {}

        }
    }

    // let orders = {}

    // for (let item of order) {

    //     if (item.orderid in order) {

    //         if (!orders[item.orderid] && item.paymentstatus != "Initiate") {
    //             orders[item.orderid]
    //         }
    //     } else {

    //         if (item.paymentstatus == "Initiate") {

    //             let o = await Order.findByIdAndDelete({ _id: item._id })
    //         } else {

    //             orders[item.orderid] = JSON.parse(JSON.stringify(item))
    //         }
    //     }
    // }


    let orders = {}
    let j = 0;

    for (let item of order) {

        // console.log(item.products)

        if (item.products && item.products.product) {

            // let p = await Product.findOne({ slug: item.products.product.slug })

            if (item.userid == user.email && item.paymentstatus != "Initiate") {

                // if (item.orderid in order) {
                //     if (!orders[item.orderid]) {
                //         orders[item.orderid]
                //     }
                // } else {
                // console.log(item.orderid)
                orders[j] = JSON.parse(JSON.stringify(item))
                j++
                // }
            }

            if (item.paymentstatus == "Initiate") {

                let o = await Order.findByIdAndDelete({ _id: item._id })
            }

        } else if (item.products && item.paymentstatus != "Initiate") {

            let pppp;

            // console.log(item.products)
            for (let ii in item.products) {

                // console.log(item.products[ii].productid)

                let product = await Product.findOne({ slug: `${item.products[ii].productid}` })
                // console.log(product.avalibleQty)
                // let oid = item.orderid;

                if (product) {
                    pppp = product;
                }

            }

            // console.log(pppp)
            if (pppp) {

                // console.log(order)
                // console.log(orders)
                // console.log(orders[item.orderid])

                // if (item.orderid in order) {
                //     if (!orders[item.orderid]) {
                //         orders[item.orderid]
                //     }
                // } else {

                orders[j] = JSON.parse(JSON.stringify(item))
                j++
                // }
            }
        }
        else {

            if (item.paymentstatus == "Initiate") {

                let o = await Order.findByIdAndDelete({ _id: item._id })
            }
        }
    }

    // console.log(orders)

    return {
        props: { orders: JSON.parse(JSON.stringify(orders)), user: JSON.parse(JSON.stringify(user)) }
    }
}


export default Myorders


