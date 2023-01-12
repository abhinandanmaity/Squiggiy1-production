import React from 'react'
import Head from 'next/head'
import Router from 'next/router';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken')
import mongoose from 'mongoose'
import jsCookie from 'js-cookie'
import { FiEdit } from 'react-icons/fi'
import Link from 'next/link'
import Seller from '../../models/Seller'
var CryptoJS = require("crypto-js");

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";


const myaccount = ({ user }) => {

    // console.log(user.address);

    const referce = () => {
        Router.push(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/editmyaccount`)
    }

    return (

        <div>

            <Head>
                <title>Squiggiy - MyAccount</title>
                <meta name="description" content="Your account" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <ThemeProvider theme={theme}>
                <FullLayout>
                    <div className="">

                        <div className="bg-gray-100">
                            <div className="w-full text-white ">
                                <div x-data="{ open: false }"
                                    className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
                                    <div className="p-4 flex flex-row items-center justify-between">
                                        <a href="#"
                                            className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">example
                                            profile</a>
                                        <button className="md:hidden rounded-lg focus:outline-none focus:shadow-outline" click="open = !open">
                                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                                                <path x-show="!open" fillRule="evenodd"
                                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                                                    clipRule="evenodd"></path>
                                                <path x-show="open" fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"></path>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                            </div>


                            <div className="container mx-auto my-5 p-5">
                                <div className="md:flex md:-mx-2 space-x-0 md:space-x-14">

                                    <div className="w-full md:w-3/12 md:mx-2 ">

                                        <div className="bg-white p-3 border-t-4 border-green-400">
                                            <div className="image overflow-hidden">
                                                {user.img && <img className="h-auto w-full mx-auto"
                                                    src={user.img}
                                                    alt="" />}
                                                {!user.img && <img className="h-auto w-full mx-auto"
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfzFSoX0rAp-FK7Q_E3OUizJxtzWQ6NzrfDeOClBdino8KyD_F7lNL833MMPegqFpJoyU&usqp=CAU'
                                                    alt="" />}
                                            </div>
                                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user.name}</h1>
                                            <ul
                                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                                <li className="flex items-center py-3">
                                                    <span>Status</span>
                                                    <span className="ml-auto"><span
                                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                                </li>
                                                <li className="flex items-center py-3">
                                                    <span>Member since</span>
                                                    <span className="ml-auto">{(user.createdAt).slice(0, 10)}</span>
                                                </li>
                                            </ul>
                                        </div>





                                    </div>

                                    <div className="w-full md:w-9/12 mx-2">


                                        <div className="bg-white p-3 shadow-md rounded-sm">
                                            <div className="flex items-center justify-between font-semibold text-gray-900 leading-8 py-2">

                                                <p className='flex items-center space-x-2'>
                                                    <span clas="text-green-500">
                                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                            stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </span>
                                                    <span className="tracking-wide">About</span>

                                                </p>

                                                <div onClick={referce} className="cursor-pointer pr-7">
                                                    <FiEdit className='text-xl' />
                                                </div>
                                            </div>
                                            <div className="text-gray-700 ">
                                                <div className="grid md:grid-cols-2 text-sm">
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Name</div>
                                                        <div className="px-4 py-2">{user.shopname}</div>
                                                    </div>

                                                    {user.phone != undefined && <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                        <div className="px-4 py-2">{user.phone}</div>
                                                    </div>}
                                                    <div className="grid grid-cols-2">
                                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                                        <div className="px-4 py-2 ">
                                                            <a className="text-blue-800" href={`mailto:${user.shopemail}`}>{(user.shopemail).slice(0, 10)}...</a>
                                                        </div>
                                                    </div>



                                                </div>
                                                {user.pincode != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Pincode.</div>
                                                    <div className="px-4 py-2">{user.pincode}</div>
                                                </div>}

                                                {user.address != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Address</div>
                                                    <div className="px-4 py-2">{user.address}</div>
                                                </div>}

                                                {user.state != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">State</div>
                                                    <div className="px-4 py-2">{user.state}</div>
                                                </div>}

                                                {user.city != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">City</div>
                                                    <div className="px-4 py-2">{user.city}</div>
                                                </div>}

                                                {user.paytm_mkey != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Paytm Mkey</div>
                                                    <div className="px-4 py-2">
                                                        {user.paytm_mkey}
                                                        </div>
                                                </div>}

                                                {user.paytm_mid != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Paytm Mid</div>
                                                    <div className="px-4 py-2">
                                                    {user.paytm_mid}
                                                        </div>
                                                </div>}


                                                {user.google_mid != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Google Mid</div>
                                                    <div className="px-4 py-2">
                                                    {user.google_mid}
                                                        </div>
                                                </div>}
                                                {user.google_mname != undefined && <div className="grid grid-cols-2 text-sm">
                                                    <div className="px-4 py-2 font-semibold">Google Mname</div>
                                                    <div className="px-4 py-2">
                                                    {user.google_mname}
                                                        </div>
                                                </div>}

                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>


                        </div>

                    </div>

                </FullLayout>
            </ThemeProvider>
        </div >
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

            redirect: {
                permanent: false,
                destination: "/seller/login",
            },

            props: {}

        }
    }

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let user = await Seller.findOne({ roll: t.roll, shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    // console.log(user)
    if (!user) {

        jsCookie.remove('token');
        return {

            redirect: {
                permanent: false,
                destination: "/seller/login",
            },

            props: {}

        }
    }

    let bytes;
    let bytes2;
    let bytes3;
    let pp;
    let pp2;
    let pp3;

    if (user) {


        if (user.paytm_mid) {

            bytes = CryptoJS.AES.decrypt(user.paytm_mid, `${process.env.CRYPTO_SECRET_KEY}`)
            pp = bytes.toString(CryptoJS.enc.Utf8)
            user.paytm_mid = pp
        }
        if (user.paytm_mkey) {

            bytes2 = CryptoJS.AES.decrypt(user.paytm_mkey, `${process.env.CRYPTO_SECRET_KEY}`)
            pp2 = bytes2.toString(CryptoJS.enc.Utf8)
            user.paytm_mkey = pp2
        }
        if (user.google_mid) {

            bytes3 = CryptoJS.AES.decrypt(user.google_mid, `${process.env.CRYPTO_SECRET_KEY}`)
            pp3 = bytes3.toString(CryptoJS.enc.Utf8)
            user.google_mid = pp3
        }

    }


    return {
        props: { user: JSON.parse(JSON.stringify(user)) }
    }
}


export default myaccount
