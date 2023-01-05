import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router';
import { MdLibraryBooks } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import Seller from '../../models/Seller';
import Link from 'next/link';
import User from '../../models/User';


const Sellersingup = () => {

    const [shopname, setShopname] = useState('')
    const [shopemail, setShopemail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [delivery, setDelivary] = useState()
    const [pincode, setPincode] = useState()
    const [address, setAddress] = useState('')
    const [categories, setCategories] = useState('all')

    const [disable, setDisable] = useState('all')
    const [method_id, setMethod_id] = useState('')
    const [code, setCode] = useState('')
    const [verify, setVerify] = useState(true)
    const [hcode, setHcode] = useState('')
    const [vdis, setVdis] = useState(false)

    const [pvalidate, setPvalidate] = useState(true)
    const [nvalidate, setNvalidate] = useState(true)
    const [phvalidate, setPHvalidate] = useState(true)


    const handlechange = (e) => {

        if (e.target.name == 'shopname') {
            setShopname(e.target.value);
        }
        else if (e.target.name == 'shopemail') {
            setShopemail(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
        else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value);
        }
        else if (e.target.name == 'code') {
            setCode(e.target.value);
        }

        let n = shopname == undefined ? 0 : shopname.length;
        let p = password == undefined ? 0 : password.length;
        let ph = phone == undefined ? 0 : phone.length;


        if (n >= 1) {
            setNvalidate(true)
        }
        if (p >= 4) {
            setPvalidate(true)
        }
        if (ph == 9 && (Number.isInteger(Number(phone)))) {
            setPHvalidate(true)
        }
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        let n = shopname == undefined ? 0 : shopname.length;
        let p = password == undefined ? 0 : password.length;
        let ph = phone == undefined ? 0 : phone.length;

        if (n <= 0) {
            setNvalidate(false)
        }
        if (p <= 4) {
            setPvalidate(false)
        }
        if (ph != 10 && !(Number.isInteger(Number(phone)))) {
            setPHvalidate(false)
        }

        // const axios = require('axios').default;

        const data = {
            shopname, shopemail, phone, password, delivery, categories
        };

        // console.log(data)


        if (password == cpassword && pvalidate && nvalidate && phvalidate) {
            const sendform = async () => {
                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/seller-singup`, data);

                    jsCookie.set('token', resp.data.token, { expires: 16 });

                    setTimeout(() => {
                        Router.push(`${process.env.NEXT_PUBLIC_DOMEN_NAME}`)
                    }, 1080);

                    toast.success('Your account has been created', {
                        position: "bottom-center",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });


                } catch (err) {
                    // Handle Error Here
                    // console.error(err);

                    toast.error('Try! again with right cridential', {
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


            setShopname('');
            setShopemail('');
            setPhone('');
            setPassword('');
            setCpassword('');
            setDelivary('');
            setPincode('');
            setAddress('');
            setCategories('all');
        } else {

            toast.error('Check your input', {
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


    const refershvarient = (del) => {
        setDelivary(del);
        // console.log(delivery);

    }

    const handleclick = (e, cate) => {

        // console.log(cate)
        e.preventDefault();

        setCategories(cate);
        setDisable(cate);

        // console.log(categories.length);
    }


    const requestOTP = async (e) => {

        e.preventDefault();

        let n = shopname == undefined ? 0 : shopname.length;
        let p = password == undefined ? 0 : password.length;
        let ph = phone.length;

        if (n <= 0) {
            setNvalidate(false)
        }
        if (p <= 4) {
            setPvalidate(false)
        }
        if (ph != 10 && !(Number.isInteger(Number(phone)))) {
            setPHvalidate(false)
        }

        if (!shopemail) {

            toast.error('Email is required', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return
        }

        if (password === cpassword && pvalidate && nvalidate && phvalidate) {
            const sendform = async () => {
                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/request-opt-seller`, { shopemail })


                    setMethod_id(resp.data.email_id);
                    setHcode(resp.data.hashedotp);

                    toast.success('Check your email', {
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

                    toast.error('Try! another email, already exist', {
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
            toast.error('Check your input', {
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

    const verifyOTP = async (e) => {

        e.preventDefault();

        if (!method_id || !code) {
            return
        }
        const sendform = async () => {

            try {
                const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/verify-opt-seller`, { shopemail, shopname, code, hcode })

                setVerify(false);
                setVdis(true);

                toast.success('Otp verify successfully', {
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

                toast.error('Invalid otp', {
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

            {<><Head>
                <title>Squiggiy - Singup</title>
                <meta name="description" content="Upp your fasion" />
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

                    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <img className="mx-auto h-12 w-auto" src="/favicon.png" alt="Workflow" />
                                <h2 className="mt-6 text-center text-xl sm:text-3xl font-bold text-gray-900">Fill up for Seller Sign up </h2>
                                <p className="mt-3 text-center text-sm text-gray-800">
                                    Or
                                    <Link href="/seller/login" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> seller-login</span></Link>
                                </p>

                                <p className="mt-3 text-center text-sm text-gray-800">
                                    If you are a customer then
                                    <Link href="/user/singup" ><span className="cursor-pointer font-medium text-pink-600 hover:text-pink-500"> Sing up</span></Link>

                                </p>

                            </div>
                            <form onSubmit={handlesubmit} className="mt-8 space-y-6" method="POST">
                                <input type="hidden" name="remember" value="true" />
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">Shop Name</label>
                                        <input value={shopname} onChange={handlechange} id="email-addressa" name="shopname" type="name" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Shop Name" />
                                    </div>
                                    {!nvalidate && <p className="text-red-600 text-xxs mx-2 sm:text-xs pb-2">*  Shopname is Required</p>}
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">Shop Email address</label>
                                        <input value={shopemail} onChange={handlechange} id="email-addressq" name="shopemail" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Shop Email address" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="sr-only">Mobile No</label>
                                        <input value={phone} onChange={handlechange} id="phone" name="phone" type="text" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Mobile No" />
                                    </div>
                                    {!phvalidate && <p className="text-red-600 text-xxs mx-2 sm:text-xs pb-2">*  Phone no must have valid</p>}
                                    <div>
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input value={password} onChange={handlechange} id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Password" />
                                    </div>
                                    {!pvalidate && <p className="text-red-600 text-xxs mx-2 sm:text-xs pb-2">* Password must be more than 5</p>}
                                    <div>
                                        <label htmlFor="password" className="sr-only">Confirm Password</label>
                                        <input value={cpassword} onChange={handlechange} id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm" placeholder="Confirm Password" />
                                    </div>
                                    <div >

                                        <select value={delivery} onChange={(e) => { refershvarient(e.target.value) }} name="delivery" aria-placeholder="fuyhg" required className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm' placeholder='jkdfd'>
                                            <option className='text-gray-300' defaultValue={""} disabled selected hidden>Delivary Avalible Or Not</option>
                                            <option value={"yes"} >Yes</option>
                                            <option value={"no"}>No</option>
                                        </select>


                                    </div>
                                    <p className='pt-4 text-gray-500 text-sm sm:text-base'>What are you looking to sell on squiggiy ?</p>
                                    <div className='flex justify-around appearance-none rounded-none w-full px-3 py-3 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm'>

                                        <div className="pt-4">

                                            {disable === 'all' ? <button onClick={(e) => { handleclick(e, 'all') }} value={'all'} className="flex flex-col border rounded-md px-9 py-4 bg-pink-100 border-pink-400 " ><BiCategory className='mx-auto text-3xl pb-3 justify-center' />Groceries</button> : <button onClick={(e) => { handleclick(e, 'all') }} value={'all'} className="flex flex-col border border-gray-300 rounded-md px-9 py-4 bg-gray-200" ><BiCategory className='mx-auto text-3xl pb-3 justify-center' />Groceries</button>}
                                        </div>

                                        <div className="pt-4">
                                            {disable === 'books' ? <button onClick={(e) => { handleclick(e, 'books') }} value={'books'} className="flex flex-col border rounded-md px-9 py-4 bg-pink-100 border-pink-400 "><MdLibraryBooks className='mx-auto text-3xl pb-3 justify-center items-center' /> Only Books</button> : <button onClick={(e) => { handleclick(e, 'books') }} value={'books'} className="flex flex-col border border-gray-300 rounded-md px-9 py-4 bg-gray-200"><MdLibraryBooks className='mx-auto text-3xl pb-3 justify-center' /> Only Books</button>}
                                        </div>
                                    </div>



                                </div>


                                {method_id && <div className='flex justify-between'>


                                    <label htmlFor="password" className="sr-only">Confirm Password</label>
                                    <input value={code} onChange={handlechange} id="code" name="code" type="text" autoComplete="current-password" required className="w-4/6 appearance-none relative block px-3 py-1 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 text-xs sm:text-sm " placeholder="Otp" />
                                    <button disabled={vdis} onClick={verifyOTP} className='py-0.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400'>Verify</button>
                                </div>}

                                <div>
                                    {!method_id && <button onClick={requestOTP} type="click" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none ">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Request Otp
                                    </button>}

                                    {method_id && <button onClick={handlesubmit} disabled={verify} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:bg-pink-400">
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                            <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        Sign up
                                    </button>}
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
    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

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

export default Sellersingup