import React from 'react'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GiPotato } from 'react-icons/gi';
import { GiShoppingBag } from 'react-icons/gi';
import { GiMilkCarton } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import { parseCookies } from 'nookies'
import Seller from '../../models/Seller';
import Image from 'next/image'
import mypic from '../../public/soshopimg2.jpg'

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";


const Deleteproduct = ({ seller }) => {

    // console.log(seller)

    const [searchtitle, setSearchtitle] = useState('')

    const [sresult, setSresult] = useState(false)
    const [product, setProduct] = useState()
    const [manyproduct, setManyproduct] = useState()


    const handlechange = (e) => {

        if (e.target.name == 'searchtitle') {
            setSearchtitle(e.target.value);
        }
    }
    const handledelete = (id) => {


        const data = {
            id: id
        }

        const sendform = async () => {

            try {
                const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/deleteproduct`, data);

                // setSresult(true)
                setProduct()
                // console.log(resp.data.product.length)
                toast.success('Delete successfully', {
                    position: "bottom-center",
                    autoClose: 901,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            } catch (err) {

                toast.error('Check your internet connection', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };
        sendform();
    }

    const searchproduct = (e) => {
        e.preventDefault();

        // const axios = require('axios').default;

        const data = {
            userid: seller.shopemail, title: searchtitle
        }

        const sendform = async () => {

            try {
                const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/searchproduct`, data);


                // console.log(resp.data.product.length)

                setSresult(true)
                setProduct(resp.data.product)
                if (resp.data.product.length == undefined) {

                } else {

                    setManyproduct(true)
                }

            } catch (err) {
                // Handle Error Here
                // console.error(data);
                setSresult(false)
                setProduct()

                toast.error('product is unavalible', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        };
        sendform();
    }


    useEffect(() => {

    }, [sresult, product])

    return (

        <div>

            <Head>
                <title>Squiggiy - Delete Product</title>
                <meta name="description" content="Delete your products" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <FullLayout>

                    <div className='min-h-screen'>

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

                        {/* <Image src={mypic} width={1376} height={679} alt="" className='' /> */}

                        <img src="/bgupdateproduct.jpg" alt="" className='w-full h-screen bg-cover bg-no-repeat absolute top-14 sm:top-9 left-0 z-0 blur-sm' />

                        <div className="relative z-10">

                            <div className="pt-20 ">
                                <h1 className="flex items-center justify-center font-bold text-pink-600 text-xl lg:text-2xl">
                                    Delete your Products
                                </h1>
                            </div>

                            <div className="pt-14">

                                <div className="flex justify-center">

                                    <div className="mb-3 container mx-auto w-full sm:w-2/3 ">
                                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                                            <input value={searchtitle} onChange={handlechange} id="email-addressa" name="searchtitle" type="text" autoComplete="email" className="form-control relative flex-auto px-2.5 py-2 sm:px-3 sm:py-3 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l-lg transition ease-in-out m-0 outline-none text-sm" placeholder="Enter your product title" aria-label="Search" />

                                            <button onClick={searchproduct} className="px-4 py-1.5 sm:px-6 sm:py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded-r-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                    <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* product */}

                            {(product && sresult == true && manyproduct == true) && <div className="container mx-auto w-full sm:w-2/3">

                                <div className="pb-3 text-semibold text-cyan-700">Search Result</div>

                                {Object.keys(product).map((item) => {

                                    // console.log(item)
                                    // console.log(product[item])

                                    return (

                                        <div key={product[item]._id} className="bg-white py-3 mt-2 rounded-lg ">

                                            <div className='flex justify-between'>
                                                <span className='px-5 text-sm font-semibold'>{product[item].title}</span>

                                                <span className='px-5 text-sm'><span className='px-5 text-sm'>
                                                    {product[item].category == "all" ? "Grocery" : ""}
                                                    {product[item].category == "dairy" ? "Dairy" : ""}
                                                    {product[item].category == "veg" ? "Vegitable" : ""}
                                                    {product[item].category == "books" ? "Book" : ""}

                                                </span>

                                                    <span className="mx-2">
                                                        {product[item].quantity != 0 ? product[item].quantity : ' '} <span className='text-sm'>{product[item].category != 'books' ? product[item].mesure : ' '}</span>
                                                    </span>

                                                    <button onClick={() => { handledelete(`${product[item]._id}`) }} type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br outline-none focus:ring-cyan-300 font-mono rounded-lg text-sm px-4 py-1.5 text-center ml-2 mr-3 mb-2">Delete</button>

                                                </span>
                                            </div>

                                        </div>
                                    )
                                })}

                            </div>}

                        </div>


                    </div>

                </FullLayout>
            </ThemeProvider>
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
                destination: "/seller/login",
            },

            props: {}
        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let seller = await Seller.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

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
        props: { seller: JSON.parse(JSON.stringify(seller)) }
    }
}

export default Deleteproduct
