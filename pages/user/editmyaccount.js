import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import axios from 'axios'
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from '../../models/User';
import Seller from '../../models/Seller';
import mongoose from 'mongoose'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import { parseCookies } from 'nookies'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'



const Editmyaccount = ({ user }) => {

    // console.log(user)
    let n = user.phone

    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(`${user.phone}`)
    const [pincode, setPincode] = useState(`${user.pincode}`)
    const [address, setAddress] = useState(user.address)
    const [state, setState] = useState(user.state)
    const [city, setCity] = useState(user.city)
    const [img, setImg] = useState()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = React.useState(false);

    const [d, setD] = useState(false)


    const handlechange = (e) => {

        if (e.target.name == 'name') {
            setShopname(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'state') {
            setState(e.target.value);
        }
        else if (e.target.name == 'city') {
            setCity(e.target.value);
        }
    }


    const handlesubmit = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;

        const data = [{
            _id: user._id, name, phone, pincode, address, img: profile, city, state
        }];

        // console.log(data)

        // console.log(p)
        if (d && (Number.isInteger(Number(phone))) && (Number.isInteger(Number(pincode)))) {

            const sendform = async () => {
                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/editmyaccount-user`, data);

                    setTimeout(() => {
                        Router.push(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/user/myaccount`)
                    }, 900);

                    toast.success('Your account has been Updated', {
                        position: "bottom-center",
                        autoClose: 901,
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
                        autoClose: 901,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            };
            sendform();


            setName('');
            setPhone('');
            setPincode('');
            setAddress('');
            setImg();

        } else {

            toast.error('Please check your input', {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }

    const handleupload = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;

        if (!profile || !profile.name || !profile.size) {

            toast.error("Choose your file first", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const fileSize = (profile.size / 1000)
        const fileExt = profile.name.split(".")[1].toLowerCase()

        if (fileSize > 1700) {

            toast.error("File size must be less than 1700kb", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!["jpg", "png", "jpeg"].includes(fileExt)) {

            toast.error("File extension must be in jpg or png", {
                position: "bottom-center",
                autoClose: 901,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setLoading(true);

        const data = new FormData();
        data.append("file", profile)
        data.append('cloud_name', 'flyingbird')
        data.append('upload_preset', 'Squiggiy-S-upload');

        fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

            method: 'POST',
            body: data
        })
            .then(r => r.json())
            .then((data) => {

                setProfile(data.secure_url)
                setLoading(false);
                toast.success('image upload successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // console.log(data)
            }).catch((err) => {

                setLoading(false);
                toast.error("Check internet connection", {
                    position: "bottom-center",
                    autoClose: 901,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    React.useEffect(() => {

        // console.log(img)
        // console.log(profile)
        // console.log(loading)
    }, [img, profile, loading])


    useEffect(() => {

        if (phone.length === 10 && pincode.length > 3) {
            setD(true)
        } else {
            setD(false)

        }
    }, [phone, pincode])


    return (

        <div>
            <Head>
                <title>Squiggiy - Edit Myaccount</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>

            <div className="container mx-auto w-full sm:w-2/3 my-8 min-h-screen py-12">

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

                <h2 className="font-bold flex justify-center">Update your Account</h2>

                <form onSubmit={handlesubmit} className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4" method="POST">
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='mb-4'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input value={name} onChange={handlechange} id="email-addressa" name="name" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Shop Name" />
                        </div>
                        
                        <div className='pt-5'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Profile photo</label>
                            <div className="flex gap-1">

                                {/* console.log(e.target.files[0]) */}
                                <Button variant="contained" component="label"
                                    className="text-sm bg-blue-500 text-white w-16 text-center h-8 p-2 rounded-lg"
                                    sx={{
                                        width: 20,
                                        height: 30,
                                        padding: 1
                                    }}>
                                    choose
                                    <input hidden accept="image/*" multiple type="file" onChange={(e) => {
                                        { e.target.files[0] && setImg(e.target.files[0].name) };
                                        setProfile(e.target.files[0])
                                        // console.log(e)
                                    }} />

                                </Button>
                                <input value={img} id="email-addressa" name="img" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="No file choose" />

                                {profile && <LoadingButton
                                    sx={{

                                        width: 20,
                                        height: 30,
                                        padding: 1
                                    }}
                                    size="small"
                                    onClick={handleupload}
                                    // endIcon={<SendIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    component="label"
                                >
                                    {!loading && "Upload"}
                                </LoadingButton>}

                                {!profile && <LoadingButton
                                    sx={{

                                        width: 20,
                                        height: 30,
                                        padding: 1
                                    }}

                                    size="small"
                                    // endIcon={<SendIcon />}
                                    loading={loading}
                                    loadingPosition="end"
                                    variant="contained"
                                    component="label"
                                    disabled
                                >
                                    upload
                                </LoadingButton>}

                            </div>
                        </div>

                        <div className='mb-6'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                            <input value={phone} onChange={handlechange} id="email-addressa" name="phone" type="text" autoComplete="email" required className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                            <textarea value={address} onChange={handlechange} id="email-addressa" name="address" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Address" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Pincode</label>
                            <input value={pincode} onChange={handlechange} id="email-addressa" name="pincode" type="text" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">City</label>
                            <input value={city} onChange={handlechange} id="email-addressa" name="city" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="City" />
                        </div>
                        <div className='pt-5'>
                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">State</label>
                            <input value={state} onChange={handlechange} id="email-addressa" name="state" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="State" />
                        </div>
                        
                    </div>

                    <div className="flex items-center justify-between py-6 mx-0.5">

                        <button className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Update
                        </button>

                    </div>

                </form>

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
        jsCookie.remove('token');
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
    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })
    // console.log(user)
    if (!user) {

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

    return {
        props: { user: JSON.parse(JSON.stringify(user)) }
    }
}


export default Editmyaccount
