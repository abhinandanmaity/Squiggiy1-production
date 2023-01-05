import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import mongoose from 'mongoose'
import Product from '../../models/Product'
import Seller from '../../models/Seller'
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken');
import jsCookie from 'js-cookie';

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import Wishlist from '../../models/Wishlist'
import User from '../../models/User'


const Slug = ({ t, product, variants, similarproduct, seller, getseller }) => {

    // console.log(Object.keys(variants['45']).includes('mg'));
    // console.log(product)
    // console.log(variants)
    // console.log(similarproduct)
    // console.log(variants['2']['kg'])


    // const [qty, setQty] = useState(product.qty);
    const [quantity, setQuantity] = useState(product.quantity);
    const [mesure, setMesure] = useState(product.mesure);

    // const [pwishshow, setPwishshow] = useState(true);

    const router = useRouter();
    const { slug } = router.query;

    useEffect(() => {

        setQuantity(product.quantity)
        setMesure(product.mesure)

    }, [router.query])

    const refershvarient = (newqty, newmesure) => {

        let url = `http://localhost:3000/product/${variants[newqty][newmesure]['slug']}`
        router.push(url);

    }

    const handlesubmit = (e) => {

        e.preventDefault();

        if (getseller) {

            toast.error('Seller can not access cart', {
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

        if (t != undefined) {

            const data = {
                userid: t.email, productid: slug, title: product.title, img: product.img, qty: 1, mesure: product.mesure, quantity: product.quantity, discount: product.discount, price: product.price
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

    const buynowclick = () => {
        // let exmpt = ['/user/order-summaries', '/user/checkout']

        if (!t) {

            router.push('/user/login');

        } else if (getseller) {

            toast.error('Seller can not access buy', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {

            if (product.avalibleQty <= 0) {

                toast.error('Product is Out of stock!', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {

                jsCookie.set('bn_product', product.slug, { path: '/user/checkout' })
                // jsCookie.set(jsCookie.get('bn_product'), { expires: 1 })

                let url = '/user/checkout'
                window.location = url;
            }
        }

    }

    const wishlist = () => {
        // let exmpt = ['/user/order-summaries', '/user/checkout']

        if (getseller) {

            toast.error('Seller can not access wishlist', {
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

        if (t != undefined) {

            let d = {
                email: t.email, productid: slug
            }

            const sendform = async () => {

                try {
                    let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/addmywishlist`, d);
                    // console.log("jkf");
                    // setCart(undefined)

                    toast.success('Added in wishlist', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } catch (err) {

                    toast.error('Already in wishlist', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Handle Error Here
                    // console.error(err);
                }
            };
            sendform();
        } else {
            router.push('/user/login');
        }

    }

    const pwishlist = (s) => {

        if (getseller) {

            toast.error('Seller can not access wishlist', {
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

        if (t != undefined) {

            let d = {
                email: t.email, productid: s
            }

            const sendform = async () => {

                try {
                    let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/addmywishlist`, d);
                    // console.log("jkf");
                    // setCart(undefined)

                    toast.success('Added in wishlist', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                } catch (err) {

                    toast.error('Already in wishlist', {
                        position: "bottom-center",
                        autoClose: 941,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    // Handle Error Here
                    // console.error(err);
                }
            };
            sendform();

        }
    }

    // React.useEffect(() => {

    // }, [pwishshow])

    return (

        <div>

            <Head>
                <title>Squiggiy - Product</title>
                <meta name="description" content="Upp your fasion" />
                <link rel="icon" href="/favicon.png" />
            </Head>


            {getseller && getseller.roll == "seller" ?

                <ThemeProvider theme={theme}>
                    <FullLayout>
                        <div className="">
                            <section className="text-gray-600 body-font overflow-hidden">

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


                                <div className="container px-5 pt-24 mx-auto">
                                    <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                                        <img alt="squiggiy" className="h-85 rounded-t-lg  object-center mb-1 mx-5 w-99" src={product.img} />
                                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                            <h2 className="text-sm title-font text-gray-500 tracking-widest">SQUIGGIY</h2>

                                            {product.category == 'books' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title}</h1>}

                                            {product.category == 'all' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                            {product.category == 'veg' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                            {product.category == 'dairy' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                            <div className="flex mb-4">
                                                <span className="flex items-center">
                                                    <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                    <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                    <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                    <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                    <svg fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                                    </svg>
                                                    <span className="text-gray-800 ml-3">4 Reviews</span>
                                                </span>
                                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                                    <a className="text-gray-500">
                                                        <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                        </svg>
                                                    </a>
                                                    <a className="text-gray-500">
                                                        <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                        </svg>
                                                    </a>
                                                    <a className="text-gray-500">
                                                        <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>

                                            <div className="text-base sm:text-sm font-semibold pb-1">Product Details</div>
                                            <p className="leading-relaxed text-sm ">{product.decs.substr(0, 370)} <span className="text-sm text-pink-500 cursor-pointer"> All Details</span></p>

                                            {product.category == 'books' || <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                                <div className="flex item-center text-sm">
                                                    <p className="mr-3">Qty</p>

                                                    {Object.keys(variants).map((item) => {

                                                        return (

                                                            <div key={item.slug} className="text-xs">
                                                                {Object.keys(variants).includes(item) && Object.keys(variants[item]).includes(mesure) && <span onClick={() => { refershvarient(item, mesure) }} className='border border-gray-300 px-1.5 cursor-pointer'>{item}</span>}

                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                                <div className="flex ml-7 items-center">
                                                    <span className="mr-3 text-sm">Mesure</span>
                                                    <div className="relative">
                                                        <select value={mesure} onChange={(e) => { refershvarient(quantity, e.target.value) }} className="rounded border appearance-none border-gray-300 py-1 focus:outline-none  focus:ring-1 focus:ring-pink-200 focus:border-pink-500 text-xs pl-2 pr-6 ">

                                                            {variants[quantity] && Object.keys(variants[quantity]).includes('kg') && <option value={'kg'}>Kg</option>}

                                                            {variants[quantity] && Object.keys(variants[quantity]).includes('g') && <option value={'g'}>g</option>}

                                                            {variants[quantity] && Object.keys(variants[quantity]).includes('mg') && <option value={'mg'}>Mg</option>}

                                                            {variants[quantity] && Object.keys(variants[quantity]).includes('L') && <option value={'L'}>L</option>}

                                                            {variants[quantity] && Object.keys(variants[quantity]).includes('ml') && <option value={'ml'}>ml</option>}

                                                        </select>
                                                        <span className="absolute right-0 top-0 h-full w-9 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                            <svg fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                                <path d="M6 9l6 6 6-6"></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>}

                                            {/* <span className="title-font text-lg text-gray-900 ">₹ <span className="font-bold">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span> <del className="text-base ml-2 font-extrathin">{((product.price).toString())}</del>  <span className=" text-base text-green-500 font-medium">{product.discount}% off</span></span> */}

                                            {product.discount != 0 && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span> <del className="text-xs ml-2 font-extrathin">₹ {((product.price).toString())}</del>  <span className="text-green-600 text-xs">{product.discount}% off</span>
                                            </p>}

                                            {product.discount == 0 && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span>
                                            </p>}

                                            {product.discount == undefined && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span>
                                            </p>}

                                            {product.avalibleQty <= 0 && <div className='text-sm xs:text-base font-bold pt-3'>Out of stock!</div>}


                                            <div className=" pt-5 flex w-full ">

                                                <button onClick={handlesubmit} className="sm:text-sm text-xxs w-full flex justify-center ml-auto text-white bg-pink-500  px-6 hover:bg-pink-600 rounded mx-2 h-8 py-1"><BsCartFill className=" text-lg mx-1.5" />Add to cart</button>

                                                <button onClick={buynowclick} className="sm:text-sm text-xxs w-full flex justify-center ml-auto text-white bg-pink-500  px-6 hover:bg-pink-600 rounded h-8 py-1"><AiFillThunderbolt className=" text-xl" />Buy Now</button>

                                                <button onClick={wishlist} className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center text-pink-500 ml-4">
                                                    <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                    </svg>
                                                </button>

                                            </div>

                                        </div>
                                    </div>
                                </div>



                            </section >


                            <div>
                                <div className='container mx-auto w-max lg:w-2/3 pt-6'>

                                    <div className="text-base sm:text-sm font-semibold">Seller Details</div>

                                    <div className="flex justify-start py-4 flex-wrap space-y-1">
                                        <div className="text-sm ">
                                            Name: {seller.shopname}
                                        </div>
                                        <div className="text-sm md:px-7">
                                            Phone: {seller.phone}
                                        </div>

                                    </div>

                                    <div className="text-sm">Address: {seller.address}, {seller.city}, {seller.state}-{seller.pincode}</div>

                                    <div className="text-sm py-3">For any query you can contact with that details.</div>

                                </div>


                            </div>


                            {/* <div className="">jkwqew eiewu ewi ojeowi j oiewj oiew joijew odi ewo oi ewdo wqe oij ewoi joie woiewj doije  do ijqeo ij qweock djkjd cojojd </div> */}

                            <div className="bg-gray-100 pt-5 sm:pt-8 lg:pt-10 pb-24 sm:pb-48 mx-12">
                                <div>
                                    <p className="text-sm sm:text-base font-semibold leading-normal sm:leading-none  text-gray-900 ">Similar Products</p>
                                </div>
                            </div>
                            <div className="pb-6 ">

                                <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-between space-y-4 px-3 md:px-5 2xl:px-0 mb-16">
                                    <div className="grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-between gap-x-1 gap-y-6 container mx-auto w-full">

                                        {Object.keys(similarproduct).map((item) => {

                                            // console.log(similarproduct[item])

                                            if (item < 12 && similarproduct[item].slug != slug) {


                                                return (
                                                    <div key={similarproduct[item].slug} className="flex flex-col justify-center items-start px-1 py-2 bg-white cursor-pointer">

                                                        <div className="relative">

                                                            {/* <button onClick={() => { pwishlist(similarproduct[item].slug) }} className="top-1 right-1.5 absolute  text-pink-600 hover:text-pink-400 flex justify-center items-center bg-white  rounded-full text-xs">
                                                                <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-5" viewBox="0 0 24 24">
                                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                                </svg>
                                                            </button> */}

                                                            {(similarproduct[item].userid == "false" || !t) && <BsHeart className='top-1 right-1.5 absolute text-lg' onClick={() => { pwishlist(similarproduct[item].slug) }} />}

                                                            {(similarproduct[item].userid == "true" && t) && <FcLike className='top-1 right-1.5 absolute text-lg' onClick={() => { pwishlist(similarproduct[item].slug) }} />}

                                                            <Link href={`/product/${similarproduct[item].slug}`}><span>

                                                                <img className="rounded-t-lg w-56 h-44" src={similarproduct[item].img} alt="squiggiy" />

                                                                <div className="flex justify-between mt-5">
                                                                    <div>
                                                                        <p className="text-sm font-medium leading-none text-gray-800 ">{(similarproduct[item].title).slice(0, 38)}...</p>
                                                                    </div>
                                                                </div>

                                                                <div className="flex justify-start pt-4">
                                                                    <p className="text-xs xs:text-sm leading-none text-right text-gray-900 ">₹ {parseInt((similarproduct[item].price) - (((similarproduct[item].price) * similarproduct[item].discount) / 100))} <del className="text-xxs ml-2 font-extrathin"> {similarproduct[item].discount != 0 && ("₹" + (similarproduct[item].price).toString())}</del> <span className="text-xxs text-green-700" >{similarproduct[item].discount != 0 ? similarproduct[item].discount + "% off" : ''}</span></p>
                                                                </div>

                                                            </span></Link>

                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </FullLayout>
                </ThemeProvider>

                :
                <div className="">
                    <section className="text-gray-600 body-font overflow-hidden">

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


                        <div className="container px-5 pt-24 mx-auto">
                            <div className="lg:w-4/5 mx-auto flex flex-wrap justify-center">
                                <img alt="ecommerce" className="h-85 rounded-t-lg  object-center mb-1 mx-5 w-100" src={product.img} />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">SQUIGGIY</h2>

                                    {product.category == 'books' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title}</h1>}

                                    {product.category == 'all' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                    {product.category == 'veg' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                    {product.category == 'dairy' && <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{product.title} ({product.quantity} {product.mesure})</h1>}

                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <svg fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4 text-pink-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            <span className="text-gray-800 ml-3">4 Reviews</span>
                                        </span>
                                        <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                            <a className="text-gray-500">
                                                <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>

                                    <div className="text-base sm:text-sm font-semibold pb-1">Product Details</div>
                                    <p className="leading-relaxed text-sm">{product.decs.substr(0, 370)} <span className="text-sm text-pink-500 cursor-pointer"> All Details</span></p>

                                    {product.category == 'books' || <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                        <div className="flex item-center text-sm">
                                            <p className="mr-3">Qty</p>

                                            {Object.keys(variants).map((item) => {

                                                return (

                                                    <div key={item.slug} className="text-xs">
                                                        {Object.keys(variants).includes(item) && Object.keys(variants[item]).includes(mesure) && <span onClick={() => { refershvarient(item, mesure) }} className='border border-gray-300 px-1.5 cursor-pointer'>{item}</span>}

                                                    </div>
                                                )
                                            })}

                                        </div>
                                        <div className="flex ml-7 items-center">
                                            <span className="mr-3 text-sm">Mesure</span>
                                            <div className="relative">
                                                <select value={mesure} onChange={(e) => { refershvarient(quantity, e.target.value) }} className="rounded border appearance-none border-gray-300 py-0.5 focus:outline-none  focus:ring-1 focus:ring-pink-200 focus:border-pink-500 text-xs pl-2 pr-6 ">

                                                    {variants[quantity] && Object.keys(variants[quantity]).includes('kg') && <option value={'kg'}>Kg</option>}

                                                    {variants[quantity] && Object.keys(variants[quantity]).includes('g') && <option value={'g'}>g</option>}

                                                    {variants[quantity] && Object.keys(variants[quantity]).includes('mg') && <option value={'mg'}>Mg</option>}

                                                    {variants[quantity] && Object.keys(variants[quantity]).includes('L') && <option value={'L'}>L</option>}

                                                    {variants[quantity] && Object.keys(variants[quantity]).includes('ml') && <option value={'ml'}>ml</option>}

                                                </select>
                                                <span className="absolute right-0 top-0 h-full w-9 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                    <svg fill="none" stroke="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                                                        <path d="M6 9l6 6 6-6"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>}

                                    {/* <span className="title-font text-lg text-gray-900 ">₹ <span className="font-bold">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span> <del className="text-base ml-2 font-extrathin">{((product.price).toString())}</del>  <span className=" text-base text-green-500 font-medium">{product.discount}% off</span></span> */}

                                    {product.discount != 0 && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span> <del className="text-xs ml-2 font-extrathin">₹ {((product.price).toString())}</del>  <span className="text-green-600 text-xs">{product.discount}% off</span>
                                    </p>}

                                    {product.discount == 0 && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span>
                                    </p>}

                                    {product.discount == undefined && product.avalibleQty > 0 && <p className="pt-2 text-black">₹ <span className="text-sm font-medium">{parseInt((product.price) - (((product.price) * product.discount) / 100))}</span>
                                    </p>}

                                    {product.avalibleQty <= 0 && <div className='text-sm xs:text-base font-bold pt-3'>Out of stock!</div>}


                                    <div className=" pt-5 flex w-full ">

                                        <button onClick={handlesubmit} className="sm:text-sm text-xxs w-full flex justify-center ml-auto text-white bg-pink-500  px-6 hover:bg-pink-600 rounded mx-2 h-8 py-1"><BsCartFill className=" text-lg mx-1.5" />Add to cart</button>

                                        <button onClick={buynowclick} className="sm:text-sm text-xxs w-full flex justify-center ml-auto text-white bg-pink-500  px-6 hover:bg-pink-600 rounded h-8 py-1"><AiFillThunderbolt className=" text-xl" />Buy Now</button>

                                        <button onClick={wishlist} className="rounded-full w-10 h-10 bg-gray-100 p-0 border-0 inline-flex items-center justify-center text-pink-500 ml-4">
                                            <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                            </svg>
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </section >

                    <div>
                        <div className='container mx-auto w-max lg:w-2/3 pt-6'>

                            <div className="text-base sm:text-sm font-semibold">Seller Details</div>

                            <div className="flex justify-start py-4 flex-wrap space-y-1">
                                <div className="text-sm ">
                                    Name: {seller.shopname}
                                </div>
                                <div className="text-sm md:px-7">
                                    Phone: {seller.phone}
                                </div>
                            </div>

                            <div className="text-sm">Address: {seller.address}, {seller.city}, {seller.state}-{seller.pincode}</div>

                            <div className="text-sm py-3">For any query you can contact with that details.</div>

                        </div>


                    </div>

                    {/* <div className="">jkwqew eiewu ewi ojeowi j oiewj oiew joijew odi ewo oi ewdo wqe oij ewoi joie woiewj doije  do ijqeo ij qweock djkjd cojojd </div> */}

                    <div className="bg-gray-100 pt-5 sm:pt-8 lg:pt-10 pb-24 sm:pb-48 mx-12">
                        <div>
                            <p className="text-sm sm:text-base font-semibold leading-normal sm:leading-none  text-gray-900 ">Similar Products</p>
                        </div>
                    </div>
                    <div className="pb-6 ">

                        <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-between space-y-4 px-3 md:px-5 2xl:px-0 mb-16">
                            <div className="grid grid-cols-1 xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-between gap-x-1 gap-y-6 container mx-auto w-full">

                                {Object.keys(similarproduct).map((item) => {

                                    // console.log(similarproduct[item])

                                    if (item < 12 && similarproduct[item].slug != slug) {

                                        return (
                                            <div key={similarproduct[item].slug} className="flex flex-col justify-center items-start px-1 py-2 bg-white cursor-pointer">

                                                <div className="relative">

                                                    {/* <button onClick={() => { pwishlist(similarproduct[item].slug) }} className="top-1 right-1.5 absolute  text-pink-600 hover:text-pink-400 flex justify-center items-center bg-white  rounded-full text-xs">
                                                        <svg fill="currentColor" strokelinecap="round" strokelinejoin="round" strokewidth="2" className="w-4 h-5" viewBox="0 0 24 24">
                                                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                                        </svg>
                                                    </button> */}
                                                    {(similarproduct[item].userid == "false" || !t) && <BsHeart className='top-1 right-1.5 absolute text-lg' onClick={() => { pwishlist(similarproduct[item].slug) }} />}

                                                    {(similarproduct[item].userid == "true" && t) && <FcLike className='top-1 right-1.5 absolute text-lg' onClick={() => { pwishlist(similarproduct[item].slug) }} />}

                                                    <Link href={`/product/${similarproduct[item].slug}`}><span>

                                                        <img className="rounded-t-lg w-48 h-36" src={similarproduct[item].img} alt="squiggiy" />

                                                        <div className="flex justify-between mt-5">
                                                            <div>
                                                                <p className="text-sm font-medium leading-none text-gray-800 ">{(similarproduct[item].title).slice(0, 38)}...</p>
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-start pt-4">
                                                            <p className="text-xs xs:text-sm leading-none text-right text-gray-900 ">₹ {parseInt((similarproduct[item].price) - (((similarproduct[item].price) * similarproduct[item].discount) / 100))} <del className="text-xxs ml-2 font-extrathin"> {similarproduct[item].discount != 0 && ("₹" + (similarproduct[item].price).toString())}</del> <span className="text-xxs text-green-700" >{similarproduct[item].discount != 0 ? similarproduct[item].discount + "% off" : ''}</span></p>
                                                        </div>

                                                    </span></Link>

                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="border-b-2 border-gray-300 flex justify-between">
                        <span></span>
                        {/* 
                <span className="text-base pb-2 pr-3">View All &gt; </span> */}
                    </div>
                </div>
            }


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

    const token = cookies.token != "undefined" || cookies.token ? cookies.token : "";

    let t;
    // console.log(token)
    if (token) {

        try {

            t = jwt.verify(token, process.env.JWT_SECRET_KEY)

        } catch (err) {

        }
    }

    // console.log(context.query.slug)

    let product = await Product.findOne({ slug: context.query.slug })
    // console.log(product)
    // console.log(product.category)

    let similarproduct = await Product.find({ category: product.category })

    //find seller details
    let seller = await Seller.findOne({ shopemail: product.userid })
    let getseller = "";
    let user;

    if (t) {

        user = await User.findOne({ email: t.email })
        getseller = await Seller.findOne({ shopemail: t.email, roll: t.roll, resetToken: token, expireToken: { $gt: Date.now() } })
    }

    if (!product) {


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
    let variants = await Product.find({ title: product.title, category: product.category })
    // console.log(product)
    let qtymesureSlug = {}; // dummy obj:: {red: {XL: {slug: "Men's Tshirt"}}}

    for (let item of variants) {

        // console.log(Object.keys(qtymesureSlug).includes(item.qty.toString()))
        if (Object.keys(qtymesureSlug).includes(item.quantity.toString())) {

            qtymesureSlug[item.quantity][item.mesure] = { slug: item.slug }

            // qtymesureSlug[item.qty] = []
            // qtymesureSlug[item.qty].push(item.mesure) 

        } else {
            qtymesureSlug[item.quantity] = {}

            qtymesureSlug[item.quantity][item.mesure] = { slug: item.slug }
            // qtymesureSlug[item.qty][item.mesure] = {slug: item.slug}
        }

    }

    if (user) {

        for (let item in similarproduct) {


            // console.log(similarproduct[item])

            let wish = await Wishlist.findOne({ productid: similarproduct[item].slug, userid: user.email })

            if (wish) {

                similarproduct[item].userid = true
            } else {

                similarproduct[item].userid = false
            }
            // console.log(similarproduct[item])
        }
    }

    // console.log(qtymesureSlug)
    if (t != undefined) {
        return {
            props: { t: t, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(qtymesureSlug)), similarproduct: JSON.parse(JSON.stringify(similarproduct)), seller: JSON.parse(JSON.stringify(seller)), getseller: JSON.parse(JSON.stringify(getseller)) }
        }

    } else {
        return {
            props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(qtymesureSlug)), similarproduct: JSON.parse(JSON.stringify(similarproduct)), seller: JSON.parse(JSON.stringify(seller)), getseller: JSON.parse(JSON.stringify(getseller)) }
        }
    }
}

export default Slug
