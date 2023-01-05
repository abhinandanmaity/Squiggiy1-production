import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router';
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'
import Seller from '../../../models/Seller';
import mongoose from 'mongoose';
var jwt = require('jsonwebtoken');

const Resetpasswordseller = () => {


    const router = useRouter();
    const { resetpasswordseller } = router.query;
    // console.log(resetpassworduser);

    const [newpassword, setNewpassword] = useState()
    const [cpassword, setCpassword] = useState()

    const [pvalidate, setPvalidate] = useState(false)

    const handlesubmit = (e) => {

        e.preventDefault();
        const token = resetpasswordseller;
        // console.log(newpassword)

        let p = newpassword == undefined ? 0 : newpassword.length;

        if (p <= 4) {
            setPvalidate(false)
        }

        if (!pvalidate) {

            toast.error('password atleast 5 digit', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        }

        const data = {
            newpassword, token
        };

        if (newpassword == cpassword && pvalidate) {

            const sendform = async () => {

                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/resetpassword-seller`, data);
                    // console.log(resp.data);

                    setNewpassword('');
                    setCpassword('');


                    setTimeout(() => {

                        Router.push(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/seller/login`)

                    }, 1000);

                    toast.success('Password update successfully', {
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

                    setNewpassword('');
                    setCpassword('');

                    toast.error('Linked has been expired', {
                        position: "bottom-center",
                        autoClose: 1000,
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

            toast.error('password does not match', {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const handlechange = (e) => {

        if (e.target.name == 'newpassword') {
            setNewpassword(e.target.value);
        }
        else if (e.target.name == 'cpassword') {
            setCpassword(e.target.value);
        }

    }


    useEffect(() => {

        let p = newpassword == undefined ? 0 : newpassword.length;

        console.log(newpassword);
        if (p > 4) {
            setPvalidate(true)
        }

        if (p <= 4) {
            setPvalidate(false)
        }

    }, [pvalidate, newpassword])

    return (

        <div className='min-h-screen'>

            {
                <>

                    <Head>
                        <title>Squiggiy - Reset Password</title>
                        <meta name="description" content="Upp your fasion" />
                        <link rel="icon" href="/favicon.png" />
                    </Head>

                    <div className="">

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
                            pauseOnHover />

                        <img src="/teamwork-thinking-creative.jpg" alt="" className='w-full h-full bg-cover bg-no-repeat absolute top-32 xxxs:top-28 xs:top-9 left-0 z-0 blur-sm' />

                        <div className="min-h-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 ">
                            <div className="max-w-md w-full space-y-8 relative z-10">
                                <div>
                                    <img className="mx-auto h-12 w-auto" src="/favicon.png" alt="Workflow" />
                                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Reset Password</h2>


                                </div>
                                <form onSubmit={handlesubmit} className="mt-8 space-y-6" action="#" method="POST">
                                    <input type="hidden" name="remember" value="true" />
                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div>
                                            <label htmlFor="email-address" className="sr-only">New Password</label>
                                            <input value={newpassword} onChange={handlechange} id="newpassword" name="newpassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="New Password" />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="sr-only">Confirm Password</label>
                                            <input value={cpassword} onChange={handlechange} id="cpassword" name="cpassword" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                                        </div>
                                    </div>

                                    <div>
                                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none ">
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <svg className="h-5 w-5 text-pink-500 group-hover:text-pink-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            Update
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



    // console.log(context.query.resetpassworduser);

    const cookie = context.query.resetpasswordseller

    const token = cookie;

    let t;
    console.log(token)
    // console.log(process.env.JWT_SECRET_KEY)

    if (token) {

        try {
            t = jwt.verify(token, process.env.JWT_SECRET_KEY)

        } catch (err) {

            let a = 1111223134;
            let b = 9994738984;

            return {

                redirect: {
                    permanent: false,
                    destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`,
                },

                props: {}

            }
        }

        // console.log(t)
        // console.log("kjdfjskjkdf")
        let user = await Seller.findOne({ presetToken: token, pexpireToken: { $gt: Date.now() } })

        // console.log(user)
        if (!user) {

            let a = 1111223134;
            let b = 9994738984;

            return {

                redirect: {
                    permanent: false,
                    destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`,
                },

                props: {}

            }
        }
    }



    return {
        props: {}
    }
}

export default Resetpasswordseller