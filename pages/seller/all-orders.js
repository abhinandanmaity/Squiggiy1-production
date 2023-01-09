
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
import Order from '../../models/Order';
import Seller from '../../models/Seller';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import Link from 'next/link';
import Product from '../../models/Product';
import { DataGrid } from "@mui/x-data-grid";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
// import { jobs_v3 } from 'googleapis';



const AllOrders = ({ orders }) => {

    let id = 0;
    const result = {};
    const [page, setPage] = useState(1);
    // console.log(orders)

    // let i = (page * 5) - 1;
    let i = 0;
    let j = (page * 5) - 5;
    for (const item in orders) {

        // if (i == j - 1) {
        //     break
        // }

        // if (Object.keys(orders).length > i) {

        result[item] = orders[i]
        // }
        i++;

    }
    // Object.keys(result).reverse()

    // console.log(result)

    // React.useEffect(() => {

    //     let i = (page * 5) - 1;
    //     let j = (page * 5) - 5;
    //     result = [];
    //     for (const item in orders) {

    //         if (i == j - 1) {
    //             break
    //         }

    //         if (Object.keys(orders).length > i) {

    //             result[item] = orders[i]
    //         }
    //         i--;
    //     }

    //     // console.log(i)
    //     // result.reverse()

    // }, [page]);


    const columns = [

        {
            field: "id",
            headerName: "ID",
            flex: 0.1,
        },
        {
            field: "userphone",
            headerName: "Phone Number",
            flex: 0.6,
        },
        {
            field: "shippingaddress",
            headerName: "Address",
            flex: 1,
        },
        {
            field: "paymentstatus",
            headerName: "Payment",
            flex: 0.7,
        },
        {
            field: "deliverystatus",
            headerName: "Status",
            flex: 0.6,
        },
        {
            field: "amount",
            headerName: "Price",
            flex: 0.5,
        },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.1,
            sortable: false,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div >
                        <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/current-order/?id=${params.value}`}>
                            <BiEditAlt className="cursor-pointer" />
                        </Link>
                    </div>
                )
            },
        },
    ];

    let rows = [];

    {
        Object.keys(result).map((item) => {

            // console.log(result[item])
            rows[id] =
            {
                id: id + 1,
                userphone: result[item].userphone,
                shippingaddress: `${result[item].shippingaddress.address.slice(0, 16)}${result[item].shippingaddress.address.length > 16 ? "..." : ""}, ${result[item].shippingaddress.pincode}`,
                paymentstatus: result[item].paymentstatus,
                deliverystatus: result[item].deliverystatus,
                amount: `₹ ${result[item].amount}`,
                edit: result[item]._id

            }

            id++;
        })
    };

    // rows = [rows]
    // console.log(rows)


    // rows.forEach(element => {

    // console.log(element)
    // console.log(rows[element])
    // })

    return (

        <>

            <Head>
                <title>Squiggiy - View Orders</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <FullLayout>

                    {/* <div className=" invisible lsm:visible h-0 lsm:h-auto ">
                        <BaseCard title="Orders" className="">
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
                                            <Typography color="textSecondary" variant="h6">
                                                Id
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Coustomer
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Address
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Payment
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Status
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
                                                                {result[item].userid.slice(0, 15)}{result[item].userid.length > 15 ? "... " : ""}
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "13px",
                                                                }}
                                                            >
                                                                +91 {result[item].userphone}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="h6">
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
                                                    <Typography variant="h6">₹ {result[item].amount}</Typography>
                                                </TableCell>
                                                <TableCell align="right">

                                                    {result[item].deliverystatus != "Cancle" || result[item].deliverystatus != "Delivered" ? <div >
                                                        <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/current-order/?id=${result[item]._id}`}>
                                                            <BiEditAlt className="cursor-pointer" />
                                                        </Link>
                                                    </div> : <div></div>}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div> */}


                    {/* <div className=" visible lsm:invisible h-auto lsm:h-0 ">
                        <BaseCard title="Orders" className="">
                            <Table
                                aria-label="simple table"
                                sx={{
                                    // mt: 1,
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
                                            <Typography color="textSecondary" sx={{
                                                fontSize: "10px",
                                                fontWeight: "500",

                                            }}>
                                                Coustomer
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" sx={{
                                                fontSize: "10px",
                                                fontWeight: "500",

                                            }}>
                                                Address
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography color="textSecondary" sx={{
                                                fontSize: "10px",
                                                fontWeight: "500",

                                            }}>
                                                Status
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
                                                                    fontSize: "9px",
                                                                    fontWeight: "600",
                                                                }}
                                                            >
                                                                {result[item].userid.slice(0, 10)}{result[item].userid.length > 10 ? "... " : ""}
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "9px",
                                                                }}
                                                            >
                                                                +91 {result[item].userphone}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography color="textSecondary" sx={{
                                                        fontSize: "9px",
                                                    }}>
                                                        {result[item].shippingaddress.address.slice(0, 10)}{result[item].shippingaddress.address.length > 10 ? "..." : ""}, {result[item].shippingaddress.pincode}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>

                                                    {result[item].deliverystatus === "Cancle" ? <Chip
                                                        sx={{
                                                            pl: "1px",
                                                            pr: "1px",
                                                            backgroundColor: "error.main",
                                                            color: "#fff",
                                                        }}
                                                        size="small"
                                                        label={result[item].deliverystatus}
                                                    ></Chip> : ""}

                                                    {result[item].deliverystatus === "Delivered" ? <Chip
                                                        sx={{
                                                            pl: "1px",
                                                            pr: "1px",
                                                            backgroundColor: "success.main",
                                                            color: "#fff",
                                                        }}
                                                        size="small"
                                                        label={result[item].deliverystatus}
                                                    ></Chip> : ""}

                                                    {result[item].deliverystatus === "OutOfDelivery" ? <Chip
                                                        sx={{
                                                            pl: "1px",
                                                            pr: "1px",
                                                            backgroundColor: "secondary.main",
                                                            color: "#fff",
                                                        }}
                                                        size="small"
                                                        label={result[item].deliverystatus}
                                                    ></Chip> : ""}
                                                    {result[item].deliverystatus === "Initiate" ? <Chip
                                                        sx={{
                                                            pl: "1px",
                                                            pr: "1px",
                                                            backgroundColor: "primary.main",
                                                            color: "#fff",
                                                        }}
                                                        size="small"
                                                        label={result[item].deliverystatus}
                                                    ></Chip> : ""}
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Typography sx={{
                                                        fontSize: "9px",
                                                        fontWeight: "600",
                                                    }}>₹ {result[item].amount}</Typography>

                                                    <TableCell align="right">

                                                        {result[item].deliverystatus != "Cancle" || result[item].deliverystatus != "Delivered" ? <div >
                                                            <Link href={`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/current-order/?id=${result[item]._id}`}>
                                                                <BiEditAlt className="cursor-pointer text-sm" />
                                                            </Link>
                                                        </div> : <div></div>}
                                                    </TableCell>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    })}

                                </TableBody>
                            </Table>
                        </BaseCard>
                    </div> */}


