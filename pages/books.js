import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from 'mongoose'
import Seller from '../models/Seller'
import jsCookie from 'js-cookie'
var jwt = require('jsonwebtoken')
import { parseCookies } from 'nookies'


const books = ({ products }) => {

    // console.log(products)

    return (
        <div>

            <Head>
                <title>Squiggiy - Books</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>



            <div className="min-h-screen py-12">


                <div className="flex flex-wrap justify-around">

                    {products && Object.keys(products).map((item) => {

                        return (

                            <div key={item._id} className=" xl:w-1/4 md:w-1/2 xs:w-1/2 p-8">
                                <div className=" bg-gray-100 p-2 rounded-md shadow-2xl ">
                                    <Link href={`/product/${products[item].slug}`}><a>
                                    <img className=" h-72 rounded-t-lg w-96 object-contain object-center mb-3" src={products[item].img} alt="squiggiy" />

                                        <div className="mx-10 items-start">

                                            <h2 className="sm:text-xs text-xxs text-gray-400 font-medium title-font pb-2">book</h2>
                                            <h2 className="sm:text-sm text-xs text-gray-900 font-medium title-font mb-2">{(products[item].title).slice(0, 38)}{(products[item].title) > 38 ? "..." : ""}</h2>


                                            {products[item].discount != 0 && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span> <del className="text-xs ml-2 font-extrathin">₹ {((products[item].price).toString())}</del>  <span className="text-green-500 text-xs">{products[item].discount}% off</span>
                                            </p>}

                                            {products[item].discount == 0 && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span>
                                            </p>}

                                            {products[item].discount == undefined && <p className=" text-black">₹ <span className="text-sm font-medium">{parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))}</span>
                                            </p>}

                                        </div>

                                    </a>
                                    </Link>

                                </div>
                            </div>

                        )
                    })}

                </div>

                {!products && <p className='text-center'>Product is not avalible</p> }
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

    let products = await Product.find({ category: 'books' })

    let book = {}
    let count = 0;

    for (let item of products) {

        // console.log(item.avalibleQty)

        if (item.avalibleQty > 0) {

            if (item.slug in book) {

                if (!book[item.slug].avalibleQty.includes(item.avalibleQty) && item.avalibleQty > 0) {
                    book[item.slug].avalibleQty.push(item.avalibleQty)
                }


            } else {
                book[item.slug] = JSON.parse(JSON.stringify(item))
                if (item.avalibleQty > 0) {
                    book[item.slug].avalibleQty = [item.avalibleQty]
                }
            }
            count = 1;
        }
    }


    if (count == 1) {

        return {
            props: { products: JSON.parse(JSON.stringify(book)) }
        }
    } else {

        return {
            props: {}
        }
    }
}


export default books