
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
// import dynamic from "next/dynamic";
// import BaseCard from '../../src/components/baseCard/BaseCard'
import User from '../../models/User';
import Order from '../../models/Order';
import Seller from '../../models/Seller';
import Product from '../../models/Product';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import Link from 'next/link';
import {
    Card, CardContent, Typography, Button, Grid,
    FormControl, MenuItem, InputLabel, Box, Select
} from "@mui/material";
// import Image from "next/image"
import { ResponsiveLine } from '@nivo/line'
// import { ImageAspectRatioOutlined } from '@mui/icons-material';

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";



const Index = ({ orders, bestSellingproduct }) => {

    // console.log(bestSellingproduct)
    // console.log(orders)
    // console.log(new Date())
    // console.log(new Date().getTime())
    // console.log(new Date().getFullYear() == orders[0].oiddate.slice(0, 4))
    // console.log(new Date().getMonth() + 1)
    // console.log(new Date().getHours())
    // const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

    // const [view, setView] = useState("Jan");

    let month = [[], [], [], [], [], [], [], [], [], [], [], []]
    let i = 0, j = 0, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0;

    for (let item in orders) {

        // month[1][j] = orders[item]
        // j++
        // console.log(orders[item].oiddate.slice(4, 7))
        if (orders[item].oiddate.slice(4, 7) == "Jan") {

            month[0][i] = orders[item]
            i++
        } else if (orders[item].oiddate.slice(4, 7) == "Feb") {

            month[1][j] = orders[item]
            j++
        } else if (orders[item].oiddate.slice(4, 7) == "Mar") {

            month[2][k] = orders[item]
            k++
        } else if (orders[item].oiddate.slice(4, 7) == "Apr") {

            month[3][l] = orders[item]
            l++
        } else if (orders[item].oiddate.slice(4, 7) == "May") {

            month[4][m] = orders[item]
            m++
        } else if (orders[item].oiddate.slice(4, 7) == "Jun") {

            month[5][n] = orders[item]
            n++
        } else if (orders[item].oiddate.slice(4, 7) == "Jul") {

            month[6][o] = orders[item]
            o++
        } else if (orders[item].oiddate.slice(4, 7) == "Aug") {

            month[7][p] = orders[item]
            p++
        } else if (orders[item].oiddate.slice(4, 7) == "Sep") {

            month[8][q] = orders[item]
            q++
        } else if (orders[item].oiddate.slice(4, 7) == "Oct") {

            month[9][r] = orders[item]
            r++
        } else if (orders[item].oiddate.slice(4, 7) == "Nov") {

            month[10][s] = orders[item]
            s++
        } else if (orders[item].oiddate.slice(4, 7) == "Dec") {

            month[11][t] = orders[item]
            t++
        }
    }
    // console.log(month)

    // let revenue = []
    // let produc = []

    // for (let index = 0; index < month.length; index++) {

    //     revenue[index] = 0
    //     for (let mindex = 0; mindex < month[index].length; mindex++) {

    //         // console.log(month[index][mindex].amount)

    //         if (month[index][mindex]) {

    //             revenue[index] += month[index][mindex].amount
    //         }
    //     }
    // }
    // // console.log(revenue)

    // for (let index = 0; index < month.length; index++) {

    //     produc[index] = 0
    //     for (let mindex = 0; mindex < month[index].length; mindex++) {

    //         // console.log(month[index][mindex].amount)

    //         if (month[index][mindex]) {

    //             // console.log(month[index][mindex].products)
    //             if (month[index][mindex].products && month[index][mindex].products.product) {

    //                 produc[index] += 1
    //             } else if (month[index][mindex].products) {

    //                 // console.log(Object.keys(month[index][mindex].products).length)
    //                 let d = Object.keys(month[index][mindex].products).length
    //                 Object.keys(month[index][mindex].products).map((item) => {

    //                     // console.log(month[index][mindex].products[item])
    //                     d += month[index][mindex].products[item].qty
    //                 })
    //                 // console.log(d)
    //                 produc[index] += d
    //             }
    //         }
    //     }
    // }

    // let max = 0
    // for (let index = 0; index < revenue.length; index++) {

    //     if (max < revenue[index]) {

    //         max = revenue[index]
    //     }
    // }
    // max = max + 100

    // // console.log(produc)

    // let result = []
    // i = 0
    // for (let item in bestSellingproduct) {

    //     // console.log(item)
    //     if (!result[bestSellingproduct[item].slug] && !result[bestSellingproduct[item].productid]) {

    //         if (bestSellingproduct[item].slug) {

    //             result[bestSellingproduct[item].slug] = 0

    //             result[bestSellingproduct[item].slug] += 1
    //         } else {

    //             result[bestSellingproduct[item].productid] = 0

    //             result[bestSellingproduct[item].productid] += bestSellingproduct[item].qty

    //         }
    //     } else if (result[bestSellingproduct[item].slug]) {

    //         result[bestSellingproduct[item].slug] += 1
    //     } else {

    //         result[bestSellingproduct[item].productid] += bestSellingproduct[item].qty
    //     }
    // }
    // // console.log(result)

    // // result.sort((a, b) => { return result[b] > result[a] })

    // // console.log(result)
    // let MAX = 0
    // let count = 0
    // let topproduct = []
    // j = 0
    // let slug

    // for (let index = 0; index < 9; index++) {

    //     for (const item in result) {

    //         // console.log(item)
    //         if (MAX == 0 || (MAX < result[item] && !topproduct.includes(item))) {

    //             MAX = result[item]
    //             slug = item
    //             count = 1
    //         }
    //     }
    //     MAX = 1

    //     if (count == 1 && !topproduct.includes(slug)) {

    //         topproduct[j] = slug
    //         j++
    //     }
    // }
    // // console.log(topproduct)

    // for (let index = 0; index < topproduct.length; index++) {
    //     const element = topproduct[index];

    //     for (let item in bestSellingproduct) {

    //         if (bestSellingproduct[item].slug) {

    //             if (bestSellingproduct[item].slug == element) {

    //                 topproduct[index] = bestSellingproduct[item]
    //             }
    //         } else if (bestSellingproduct[item].productid) {

    //             if (bestSellingproduct[item].productid == element) {

    //                 topproduct[index] = bestSellingproduct[item]
    //             }
    //         }
    //     }
    // }
    // console.log(topproduct)

    // const optionssalesoverview = {
    //     grid: {
    //         show: true,
    //         borderColor: "transparent",
    //         strokeDashArray: 2,
    //         padding: {
    //             left: 0,
    //             right: 0,
    //             bottom: 0,
    //         },
    //     },
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             columnWidth: "42%",
    //             endingShape: "rounded",
    //             borderRadius: 5,
    //         },
    //     },

    //     colors: ["#fb9678", "#03c9d7"],
    //     fill: {
    //         type: "solid",
    //         opacity: 1,
    //     },
    //     chart: {
    //         offsetX: -15,
    //         toolbar: {
    //             show: false,
    //         },
    //         foreColor: "#adb0bb",
    //         fontFamily: "'DM Sans',sans-serif",
    //         sparkline: {
    //             enabled: false,
    //         },
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     markers: {
    //         size: 0,
    //     },
    //     legend: {
    //         show: false,
    //     },
    //     xaxis: {
    //         type: "category",
    //         categories: [
    //             "Jan",
    //             "Feb",
    //             "Mar",
    //             "Apr",
    //             "May",
    //             "Jun",
    //             "July",
    //             "Aug",
    //             "Sept",
    //             "Oct",
    //             "Nov",
    //             "Dec",
    //         ],
    //         labels: {
    //             style: {
    //                 cssClass: "grey--text lighten-2--text fill-color",
    //             },
    //         },
    //     },
    //     yaxis: {
    //         show: true,
    //         min: 0,
    //         max: max,
    //         tickAmount: 3,
    //         labels: {
    //             style: {
    //                 cssClass: "grey--text lighten-2--text fill-color",
    //             },
    //         },
    //     },
    //     stroke: {
    //         show: true,
    //         width: 5,
    //         lineCap: "butt",
    //         colors: ["transparent"],
    //     },
    //     tooltip: {
    //         theme: "dark",
    //     },
    // };
    // const seriessalesoverview = [
    //     {
    //         name: "No. of Products",
    //         data: [produc[0], produc[1], produc[2], produc[3], produc[4], produc[5], produc[6], produc[7], produc[8], produc[9], produc[10], produc[11]],
    //     },
    //     {
    //         name: "Revenue",
    //         data: [revenue[0], revenue[1], revenue[2], revenue[3], revenue[4], revenue[5], revenue[6], revenue[7], revenue[8], revenue[9], revenue[10], revenue[11]],
    //     },
    // ];

    // let data = [

    //     {
    //         "id": "No. of Products sell",
    //         "color": "hsl(138, 70%, 50%)",
    //         "data": [
    //             {
    //                 "x": "Jan",
    //                 "y": produc[0]
    //             },
    //             {
    //                 "x": "Feb",
    //                 "y": produc[1]
    //             },
    //             {
    //                 "x": "Mar",
    //                 "y": produc[2]
    //             },
    //             {
    //                 "x": "Apr",
    //                 "y": produc[3]
    //             },
    //             {
    //                 "x": "May",
    //                 "y": produc[4]
    //             },
    //             {
    //                 "x": "Jun",
    //                 "y": produc[5]
    //             },
    //             {
    //                 "x": "Jul",
    //                 "y": produc[6]
    //             },
    //             {
    //                 "x": "Aug",
    //                 "y": produc[7]
    //             },
    //             {
    //                 "x": "Sep",
    //                 "y": produc[8]
    //             },
    //             {
    //                 "x": "Oct",
    //                 "y": produc[9]
    //             },
    //             {
    //                 "x": "Nov",
    //                 "y": produc[10]
    //             },
    //             {
    //                 "x": "Dec",
    //                 "y": produc[11]
    //             }
    //         ]
    //     },
    //     {
    //         "id": "Revenue",
    //         "color": "hsl(301, 70%, 50%)",
    //         "data": [
    //             {
    //                 "x": "Jan",
    //                 "y": revenue[0]
    //             },
    //             {
    //                 "x": "Feb",
    //                 "y": revenue[1]
    //             },
    //             {
    //                 "x": "Mar",
    //                 "y": revenue[2]
    //             },
    //             {
    //                 "x": "Apr",
    //                 "y": revenue[3]
    //             },
    //             {
    //                 "x": "May",
    //                 "y": revenue[4]
    //             },
    //             {
    //                 "x": "Jun",
    //                 "y": revenue[5]
    //             },
    //             {
    //                 "x": "Jul",
    //                 "y": revenue[6]
    //             },
    //             {
    //                 "x": "Aug",
    //                 "y": revenue[7]
    //             },
    //             {
    //                 "x": "Sep",
    //                 "y": revenue[8]
    //             },
    //             {
    //                 "x": "Oct",
    //                 "y": revenue[9]
    //             },
    //             {
    //                 "x": "Nov",
    //                 "y": revenue[10]
    //             },
    //             {
    //                 "x": "Dec",
    //                 "y": revenue[11]
    //             }
    //         ]
    //     }
    // ]

    return (

        <>

            <Head>
                <title>Squiggiy - Sales Overview</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>


            <ThemeProvider theme={theme}>

                {/* <style jsx global>{`
 
                footer{
                    display: none;
                }
            `}</style> */}

                <FullLayout>

                    <Grid>
                        {/* <Grid item xs={12} lg={12}> */}


                        {/* <BaseCard title="Sales Overview">
                                <Chart
                                    options={optionssalesoverview}
                                    series={seriessalesoverview}
                                    type="bar"
                                    height="295px"
                                />
                            </BaseCard> */}



                        <Box height="360px">
                            <div className=" font-semibold">OVERVIEW</div>
                            <div className=" text-sm font-light">Sales overview of this year revenue</div>

                            {/* <ResponsiveLine
                                data={data}
                                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{
                                    type: 'linear',
                                    min: 'auto',
                                    max: 'auto',
                                    stacked: true,
                                    reverse: false
                                }}
                                yFormat=" >-.2f"
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: 'bottom',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Months',
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    orient: 'left',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    // legend: 'Rupess',
                                    legendOffset: -40,
                                    legendPosition: 'middle'
                                }}
                                lineWidth={1}
                                pointSize={7}
                                pointColor={{ theme: 'background' }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: 'serieColor' }}
                                pointLabelYOffset={-18}
                                areaOpacity={0.15}
                                useMesh={true}
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'column',
                                        justify: false,
                                        translateX: 100,
                                        translateY: 0,
                                        itemsSpacing: 0,
                                        itemDirection: 'left-to-right',
                                        itemWidth: 80,
                                        itemHeight: 20,
                                        itemOpacity: 0.75,
                                        symbolSize: 12,
                                        symbolShape: 'circle',
                                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                        effects: [
                                            {
                                                on: 'hover',
                                                style: {
                                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                                    itemOpacity: 1
                                                }
                                            }
                                        ]
                                    }
                                ]}
                            /> */}

                        </Box>




                        {/* </Grid> */}

                        <Grid item xs={12} lg={12}>

                            <div className="bg-gray-100  flex flex-col justify-center items-center pt-9 sm:pt-12 lg:pt-16 pb-9">
                                <div className="2xl:container 2xl:mx-auto flex flex-col justify-center items-center sm:pb-12 lg:pb-0 space-y-4 px-4 md:px-6 2xl:px-0">
                                    <div>
                                        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-9 text-center text-gray-800 ">Top Selling products</p>
                                    </div>
                                    <div>
                                        <p className="text-sm sm:text-base leading-normal sm:leading-none text-center text-gray-600 ">Explore products that people frequently like most</p>
                                    </div>
                                </div>
                            </div>

                            <Grid container>

                                {Object.keys(topproduct).map((item) => {

                                    return (

                                        topproduct[item].productid ?

                                            <Link href={`/product/${topproduct[item].productid}`}>

                                                <Grid
                                                    key={topproduct[item]._id}
                                                    item
                                                    xs={12}
                                                    lg={4}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Card
                                                        sx={{
                                                            p: 0,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {/* <Image  alt="img" /> */}
                                                        <span >
                                                            <img

                                                                src={topproduct[item].img}
                                                                alt="squiggiy"
                                                                className="rounded-t-xl cursor-pointer"
                                                            />
                                                        </span>
                                                        <CardContent
                                                            sx={{
                                                                paddingLeft: "30px",
                                                                paddingRight: "30px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "h4.fontSize",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                <div>
                                                                    <div>
                                                                        <p className="text-sm font-medium leading-none text-gray-800 ">{(topproduct[item].title).slice(0, 38)}...</p>
                                                                    </div>
                                                                </div>
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    mt: 1,
                                                                }}
                                                            >

                                                            </Typography>

                                                            {<div className="flex justify-start pt-4">

                                                                <p className=" text-xs xs:text-sm leading-none text-right text-gray-900 ">₹ {parseInt((topproduct[item].price) - (((topproduct[item].price) * topproduct[item].discount) / 100))} <del className="text-xs ml-2 font-extrathin"> {topproduct[item].discount != 0 && ("₹ " + (topproduct[item].price).toString())}</del>

                                                                    <span className="text-xs text-green-700" >{topproduct[item].discount != 0 ? "  " + topproduct[item].discount + "% off" : ''}</span>

                                                                </p>
                                                            </div>}
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Link>

                                            :

                                            <Link href={`/product/${topproduct[item].slug}`}>

                                                <Grid
                                                    key={topproduct[item]._id}
                                                    item
                                                    xs={12}
                                                    lg={4}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "stretch",
                                                    }}
                                                >
                                                    <Card
                                                        sx={{
                                                            p: 0,
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {/* <Image  alt="img" /> */}
                                                        <span >
                                                            <img

                                                                src={topproduct[item].img}
                                                                alt="squiggiy"
                                                                className="rounded-t-xl cursor-pointer"
                                                            />
                                                        </span>
                                                        <CardContent
                                                            sx={{
                                                                paddingLeft: "30px",
                                                                paddingRight: "30px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    fontSize: "h4.fontSize",
                                                                    fontWeight: "500",
                                                                }}
                                                            >
                                                                <div className="flex justify-between mt-5">
                                                                    <div>
                                                                        <p className="text-sm font-medium leading-none text-gray-800 ">{(topproduct[item].title).slice(0, 38)}...</p>
                                                                    </div>
                                                                </div>
                                                            </Typography>
                                                            <Typography
                                                                color="textSecondary"
                                                                sx={{
                                                                    fontSize: "14px",
                                                                    fontWeight: "400",
                                                                    mt: 1,
                                                                }}
                                                            >

                                                            </Typography>

                                                            {<div className="flex justify-start pt-4">

                                                                <p className=" text-xs xs:text-sm leading-none text-right text-gray-900 ">₹ {parseInt((topproduct[item].price) - (((topproduct[item].price) * topproduct[item].discount) / 100))} <del className="text-xs ml-2 font-extrathin"> {topproduct[item].discount != 0 && ("₹ " + (topproduct[item].price).toString())}</del>

                                                                    <span className="text-xs text-green-700" >{topproduct[item].discount != 0 ? "  " + topproduct[item].discount + "% off" : ''}</span>

                                                                </p>
                                                            </div>}
                                                        </CardContent>
                                                    </Card>
                                                </Grid>

                                            </Link>
                                    )
                                })}
                            </Grid>


                        </Grid>


                    </Grid>
                </FullLayout>
            </ThemeProvider>

        </>
    );
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

    let order = await Order.find({ orderstatus: "ok" })

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

        // console.log(new Date().getFullYear())
        // console.log(item.oiddate.slice(11, 15))

        if (new Date().getFullYear() == item.oiddate.slice(11, 15)) {

            if (item.products && item.products.product) {

                // let p = await Product.findOne({ slug: item.products.product.slug })

                if (item.products.product.userid == seller.shopemail) {

                    // if (item.orderid in order) {
                    //     if (!orders[item.orderid]) {
                    //         orders[item.orderid]
                    //     }
                    // } else {
                    // console.log(item.orderid)


                    // item.products.product.img = product.img
                    orders[j] = JSON.parse(JSON.stringify(item))
                    j++
                    // }

                }
            } else if (item.products) {

                let pppp;

                // console.log(item.products)
                for (let ii in item.products) {

                    // console.log(item.products[ii].productid)

                    let product = await Product.findOne({ slug: `${item.products[ii].productid}`, userid: seller.shopemail })
                    // console.log(product.avalibleQty)
                    // let oid = item.orderid;
                    // console.log(item.products[ii].img)
                    // console.log(product)
                    if (product) {
                        // item.products[ii].img = product.img
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
    }


    let bestSellingproduct = {}
    // let k = 0;
    // for (let item of order) {

    //     // console.log(new Date().getFullYear())
    //     // console.log(item.oiddate.slice(11, 15))

    //     if (item.products && item.products.product) {

    //         // let p = await Product.findOne({ slug: item.products.product.slug })

    //         if (item.products.product.userid == seller.shopemail) {

    //             // if (item.orderid in order) {
    //             //     if (!orders[item.orderid]) {
    //             //         orders[item.orderid]
    //             //     }
    //             // } else {
    //             // console.log(item.orderid)
    //             let product = await Product.findOne({ slug: `${item.products.product.slug}`, userid: seller.shopemail })

    //             // console.log(item.products.product.img = product.img)
    //             // console.log(product)

    //             if (product) {

    //                 item.products.product.img = product.img
    //                 bestSellingproduct[k] = JSON.parse(JSON.stringify(item.products.product))
    //                 // console.log(bestSellingproduct[k])
    //                 k++
    //                 // }
    //             }

    //         }
    //     } else if (item.products) {

    //         let pppp;

    //         // console.log(item.products)
    //         for (let ii in item.products) {

    //             // console.log(item.products[ii].productid)

    //             let product = await Product.findOne({ slug: `${item.products[ii].productid}`, userid: seller.shopemail })
    //             // console.log(product.avalibleQty)
    //             // let oid = item.orderid;

    //             if (product) {
    //                 item.products[ii].img = product.img
    //                 pppp = product;
    //                 bestSellingproduct[k] = JSON.parse(JSON.stringify(item.products[ii]))
    //                 // console.log(bestSellingproduct[k])
    //                 k++
    //             }
    //         }
    //     }
    // }

    // console.log(bestSellingproduct)

    return {

        props: { orders: JSON.parse(JSON.stringify(orders)), bestSellingproduct: JSON.parse(JSON.stringify(bestSellingproduct)) }
    }
}

export default Index;