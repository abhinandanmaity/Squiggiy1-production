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
import Product from '../../models/Product'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";

const Updateproduct = ({ seller, product }) => {

    // console.log(product)

    const [searchtitle, setSearchtitle] = useState('')

    const [price, setPrice] = useState(product.price)
    const [discount, setDiscount] = useState(product.discount)
    const [avalibleQty, setAvalibleQty] = useState(0)
    const [sumaq, setSumaq] = useState(product.avalibleQty)
    const [uavalibleQty, setUavalibleQty] = useState()
    const [decs, setDecs] = useState(product.decs)
    const [img, setImg] = useState()
    const [profile, setProfile] = useState()
    const [loading, setLoading] = React.useState(false);


    // console.log(slug.id);

    const handlechange = (e) => {

        if (e.target.name == 'searchtitle') {
            setSearchtitle(e.target.value);
        }
        else if (e.target.name == 'discount') {
            setDiscount(e.target.value);
        }
        else if (e.target.name == 'decs') {
            setDecs(e.target.value);
        }
        else if (e.target.name == 'avalibleQty') {
            setAvalibleQty(e.target.value);
        }
        else if (e.target.name == 'uavalibleQty') {
            setUavalibleQty(e.target.value);
        }
        else if (e.target.name == 'price') {
            setPrice(e.target.value);
        }
    }


    const handleupload = (e) => {

        e.preventDefault();

        // const axios = require('axios').default;
        if(!profile || !profile.name || !profile.size){

            toast.error('Choose your file first', {
                position: "bottom-center",
                autoClose: 941,
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

            toast.error("File extension must be in jpg/png/jpeg", {
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

        const data = new FormData()
        data.append("file", profile)
        data.append('cloud_name', 'flyingbird')
        data.append('upload_preset', 'Squiggiy-P-upload');

        fetch('https://api.cloudinary.com/v1_1/flyingbird/image/upload', {

            method: 'POST',
            body: data
        })
            .then(r => r.json())
            .then((data) => {

                setProfile(data.secure_url)
                setLoading(false);
                // console.log(data)
                toast.success('image upload successfully', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch((err) => {

                // console.log(err)
                setLoading(false);
                toast.error('Check internet connection', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        // const axios = require('axios').default;

        let data;

        if (uavalibleQty == undefined) {

            let s = Number(sumaq) + Number(avalibleQty);

            // console.log(s)

            // console.log(img)
            if(img){

                data = {
                    userid: seller.shopemail, title: product.title, decs, avalibleQty: s, discount, price, id: product._id, img: profile
                }
            }else{
                
                    data = {
                        userid: seller.shopemail, title: product.title, decs, avalibleQty: s, discount, price, id: product._id, img: product.img
                    }
            }
        } else {

            if ((Number.isInteger(Number(uavalibleQty)))) {

                // console.log(img)
                if(img){

                    data = {
                        userid: seller.shopemail, title: product.title, decs, uavalibleQty: Number(uavalibleQty), discount, price, id: product._id, img: profile
                    }
                }else{

                    data = {
                        userid: seller.shopemail, title: product.title, decs, uavalibleQty: Number(uavalibleQty), discount, price, id: product._id, img: product.img
                    }
                }
            } else {

                toast.error('Check your input details.', {
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
        // console.log(data)


        if ((Number.isInteger(Number(avalibleQty))) && (Number.isInteger(Number(discount))) && (Number.isInteger(Number(price)))) {

            const sendform = async () => {

                try {
                    const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/updateproduct`, data);

                    setUavalibleQty();

                    toast.success('Successfully update', {
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
                    // console.error(data);

                    toast.error('Check your input details.', {
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

            toast.error('Check your input details.', {
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


    React.useEffect(() => {

        // console.log(img)
        // console.log(profile)
        // console.log(loading)
    }, [img, profile, loading])

    return (

        <div>

            <Head>
                <title>Squiggiy - Update-Product</title>
                <meta name="description" content="Squiggiy" />
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

                            {/* product */}

                            {product && <div className="container mx-auto w-full sm:w-2/3">

                                {/* {console.log(product)} */}
                                <div className="flex justify-start font-bold text-pink-600 text-base md:text-lg px-1 pt-7 pb-4">Product</div>

                                <form onSubmit={handlesubmit} className="bg-white shadow-2xl rounded px-8 pt-6 pb-9 mb-4" method="POST">
                                    <input type="hidden" name="remember" value="true" />

                                    <div className="rounded-md shadow-sm -space-y-px">
                                        <div className='mb-4'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                            <input value={decs} onChange={handlechange} id="email-addressa" name="decs" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm" placeholder="Description" />
                                        </div>

                                        <div className='pt-5'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>

                                            <div className="flex gap-1">

                                                {/* console.log(e.target.files[0]) */}
                                                <Button variant="contained" component="label"
                                                    className="text-sm"
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
                                                    Upload
                                                </LoadingButton>}

                                            </div>
                                        </div>

                                        <div className='mb-6 pt-1'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                            <input value={price} onChange={handlechange} id="email-addressa" name="price" type="text" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm" placeholder="Price" />
                                        </div>
                                        <div className='pt-5'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Discount (%)</label>
                                            <input value={discount} onChange={handlechange} id="email-addressa" name="discount" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm" placeholder="Discount" />
                                        </div>

                                        <div className='pt-5'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Avalible Qty (increase)</label>
                                            <input value={avalibleQty} onChange={handlechange} id="email-addressa" name="avalibleQty" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm" placeholder="Avalible Qty" />
                                        </div>

                                        <div className='pt-5'>
                                            <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">Avalible Qty (update)</label>
                                            <input value={uavalibleQty} onChange={handlechange} id="email-addressa" name="uavalibleQty" type="name" autoComplete="email" className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-xs sm:text-sm" placeholder="Update product avalible qty" />
                                        </div>

                                    </div>

                                    <div className="flex items-center justify-between py-6 mx-0.5">

                                        <button className="text-xs sm:text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" type="submit">
                                            Update
                                        </button>

                                    </div>

                                </form>
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

    // console.log(user)
    let id = context.query.id
    // console.log(id);

    let product = ""
    if (id) {
        try {

            product = await Product.findById({ _id: id })
        } catch (err) {

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

    } else {

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

    // console.log(product);
    // console.log(id);
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
        props: { seller: JSON.parse(JSON.stringify(seller)), product: JSON.parse(JSON.stringify(product)) }
    }
}

export default Updateproduct