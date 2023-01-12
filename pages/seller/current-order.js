
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
var jwt = require('jsonwebtoken');
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';
import { FaPhoneAlt } from 'react-icons/fa';
import Order from '../../models/Order';
import Seller from '../../models/Seller';
import User from '../../models/User';

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const CurrentOrder = ({ userorders, user, order }) => {

    const [shippedtime, setShippedtime] = useState(order.shippedtime)
    const [outofdeliverytime, setOutofdeliverytime] = useState(order.outofdeliverytime)
    const [deliverytime, setDeliverytime] = useState(order.deliverytime)

    const [shippedShow, setShippedShow] = useState(false)
    const [outofdeliveryShow, setOutofdeliveryShow] = useState(false)
    const [deliveredShow, setDeliveredShow] = useState(false)


    // console.log(Object.keys(order.products).length)
    // console.log(order)
    // console.log(userorders)

    let id = 1
    const handlechange = (e) => {

        if (e.target.name == 'shippedtime') {
            setShippedtime(e.target.value);
        }
        else if (e.target.name == 'outofdeliverytime') {
            setOutofdeliverytime(e.target.value);
        }
        else if (e.target.name == 'deliverytime') {
            setDeliverytime(e.target.value);
        }
    }

    const handleclick1 = (e, cate) => {

        e.preventDefault();

        setShippedShow(cate);
    }

    const handleclick2 = (e, cate) => {

        e.preventDefault();

        setOutofdeliveryShow(cate);
    }

    const handleclick3 = (e, cate) => {

        e.preventDefault();

        setDeliveredShow(cate);
    }

    const handlesubmit = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;

        const data = [{
            _id: order._id, shippedtime, outofdeliverytime, deliverytime
        }];

        // // console.log(data)

        if (shippedtime.length < 17 || outofdeliverytime.length < 17 || deliverytime.length < 17) {

            const sendform = async () => {

                try {

                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/updateorder-seller`, data);

                    setShippedShow(false);
                    setOutofdeliveryShow(false);
                    setDeliveredShow(false);

                    toast.success('Update delivery details', {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } catch (err) {
                    // Handle Error Here
                    // console.error(err);

                    toast.error('Check your internet connection', {
                        position: "bottom-center",
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            };
            sendform();

        } else {

            toast.error('Input text length should not greater than 12', {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    React.useEffect(() => {


    }, [order])


    return (

        <>
            <Head>
                <title>Squiggiy - Current Order</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <FullLayout>

                    <ToastContainer
                        style={{ fontSize: '12px' }}
                        position="bottom-center"
                        autoClose={941}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />

                    <Grid container className='flex mx-auto justify-evenly'>

                        <Grid item xs={12} lg={4}>

                            <BaseCard title="Order Status">
                                <Timeline
                                    sx={{
                                        p: 0,
                                    }}
                                >

                                    <TimelineItem key="9:01">
                                        <TimelineOppositeContent
                                            sx={{
                                                fontSize: "12px",
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
                                                fontSize: "14px",
                                            }}
                                        >
                                            Order Confirmed
                                        </TimelineContent>
                                    </TimelineItem>

                                    <TimelineItem key="9:01">
                                        <TimelineOppositeContent
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                // flex: "1",
                                            }}
                                        >

                                            {shippedShow == true ? <div className="">
                                                <div className="">

                                                    <input type="text" id="base-input" className="bg-gray-50 border text-xs rounded-lg block w-full p-1 outline-none text-black border-cyan-600"
                                                        placeholder='Time'
                                                        value={shippedtime} name="shippedtime"
                                                        onChange={handlechange} />
                                                </div>
                                            </div> : shippedtime}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "secondary.main",
                                                }}
                                                className="cursor-pointer"

                                                onClick={(e) => { handleclick1(e, true) }}
                                            />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent
                                            color="text.secondary"
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {shippedShow == true ? <div className="">
                                                <button onClick={handlesubmit} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br outline-none focus:ring-cyan-300 font-mono rounded-lg text-xs px-1 py-1 text-center mr-2 mb-2">submit</button>
                                            </div> : ""}Shipped
                                        </TimelineContent>
                                    </TimelineItem>

                                    <TimelineItem key="9:01">
                                        <TimelineOppositeContent
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                // flex: "1",
                                            }}
                                        >
                                            {outofdeliveryShow == true ? <div className="">
                                                <div className="">

                                                    <input type="text" id="base-input" className="bg-gray-50 border text-xs rounded-lg block w-full p-1 outline-none text-black border-cyan-600"
                                                        placeholder='Time'
                                                        value={outofdeliverytime} name="outofdeliverytime"
                                                        onChange={handlechange} />
                                                </div>
                                            </div> : outofdeliverytime}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "primary.main",
                                                }}
                                                className="cursor-pointer"

                                                onClick={(e) => { handleclick2(e, true) }}
                                            />
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent
                                            color="text.secondary"
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {outofdeliveryShow == true ? <div className="">
                                                <button onClick={handlesubmit} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br outline-none focus:ring-cyan-300 font-mono rounded-lg text-xs px-1 py-1 text-center mr-2 mb-2">submit</button>
                                            </div> : ""}Out For Delivery
                                        </TimelineContent>
                                    </TimelineItem>

                                    <TimelineItem key="9:01">
                                        <TimelineOppositeContent
                                            sx={{
                                                fontSize: "12px",
                                                fontWeight: "700",
                                                // flex: "1",
                                            }}
                                        >
                                            {deliveredShow == true ? <div className="">
                                                <div className="">

                                                    <input type="text" id="base-input" className="bg-gray-50 border text-xs rounded-lg block w-full p-1 outline-none text-black border-cyan-600"
                                                        placeholder='Time'
                                                        value={deliverytime} name="deliverytime"
                                                        onChange={handlechange} />
                                                </div>
                                            </div> : deliverytime}
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot
                                                variant="outlined"
                                                sx={{
                                                    borderColor: "success.main",
                                                }}
                                                className="cursor-pointer"

                                                onClick={(e) => { handleclick3(e, true) }}
                                            />
                                        </TimelineSeparator>
                                        <TimelineContent
                                            color="text.secondary"
                                            sx={{
                                                fontSize: "14px",
                                            }}
                                        >
                                            {deliveredShow == true ? <div className="">
                                                <button onClick={handlesubmit} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br outline-none focus:ring-cyan-300 font-mono rounded-lg text-xs px-1 py-1 text-center mr-2 mb-2">submit</button>
                                            </div> : ""}Delivered
                                        </TimelineContent>
                                    </TimelineItem>

                                </Timeline>

                                <div className='font-semibold'>Total Amount: ₹ {order.amount}</div>
                            </BaseCard>

                        </Grid>

                        <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
                            <h3 className="text-sm md:text-base font-semibold leading-5 text-gray-800">Customer</h3>
                            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                                <div className="flex flex-col justify-start items-start flex-shrink-0">
                                    <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-4 border-b border-gray-200">
                                        <img src={user.img} className="w-11 h-12" alt="" />
                                        <div className=" flex justify-start items-start flex-col space-y-2">
                                            <p className="text-base font-semibold leading-4 text-left text-gray-800">{user.name}</p>
                                            <p className="text-xs md:text-xs leading-5 text-gray-600">{userorders.length} Previous Orders</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-center  md:justify-start items-center space-x-4 pt-2 border-b border-gray-200 w-full">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M3 7L12 13L21 7" stroke="#1F2937" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="cursor-pointer text-sm leading-5 text-gray-800"><a className="text-blue-800" href={`mailto:${user.email}`}>{(user.email)}</a></p>
                                    </div>
                                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-1 border-b border-gray-200 w-full">
                                        <FaPhoneAlt className='text-sm mx-1' />
                                        <p className="px-0.5 cursor-pointer text-sm leading-5 text-gray-800">{order.userphone}</p>
                                    </div>
                                    <div className="flex justify-center  md:justify-start items-center space-x-4 py-1 border-b border-gray-200 w-full">
                                        <p className="px-0.5 text-sm leading-5 text-gray-800">Order Id: {order.orderid}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between  items-stretch w-full flex-col mt-4 md:mt-0">
                                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-3 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">

                                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 pt-0 md:pt-5">
                                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
                                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-xs md:text-sm leading-5 text-gray-600">{order.shippingaddress.address}, {order.shippingaddress.city}, {order.shippingaddress.state}-{order.shippingaddress.pincode}</p>
                                        </div>
                                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-3 pt-0 md:pt-3 xl:pt-0">
                                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Status</p>
                                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-xs md:text-sm leading-5 text-gray-600 pb-3">{order.paymentstatus == 'Case on delivery' ? 'Case on delivery' : 'Paid'}</p>
                                        </div>
                                    </div>
                                    {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                                        <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">Edit Details</button>
                                    </div> */}

                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} lg={8}>


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
                                                    Qty
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
                                                                            variant="h6"
                                                                            sx={{
                                                                                fontWeight: "600",
                                                                            }}
                                                                        >
                                                                            {order.products[item].quantity > 0 ? <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""} ({order.products[item].quantity} {order.products[item].mesure})

                                                                            </span> : <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""}

                                                                            </span>}

                                                                        </Typography>
                                                                        <Typography
                                                                            color="textSecondary"
                                                                            sx={{
                                                                                fontSize: "13px",
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

                                                                    <img src={order.products[item].img} alt="squiggiy" className=" w-16 h-14" />

                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography color="textSecondary" variant="h6">
                                                                    {order.products[item].qty}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography variant="h6">₹ {parseInt((order.products[item].price) - (((order.products[item].price) * (order.products[item].discount)) / 100))}</Typography>
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
                                                                            variant="h6"
                                                                            sx={{
                                                                                fontWeight: "600",
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

                                                                    <img src={order.products[item].img} alt="squiggiy" className=" w-14 h-14" />

                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Typography color="textSecondary" variant="h6">
                                                                    <span>1</span>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography variant="h6">₹ {parseInt(order.products.product.price - ((order.products.product.price * order.products.product.discount) / 100))}</Typography>
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
                                                <Typography color="textSecondary"
                                                    sx={{
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
                                                    Product Name
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" sx={{
                                                    fontSize: "10px",
                                                    fontWeight: "500",

                                                }}>
                                                    Qty
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
                                                                            variant="h6"
                                                                            sx={{
                                                                                fontSize: "9px",
                                                                                fontWeight: "600",
                                                                            }}
                                                                        >
                                                                            {order.products[item].quantity > 0 ? <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""} ({order.products[item].quantity} {order.products[item].mesure})

                                                                            </span> : <span className="">
                                                                                {order.products[item].title.slice(0, 24)}{order.products[item].title.length > 24 ? "... " : ""}

                                                                            </span>}

                                                                        </Typography>
                                                                        <Typography
                                                                            color="textSecondary"
                                                                            sx={{
                                                                                fontSize: "9px",
                                                                                // fontWeight: "600",
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
                                                                <Typography color="textSecondary" sx={{
                                                                    fontSize: "9px",
                                                                    fontWeight: "600",

                                                                }}>
                                                                    {order.products[item].qty}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography sx={{
                                                                    fontSize: "9px",
                                                                    fontWeight: "600",

                                                                }}>₹ {parseInt((order.products[item].price) - (((order.products[item].price) * (order.products[item].discount)) / 100))}</Typography>
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
                                                                    fontSize: "9px",
                                                                }}>
                                                                    <span>1</span>
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <Typography sx={{
                                                                    fontSize: "9px",
                                                                }}
                                                                >₹ {parseInt(order.products.product.price - ((order.products.product.price * order.products.product.discount) / 100))}</Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    </Link>

                                            )
                                        })}

                                    </TableBody>
                                </Table>
                            </BaseCard>
                        </div>

                        {/* {Object.keys(order.products).length > 5 && <div className="pt-0.5 pb-12 flex justify-end ">

                            <Grid container spacing={0}>
                                <Grid item xs={12} lg={12}>
                                    <BaseCard >
                                        <Stack spacing={2}>
                                            <Pagination count={Math.ceil(Object.keys(order.products).length / 5)} color="primary" defaultPage={1} onChange={(event, value) => { setPage(value) }} />
                                        </Stack>
                                    </BaseCard>
                                </Grid>
                            </Grid>
                        </div>} */}

                    </Grid>

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
    let seller = await Seller.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    // console.log(user)
    let id = context.query.id
    // console.log(id);

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

    let user = await User.findOne({ roll: "user", email: order.userid })
    let userorders = await Order.find({ userid: order.userid, orderstatus: "ok" })

    // console.log(product);
    // console.log(id);
    if (!seller) {

        jsCookie.remove('token', { expires: 1 });
        return {

            redirect: {
                permanent: false,
                destination: "/seller/singup",
            },

            props: {}
        }
    }

    return {
        props: { user: JSON.parse(JSON.stringify(user)), userorders: JSON.parse(JSON.stringify(userorders)), order: JSON.parse(JSON.stringify(order)) }
    }
}


export default CurrentOrder