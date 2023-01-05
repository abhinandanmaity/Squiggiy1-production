import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from '../../models/User';
import Seller from '../../models/Seller';
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import { parseCookies } from 'nookies'
import Wishlist from '../../models/Wishlist';
import Product from '../../models/Product';
import { AiOutlineDelete } from 'react-icons/ai';

const Mywishlist = ({ t, product }) => {

    // console.log(product)
    const router = useRouter();

    const handlesubmit = (p) => {

        // e.preventDefault();

        if (t != undefined) {

            const data = {
                userid: t.email, productid: p.slug, title: p.title, img: p.img, qty: p.qty, mesure: p.mesure, discount: p.discount, price: p.price
            };
            // console.log(data)

            const sendform = async () => {

                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/additemcart`, data);
                    // console.log(resp.data);


                    toast.success('Successfully added', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });



                } catch (err) {
                    // Handle Error Here
                    // console.error(err);

                    if (err.response.data.e) {

                        toast.error('Already in your cart.', {
                            position: "bottom-center",
                            autoClose: 941,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    }
                    else {

                        toast.error('Product is Out of stock!', {
                            position: "bottom-center",
                            autoClose: 941,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                }
            };
            sendform();
        } else {
            router.push('/user/login');
        }

    }

    const handledeletewishlist = (p) => {

        // e.preventDefault();

        if (t != undefined) {

            const data = {
                productid: p.slug
            };
            // console.log(data)

            const sendform = async () => {

                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/deleteitemwishlist`, data);
                    // console.log(resp.data);


                    toast.success('Successfully delete', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } catch (err) {
                    // Handle Error Here
                    // console.error(err);

                    toast.error('Check your internet', {
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

        } else {
            router.push('/user/login');
        }

    }

    React.useEffect(() => {

    }, [product])
    return (

        <div>

            <Head>
                <title>Squiggiy - MyWishlist</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className=''>

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

                <div className="pb-16 min-h-screen">
                    <div className="bg-gray-100  flex flex-col justify-center items-center pt-9 sm:pt-12 lg:pt-16 pb-24 sm:pb-52">
                        <div className="2xl:container 2xl:mx-auto flex flex-col justify-center items-center sm:pb-12 lg:pb-0 space-y-4 px-4 md:px-6 2xl:px-0">
                            <div>
                                <p className="text-base sm:text-lg lg:text-xl font-semibold leading-9 text-center text-gray-800 ">Your Wishlist Products</p>
                            </div>
                        </div>
                    </div>



                    <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-center items-center space-y-4 px-4 md:px-6 2xl:px-0 mb-16">
                        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-between gap-x-6 gap-y-5">

                            {product && Object.keys(product).map((item) => {

                                // console.log(similarproduct[item])

                                return (
                                    <div key={product[item].slug} className="flex flex-col justify-center items-start px-2 bg-white cursor-pointer">

                                        <div className="relative">


                                            <AiOutlineDelete onClick={() => { handledeletewishlist(product[item]) }} className="top-2 left-2 absolute  text-gray-900 hover:text-gray-500 flex justify-center items-center bg-white rounded-full text-base" />

                                            <button onClick={() => { handlesubmit(product[item]) }} className="top-2 right-2 absolute p-0.5 text-gray-900 hover:text-gray-500 flex justify-center items-center bg-white  rounded-full">
                                                <svg className="fill-stroke" width="15" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <path d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>

                                            <Link href={`/product/${product[item].slug}`}>

                                                <span>

                                                    {/* {console.log(product[item].slug)} */}
                                                    <img className="rounded-t-lg w-56 h-44" src={product[item].img} alt="squiggiy" />

                                                    <div className="flex justify-between mt-4">
                                                        <div>
                                                            <p className="text-xs md:text-sm font-medium leading-none text-gray-800 ">{(product[item].title).slice(0, 38)}...</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs md:text-sm leading-none text-right text-gray-600 ">₹ {parseInt((product[item].price) - (((product[item].price) * product[item].discount) / 100))}<span className="text-green-600 text-xxs md:text-xs"> {product[item].discount != 0 ? product[item].discount + "% off" : ''}</span></p>
                                                        </div>
                                                    </div>

                                                </span></Link>

                                        </div>


                                    </div>
                                )

                            })
                            }


                        </div>
                    </div>

                    {!product && <div className='text-center'>

                        You have not any product in your wishlist
                    </div>}

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


    let wish = await Wishlist.find({ userid: t.email })



    // console.log(order)

    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })


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

    let p = {}
    let count = 0

    if (wish) {

        // console.log(item.products)
        for (const item in wish) {

            // console.log(wish[item])

            if (wish[item].productid) {

                let product = await Product.findOne({ slug: wish[item].productid })

                if (product) {

                    p[wish[item].productid] = JSON.parse(JSON.stringify(product))
                    count = 1;
                }

            }
        }
    }


    // console.log(p)

    if (count == 1) {

        return {
            props: { t: t, product: JSON.parse(JSON.stringify(p)) }
        }
    } else {

        return {
            props: { t: t }
        }
    }
}



export default Mywishlist