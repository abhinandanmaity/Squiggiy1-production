import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Product from '../models/Product'
import Seller from '../models/Seller'
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
var jwt = require('jsonwebtoken')
import { parseCookies } from 'nookies'


const vegitable = ({ products }) => {

    // console.log(products)

    return (

        <div>

            <Head>
                <title>Squiggiy - Vegitable</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>



            <div className="min-h-screen py-12">

                <div className="flex flex-wrap justify-around">

                    {products && Object.keys(products).map((item) => {

                        // console.log(item)
                        return (

                            <div key={products[item]._id} className=" xl:w-1/4 md:w-1/2 xs:w-1/2 p-8">
                                <div className=" bg-gray-100 p-2 rounded-md shadow-2xl ">
                                    <Link href={`/product/${products[item].slug}`}><a>
                                        <img className=" h-72 rounded-t-lg w-96 object-contain object-center mb-3" src={products[item].img} alt="squiggiy" />

                                        <div className="mx-10 items-start">

                                            <h2 className="sm:text-xs text-xxs text-gray-400 font-medium title-font pb-2">vegitable</h2>
                                            <h2 className="sm:text-sm text-xs text-gray-900 font-medium title-font mb-2">{products[item].title}</h2>


                                            {products[item].discount != 0 && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span> <del className="text-xs ml-2 font-extrathin">₹ {((products[item].price).toString())}</del>  <span className="text-green-500 text-xs">{products[item].discount}% off</span>
                                            </p>}

                                            {products[item].discount == 0 && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span>
                                            </p>}

                                            {products[item].discount == undefined && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span>
                                            </p>}


                                            {/* {parseInt((product.price) - (((product.price) * 80) / 100))} <del className = "text-base mx-2">{((product.price).toString())}</del>  <span className=" text-base text-green-500">{product.discount}% off</span> */}

                                            {/* <p className="leading-relaxed text-base text-gray-400">size:

                            {products[item].size.includes('S') && <span className="text-xs mx-1 px-1 border border-gray-300">S</span>}
                            {products[item].size.includes('M') && <span className="text-xs mx-1 px-1 border border-gray-300">M</span>}
                            {products[item].size.includes('L') && <span className="text-xs mx-1 px-1 border border-gray-300">L</span>}
                            {products[item].size.includes('XL') && <span className="text-xs mx-1 px-0.5 border border-gray-300">XL</span>}
                            {products[item].size.includes('XXL') && <span className="text-xs mx-1 border border-gray-300">XXL</span>}

                        </p> */}

                                            {/* <p className="leading-relaxed text-base text-gray-400">{products[item].colour[0]}</p> */}
                                            <div className="text-sm mt-2 mb-3">
                                                Qty: {products[item].quantity.map((element) => {

                                                    return (
                                                        // <button className={`border-2 border-gray-300 ml-1 bg-${element}-700 rounded-full w-6 h-6 focus:outline-none`}></button>

                                                        <span key={element} className="px-1.5 text-xs border border-gray-200 ">{element}</span>

                                                    )

                                                })}
                                            </div>
                                        </div>

                                    </a>
                                    </Link>

                                </div>
                            </div>

                        )
                    })}

                </div>

                {!products && <p className='text-center'>Product is not avalible</p>}
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
    const token = cookies.token != "undefined" || cookies.token ? cookies.token : "";

    let t;
    // console.log(token)
    if (token) {

        try {

            t = jwt.verify(token, process.env.JWT_SECRET_KEY)

        } catch (err) {

        }
    }

    let seller;
    if (t != undefined) {

        seller = await Seller.findOne({ roll: t.roll, shopemail: t.email })
        // console.log(seller)
    }

    if (seller) {

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


    let products = await Product.find({ category: 'veg' })

    let vegitables = {}
    let count = 0;

    for (let item of products) {

        if (item.avalibleQty > 0) {
            if (item.slug in vegitables) {


                if (!vegitables[item.slug].quantity.includes(item.quantity) && item.avalibleQty > 0) {
                    vegitables[item.slug].quantity.push(item.quantity)
                }
                if (!vegitables[item.slug].mesure.includes(item.mesure) && item.avalibleQty > 0) {
                    vegitables[item.slug].mesure.push(item.mesure)
                }

            } else {
                vegitables[item.slug] = JSON.parse(JSON.stringify(item))
                if (item.avalibleQty > 0) {
                    vegitables[item.slug].quantity = [item.quantity]
                    vegitables[item.slug].mesure = [item.mesure]
                }
            }
            count = 1;
        }
    }


    if (count == 1) {

        return {
            props: { products: JSON.parse(JSON.stringify(vegitables)) }
        }

    } else {

        return {
            props: {}
        }
    }
}

export default vegitable