import React, { useState } from 'react'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
var jwt = require('jsonwebtoken');
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
import User from '../../models/User';
import Seller from '../../models/Seller';
import Link from 'next/link';


const Forgotpassworduser = () => {

    const [email, setEmail] = useState()


    const handlechange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
    }

    const handlesubmit = (e) => {

        e.preventDefault();

        const data = {
            email
        };

        const sendform = async () => {

            try {
                const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/forgotpassword-user`, data);
                // console.log(resp.data);

                setEmail('');

                toast.success('Check your email inbox.', {
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

                setEmail('');

                toast.error('Email does not exist!', {
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

    return (
        <div className='min-h-screen'>

            <Head>
                <title>Squiggiy - Fogot Password</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>


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


            <img src="/forgotpass.jpg" alt="" className='w-full h-full bg-cover bg-no-repeat absolute top-32 xxxs:top-28 xs:top-9 left-0 z-0 blur-sm' />


            <div className=" flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="/favicon.png" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Forgot password</h2>
                        <p className="mt-3 text-center text-sm text-black">
                            Or
                            <Link href="/user/login" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> Login</span></Link>
                        </p>

                        <p className="mt-3 text-center text-sm text-black">
                            If you are a seller then
                            <Link href="/seller/login" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> seller-login</span></Link>

                        </p>

                    </div>
                    <form onSubmit={handlesubmit} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <input value={email} onChange={handlechange} id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Email address" />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none ">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Continue
                            </button>
                        </div>
                    </form>
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

        // console.log("This is a Existing connection")
        // return global.mongoose.conn;
    } else {

        // console.log("This is a new connection")
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
    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    // console.log(user)
    if (user) {

        return {

            redirect: {
                permanent: false,
                destination: "/",
            },

            props: {}

        }
    } else if (!user && seller) {

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

export default Forgotpassworduser
