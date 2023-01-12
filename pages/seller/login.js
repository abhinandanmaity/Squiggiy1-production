import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import Seller from '../../models/Seller';
import Link from 'next/link';
import User from '../../models/User';
var CryptoJS = require("crypto-js");


const Sellerlogin = () => {

    let bytes1;
    { jsCookie.get('sqg_myseller') != undefined ? bytes1 = CryptoJS.AES.decrypt(jsCookie.get('sqg_myseller'), `${process.env.COOKIES_SECRET_KEY}`).toString(CryptoJS.enc.Utf8) : "" }

    let bytes2;
    { jsCookie.get('sqg_mysp') != undefined ? bytes2 = CryptoJS.AES.decrypt(jsCookie.get('sqg_mysp'), `${process.env.COOKIES_SECRET_KEY}`).toString(CryptoJS.enc.Utf8) : "" }


    const [shopemail, setShopemail] = useState(jsCookie.get('sqg_myseller') != undefined ? bytes1 : "")
    const [password, setPassword] = useState(jsCookie.get('sqg_mysp') != undefined ? bytes2 : "")


    const handlesubmit = (e) => {

        e.preventDefault();

        const data = {
            shopemail, password
        };

        const sendform = async () => {

            try {
                const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/seller-login`, data);
                // console.log(resp.data);

                jsCookie.set('token', resp.data.token, { expires: 16 });

                setShopemail('');
                setPassword('');


                setTimeout(() => {

                    Router.push(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/myindex`)

                }, 1080);

                toast.success('Successfully loged in', {
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

                setShopemail('');
                setPassword('');

                toast.error('Invalid credential. Please try again.', {
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

    const handlechange = (e) => {

        if (e.target.name == 'shopemail') {
            setShopemail(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
    }

    const remembervarient = () => {

        let e = CryptoJS.AES.encrypt(shopemail, `${process.env.COOKIES_SECRET_KEY}`).toString()
        let p = CryptoJS.AES.encrypt(password, `${process.env.COOKIES_SECRET_KEY}`).toString()

        jsCookie.set('sqg_myseller', e, { expires: 33 })
        jsCookie.set('sqg_mysp', p, { expires: 33 })

    }

    return (

        <div className='min-h-screen'>

            {<><Head>
                <title>Squiggiy - Login</title>
                <meta name="description" content="Login your account" />
                <link rel="icon" href="/favicon.png" />
            </Head><div className="">

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

                    <img src="/white-podium-mockup-display-with-product-presentation-3d-rendering_41470-3963.jpg" alt="" className='w-full h-screen bg-cover bg-no-repeat absolute top-32 xxxs:top-28 xs:top-9 left-0 z-0 blur-sm' />

                    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img className="mx-auto h-12 w-auto" src="/favicon.png" alt="Workflow" />
                                <h2 className="mt-6 text-center text-xl sm:text-3xl font-bold text-gray-900">Login if already singup as a seller</h2>
                                <p className="mt-3 text-center text-sm text-gray-800">
                                    Or
                                    <Link href="/seller/singup" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> seller-singup</span></Link>
                                </p>
                                <p className="mt-3 text-center text-sm text-gray-800">
                                    If you are a customer then
                                    <Link href="/user/login" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> Login</span></Link>

                                </p>

                            </div>
                            <form onSubmit={handlesubmit} className="mt-8 space-y-6" action="#" method="POST">
                                <input type="hidden" name="remember" value="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">Shop Email address</label>
                                        <input value={shopemail} onChange={handlechange} id="email-address" name="shopemail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Shop Email address" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input value={password} onChange={handlechange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Password" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input onClick={remembervarient} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded" />
                                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                    </div>

                                    <div className="text-sm">
                                        <Link href="/seller/forgotpassword"><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> Forgot your password?</span></Link>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none ">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>



                </div></>}

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
        jsCookie.remove('token');
        return {
            props: {}
        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let seller = await Seller.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let user = await User.findOne({ roll: t.roll, email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    // console.log(user)
    if (seller) {

        return {

            redirect: {
                permanent: false,
                destination: "/seller/myindex",
            },

            props: {}

        }
    } else if (user && !seller) {

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

    return {
        props: {}
    }
}

export default Sellerlogin