<div className=" font-semibold">ORDERS</div>
                        <div className=" text-sm font-light">Orders overview of your products</div>

                    <Box sx={{ height: 475, mt: "1rem" }}>
                        <DataGrid

                            // getRowId={(rows) => rows.id}
                            getRowId={rows.forEach((element) => (element.id))}
                            rows={rows}
                            columns={columns}
                            pageSize={7}
                            rowsPerPageOptions={[7]}
                        // experimentalFeatures={{ newEditingApi: true }}
                        />
                    </Box>


                    {/* {Object.keys(orders).length > 5 ?

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
                        <div className=""></div>} */}

                    {Object.keys(orders).length > 0 ?

                        <div className=""></div>
                        :

                        <div className="text-center">You have not any order yet.</div>
                    }

                </FullLayout>
            </ThemeProvider>

        </>
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
                destination: "/seller/login",
            },

            props: {}

        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let order = await Order.find()

    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })


    // let initiorder = await Order.find({ paymentstatus: 'Initiate' })

    // console.log(order)
    // console.log(initiorder)
    order = order.reverse()

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

    // console.log(order)

    let orders = {}
    let j = 0;
    for (let item of order) {

        // console.log(item.products)

        if (item.products && item.products.product) {

            // let p = await Product.findOne({ slug: item.products.product.slug })

            if (item.products.product.userid == seller.shopemail && item.paymentstatus != "Initiate") {

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

        } else if (item.products && item.paymentstatus != "Initiate") {

            let pppp;

            // console.log(item.products)
            for (let ii in item.products) {

                // console.log(item.products[ii].productid)

                let product = await Product.findOne({ slug: `${item.products[ii].productid}`, userid: seller.shopemail })
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
    }

    // console.log(product)

    return {
        props: { orders: JSON.parse(JSON.stringify(orders)) }
    }
}


export default AllOrders