
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Grid, Stack, Pagination } from "@mui/material";
import BaseCard from '../../src/components/baseCard/BaseCard';
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
import { BiEditAlt } from 'react-icons/bi';
import User from '../../models/User';
import Product from '../../models/Product';
import Seller from '../../models/Seller';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import Link from 'next/link'
import useMediaQuery from "@mui/material/useMediaQuery"

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";



const ViewProducts = ({ products }) => {


    let id = 1;
    const result = [];
    const [page, setPage] = useState(1);
    // console.log(products)

    let i = (page * 5) - 1;
    let j = (page * 5) - 5;
    for (const item in products) {

        if (i == j - 1) {
            break
        }

        if (products.length > i) {

            result[item] = products[i]
        }
        i--;

    }
    result.reverse()

    React.useEffect(() => {

        let i = (page * 5) - 1;
        let j = (page * 5) - 5;
        result = [];
        for (const item in products) {

            if (i == j - 1) {
                break
            }

            if (products.length > i) {

                result[item] = products[i]
            }
            i--;
        }
        result.reverse()

        // console.log(page)
        // console.log(result)

    }, [page]);



    return (

        <>
            <Head>
                <title>Squiggiy - View Product</title>
                <meta name="description" content="Check your products" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <FullLayout>

                    <div className=" invisible xsm:visible h-0 xsm:h-auto ">

                        <BaseCard title="Products" className="">
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 1,
                                    // whiteSpace: "nowrap",
                                }}
                            >

                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Id
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Product Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Image
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Stocks
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary" variant="h6">
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
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",

                                                        }}
                                                    >
                                                        <Box>
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontWeight: "600",

                                                                }}
                                                            >
                                                                {result[item].quantity > 0 ? <span className="">
                                                                    {result[item].title.slice(0, 24)}{result[item].title.length > 24 ? "... " : ""} ({result[item].quantity} {result[item].mesure})

                                                                </span> : <span className="">
                                                                    {result[item].title.slice(0, 24)}{result[item].title.length > 24 ? "... " : ""}

                                                                </span>}
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "13px",
                                                                }}
                                                            >
                                                                {result[item].category == "all" ? "Grocery" : ""}
                                                                {result[item].category == "veg" ? "Vegetable" : ""}
                                                                {result[item].category == "dairy" ? "Dairy" : ""}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="h6">

                                                        <img src={result[item].img} alt="squiggiy" className=" w-14 h-14" />

                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="h6">
                                                        {result[item].avalibleQty}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="h6">₹ {result[item].price}</Typography>
                                                </TableCell>
                                                <TableCell align="right">

                                                    <div >
                                                        <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/update/?id=${result[item]._id}`}>
                                                            <BiEditAlt className="cursor-pointer" />
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div>


                    <div className=" visible xsm:invisible h-auto xsm:h-0">
                        {id = 1}
                        <BaseCard title="Products" className="">
                            <Table
                                aria-label="simple table"
                                sx={{
                                    // mt: 1,
                                    // whiteSpace: "nowrap",
                                }}
                            >

                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography color="textSecondary" sx={{
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

                                                }}
                                            >
                                                Product Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" sx={{
                                                fontSize: "10px",
                                                fontWeight: "500",


                                            }}>
                                                Stock
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Typography color="textSecondary" sx={{
                                                fontSize: "10px",
                                                fontWeight: "500",

                                            }}>
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

                                                                sx={{
                                                                    fontSize: "9px",
                                                                    fontWeight: "600",

                                                                }}
                                                            >
                                                                {result[item].quantity > 0 ? <span className="">
                                                                    {result[item].title.slice(0, 24)}{result[item].title.length > 24 ? "... " : ""} ({result[item].quantity} {result[item].mesure})

                                                                </span> : <span className="">
                                                                    {result[item].title.slice(0, 24)}{result[item].title.length > 24 ? "... " : ""}

                                                                </span>}
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "9px",
                                                                }}
                                                            >
                                                                {result[item].category == "all" ? "Grocery" : ""}
                                                                {result[item].category == "veg" ? "Vegetable" : ""}
                                                                {result[item].category == "dairy" ? "Dairy" : ""}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography color="textSecondary" sx={{
                                                        fontSize: "9px",

                                                    }}>
                                                        {result[item].avalibleQty}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography sx={{
                                                        fontSize: "9px",

                                                    }}>₹ {result[item].price}</Typography>

                                                    <TableCell align="right">

                                                        <div >
                                                            <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/update/?id=${result[item]._id}`}>
                                                                <BiEditAlt className="cursor-pointer text-xs" />
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div>


                    {products.length > 0 ?

                        <div className=""></div>
                        :

                        <div className="text-center">You have not add any product, add your product to start effective business.</div>
                    }

                    {products.length > 5 && <div className="pt-0.5 pb-12 flex justify-end ">

                        <Grid container spacing={0}>
                            <Grid item xs={12} lg={12}>
                                <BaseCard >
                                    <Stack spacing={2}>
                                        <Pagination count={Math.ceil(products.length / 5)} color="primary" defaultPage={1} onChange={(event, value) => { setPage(value) }} />
                                    </Stack>
                                </BaseCard>
                            </Grid>
                        </Grid>
                    </div>}

                </FullLayout>
            </ThemeProvider>
        </>
    )

};



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
                destination: "/seller/login",
            },

            props: {}

        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let user = await User.findOne({ roll: t.roll, email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })


    let seller = await Seller.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })


    // if (order.length <= 0) {

    //     let a = 11111111111121;
    //     let b = 999999999999984;

    //     return {

    //         redirect: {
    //             permanent: false,
    //             destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`,
    //         },

    //         props: {}

    //     }
    // }

    if (!seller) {

        jsCookie.remove('token', { expires: 1 });
        return {

            redirect: {
                permanent: false,
                destination: "/seller/login",
            },

            props: {}

        }
    } else if (user && !seller) {

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


    let product = await Product.find({ userid: seller.shopemail })

    // let initiorder = await Order.find({ paymentstatus: 'Initiate' })

    // console.log(order)
    // console.log(initiorder)
    product = product.reverse()

    return {
        props: { products: JSON.parse(JSON.stringify(product)) }
    }
}


export default ViewProducts