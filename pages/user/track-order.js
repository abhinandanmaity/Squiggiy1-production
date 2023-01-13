
import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import {
    Grid,
    Stack,
    Pagination,
    ImageList,
    ImageListItem,
    TextField,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import BaseCard from '../../src/components/baseCard/BaseCard';
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';
import Order from '../../models/Order';
import jsCookie from 'js-cookie'
import Seller from '../../models/Seller';
import User from '../../models/User';
import ordersummeris from './order-summaries';
import { fontFamily } from '@mui/system';


const trackOrder = ({ order }) => {

    let id = 1;

    // console.log(order)

    return (

        <div>
            <Head>
                <title>Squiggiy - Track Order</title>
                <meta name="description" content="Track your order" />
                <link rel="icon" href="/favicon.png" />
            </Head>


            <div className=' lg:flex lg:justify-evenly'>
                <Grid item xs={12} lg={4}>

                    <BaseCard title="">
                        <span className='text-xl text-pink-500 font-bold'>Order Status</span>
                        <Timeline
                            sx={{
                                p: 5,
                            }}
                        >

                            <TimelineItem key="9:01">
                                <TimelineOppositeContent
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        // flex: "1",
                                    }}
                                >
                                    {order.createdAt.slice(0, 10)} {order.createdAt.slice(11, 16)}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        sx={{
                                            borderColor: "warning.main",
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "15px",
                                    }}
                                >
                                    Order Confirmed
                                </TimelineContent>
                            </TimelineItem>

                            <TimelineItem key="9:01">
                                <TimelineOppositeContent
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        // flex: "1",
                                    }}
                                >

                                    {order.shippedtime}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        sx={{
                                            borderColor: "secondary.main",
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "15px",
                                    }}
                                >
                                    Shipped
                                </TimelineContent>
                            </TimelineItem>

                            <TimelineItem key="9:01">
                                <TimelineOppositeContent
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        // flex: "1",
                                    }}
                                >
                                    {order.outofdeliverytime}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        sx={{
                                            borderColor: "primary.main",
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "15px",
                                    }}
                                >
                                    Out For Delivery
                                </TimelineContent>
                            </TimelineItem>

                            <TimelineItem key="9:01">
                                <TimelineOppositeContent
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: "700",
                                        // flex: "1",
                                    }}
                                >
                                    {order.deliverytime}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot
                                        variant="outlined"
                                        sx={{
                                            borderColor: "success.main",
                                        }}
                                        className="cursor-pointer"
                                    />
                                </TimelineSeparator>
                                <TimelineContent
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "15px",
                                    }}
                                >
                                    Delivered
                                </TimelineContent>
                            </TimelineItem>

                        </Timeline>
                    </BaseCard>

                </Grid>

                <Grid item xs={12} lg={8}>


                    <div className=" invisible xsm:visible h-0 xsm:h-auto ">
                        <BaseCard title="" >

                            <span className='text-xl text-pink-500 font-bold'>Product</span>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 4,
                                    // whiteSpace: "nowrap",
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
                                                Product Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h7">
                                                Image
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h7">
                                                Qty
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
                                    {Object.keys(order.products).map((item) => {

                                        return (

                                            order.products[item].productid ?

                                                <Link href={`/product/${order.products[item].productid}`} >
                                                    <TableRow key={order.products[item].productid} className="cursor-pointer">
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
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        // variant="h7"
                                                                        sx={{
                                                                            fontWeight: "200",
                                                                            fontSize: "16px",
                                                                            fontFamily: 'Roboto'
                                                                        }}
                                                                    >
                                                                        {order.products[item].quantity > 0 ?

                                                                            <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""} ({order.products[item].quantity} {order.products[item].mesure})

                                                                            </span>

                                                                            :

                                                                            <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""}

                                                                            </span>}

                                                                    </Typography>
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        sx={{
                                                                            fontSize: "10px",
                                                                        }}
                                                                    >
                                                                        {order.products[item].category == "all" ? "Grocery" : ""}
                                                                        {order.products[item].category == "veg" ? "Vegetable" : ""}
                                                                        {order.products[item].category == "dairy" ? "Dairy" : ""}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="h6">

                                                                <img src={order.products[item].img} alt="squiggiy" className=" w-14 h-12" />

                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary"
                                                                sx={{
                                                                    // fontWeight: "200",
                                                                    fontSize: "15px"
                                                                }}>
                                                                {order.products[item].qty}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "14px"
                                                            }}>
                                                                ₹ {(parseInt((order.products[item].price) - ((order.products[item].price * order.products[item].discount) / 100)))}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </Link>
                                                :

                                                <Link href={`/product/${order.products.product.slug}`} >
                                                    <TableRow key={order.products.product.slug} className="cursor-pointer">
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
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "200",
                                                                            fontSize: "16px",
                                                                            fontFamily: 'Roboto'
                                                                        }}
                                                                    >
                                                                        {order.products.product.quantity > 0 ? <span className="">
                                                                            {order.products.product.title.slice(0, 24)}{order.products.product.title.length > 24 ? "... " : ""} ({order.products.product.quantity} {order.products.product.mesure})

                                                                        </span> : <span className="">
                                                                            {order.products.product.title.slice(0, 24)}{order.products.product.title.length > 24 ? "... " : ""}

                                                                        </span>}

                                                                    </Typography>
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        sx={{
                                                                            fontSize: "13px",
                                                                        }}
                                                                    >
                                                                        {order.products.product.category == "all" ? "Grocery" : ""}
                                                                        {order.products.product.category == "veg" ? "Vegetable" : ""}
                                                                        {order.products.product.category == "dairy" ? "Dairy" : ""}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" variant="h6">


                                                                <img src={order.products.product.img} alt="squiggiy" className=" w-14 h-12" />
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "15px"
                                                            }}>
                                                                <span>1</span>
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "14px"
                                                            }}>
                                                                ₹ {parseInt(((order.products.product.price) - (((order.products.product.price) * (order.products.product.discount)) / 100)))}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </Link>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div>


                    <div className=" visible xsm:invisible h-auto xsm:h-0">

                        {id = 1}
                        <BaseCard title="" >

                            <span className='text-xl text-pink-500 font-bold'>Product</span>
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 4,
                                    // whiteSpace: "nowrap",
                                }}
                            >

                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary"
                                                sx={{
                                                    fontSize: "10px",
                                                    fontWeight: "500",

                                                }}>
                                                Id
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary"
                                                sx={{
                                                    fontSize: "10px",
                                                    fontWeight: "500",

                                                }}>
                                                Product Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary"
                                                sx={{
                                                    fontSize: "10px",
                                                    fontWeight: "500",

                                                }}>
                                                Qty
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary"
                                                sx={{
                                                    fontSize: "10px",
                                                    fontWeight: "500",

                                                }}>
                                                Price
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(order.products).map((item) => {

                                        return (

                                            order.products[item].productid ?

                                                <Link href={`/product/${order.products[item].productid}`} >
                                                    <TableRow key={order.products[item].productid} className="cursor-pointer">
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "9px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {id++}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        // variant="h7"
                                                                        sx={{
                                                                            fontWeight: "200",
                                                                            fontSize: "9px",
                                                                            fontFamily: 'Roboto'
                                                                        }}
                                                                    >
                                                                        {order.products[item].quantity > 0 ?

                                                                            <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""} ({order.products[item].quantity} {order.products[item].mesure})

                                                                            </span>

                                                                            :

                                                                            <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""}

                                                                            </span>}

                                                                    </Typography>
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        sx={{
                                                                            fontSize: "9px",
                                                                        }}
                                                                    >
                                                                        {order.products[item].category == "all" ? "Grocery" : ""}
                                                                        {order.products[item].category == "veg" ? "Vegetable" : ""}
                                                                        {order.products[item].category == "dairy" ? "Dairy" : ""}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary"
                                                                sx={{
                                                                    // fontWeight: "200",
                                                                    fontSize: "9px"
                                                                }}>
                                                                {order.products[item].qty}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "9px"
                                                            }}>
                                                                ₹ {(parseInt((order.products[item].price) - ((order.products[item].price * order.products[item].discount) / 100)))}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </Link>
                                                :

                                                <Link href={`/product/${order.products.product.slug}`} >
                                                    <TableRow key={order.products.product.slug} className="cursor-pointer">
                                                        <TableCell>
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "9px",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                {id++}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight: "200",
                                                                            fontSize: "9px",
                                                                            fontFamily: 'Roboto'
                                                                        }}
                                                                    >
                                                                        {order.products.product.quantity > 0 ? <span className="">
                                                                            {order.products.product.title.slice(0, 24)}{order.products.product.title.length > 24 ? "... " : ""} ({order.products.product.quantity} {order.products.product.mesure})

                                                                        </span> : <span className="">
                                                                            {order.products.product.title.slice(0, 24)}{order.products.product.title.length > 24 ? "... " : ""}

                                                                        </span>}

                                                                    </Typography>
                                                                    <Typography
                                                                        color="textSecondary"
                                                                        sx={{
                                                                            fontSize: "9px",
                                                                        }}
                                                                    >
                                                                        {order.products.product.category == "all" ? "Grocery" : ""}
                                                                        {order.products.product.category == "veg" ? "Vegetable" : ""}
                                                                        {order.products.product.category == "dairy" ? "Dairy" : ""}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography color="textSecondary" sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "9px"
                                                            }}>
                                                                <span>1</span>
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="right">
                                                            <Typography sx={{
                                                                // fontWeight: "200",
                                                                fontSize: "9px"
                                                            }}>
                                                                ₹ {parseInt(((order.products.product.price) - (((order.products.product.price) * (order.products.product.discount)) / 100)))}</Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                </Link>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div>


                    {/* {Math.ceil(order.products.length / 5) > 5 && <div className="pt-0.5 pb-12 flex justify-end ">

                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={12}>
                                <BaseCard >
                                    <Stack spacing={2}>
                                        <Pagination count={Math.ceil(order.products.length / 5)} color="primary" defaultPage={1} onChange={(event, value) => { setPage(value) }} />
                                    </Stack>
                                </BaseCard>
                            </Grid>
                        </Grid>
                    </div>} */}

                </Grid>

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
    let user = await User.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    // console.log(user)
    let id = context.query.id
    // console.log(id);

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


    // console.log(product);
    // console.log(id);
    if (!user) {

        jsCookie.remove('token', { expires: 1 });
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

export default trackOrder