import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MdOutlineRadioButtonChecked } from 'react-icons/md';
import User from '../../models/User';
import Seller from '../../models/Seller';
import jsCookie from 'js-cookie';
import { parseCookies } from 'nookies'
import mongoose from 'mongoose'
import Cart from '../../models/Cart';
import Product from '../../models/Product';
var jwt = require('jsonwebtoken');
import Script from 'next/script';
var CryptoJS = require("crypto-js");
import GooglePayButton from '@google-pay/button-react'
// import { google } from '@google-pay/api-client'


// const { googlePayClient } = window;

// const baseCardPaymentMethod = {
//   type: "CARD",
//   parameters: {
//     allowedCardNetworks: ["VISA", "MASTERCARD"],
//     allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"]
//   }
// };

// const googlePayBaseConfiguration = {
//   apiVersion: 2,
//   apiVersionMinor: 0,
//   allowedPaymentMethods: [baseCardPaymentMethod]
// };


const Checkout = ({ user, cart, product, outostock, seller }) => {


    let a = 33333333;
    let b = 99999999;

    let oid = Math.floor(Math.random() * Date.now() * (a + (b - a) * Math.random()));

    // console.log(user.address)
    // console.log(cart["63ad94037dd096969826471d"].userid)
    // console.log(seller)
    // console.log(seller.paytm_mid)
    // console.log(seller.paytm_mkey)
    // console.log(outostock)
    // console.log(product)
    // console.log(bn_product)
    const router = useRouter();

    const [email, setEmail] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState('')
    const [city, setcity] = useState('')
    const [state, setstate] = useState('')
    const [add, setAdd] = useState('seta')
    const [disable, setDisable] = useState('seta')
    const [pmethod, setPmethod] = useState('')
    const [buttond, setButtond] = useState('')
    const [validate, setValidate] = useState(false)

    const [checka, setChecka] = useState(false)


    const handlechange = (e) => {

        if (e.target.name == 'pincode') {
            setPincode(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'state') {
            setstate(e.target.value);
        }
        else if (e.target.name == 'city') {
            setcity(e.target.value);
        }


        // if (pincode.length >= 4 && address.length >= 11) {
        //     setValidate(true)
        // } else {
        //     setValidate(false)
        // }
    }


    const handleclick = (e, add) => {

        // console.log(cate)
        e.preventDefault();

        setAdd(add);
        setDisable(add);

        // console.log(categories.length);
    }

    const handlecheck = (e, pay) => {

        e.preventDefault();

        setPmethod(pay);
    }

    const handlek = () => {


        setButtond();

    }
    let to = 0;

    if (cart != undefined) {
        {
            Object.keys(cart).map((item) => {
                to += parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * (cart[item].qty));
            })
        }

    }


    const clearcart = () => {

        // console.log(data)
        // e.preventDefault();

        let data = {
            userid: user.email
        }
        const sendform = async () => {

            try {
                let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/deletecart`, data);
                // console.log("jkf");
                // setCart(undefined)

            } catch (err) {

                // Handle Error Here
                // console.error(err);
            }
        };
        sendform();

    }


    const checksaddandspin = () => {

        if (to == 0 && !product) {

            toast.error('Your must have one product to checkout', {
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

        if (outostock == 1) {

            toast.error('Check your cart, some product is out of stock', {
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

        let prev = "";

        {
            !product && Object.keys(cart).map((item) => {

                if (prev == "") {

                    prev = cart[item].userid
                }

                if (cart[item].userid != prev) {

                    toast.error('All product must be from same shop', {
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
            })
        }

        if (!user.phone) {

            toast.error('Try again, after complete your profile.', {
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

        if ((cart != undefined && Object.keys(cart).length != 0) || product) {

            if (!user.address || user.address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!user.pincode || user.pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {

                // let o = CryptoJS.AES.encrypt(oid, `${process.env.COOKIES_SECRET_KEY}`).toString()

                // let o = CryptoJS.AES.encrypt(oid.toString(), `${process.env.COOKIES_SECRET_KEY}`).toString()

                let data;
                {
                    !product ? data = {
                        cart, to, oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city, paymentstatus: 'Case on delivery'

                    } : data = {
                        cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city, paymentstatus: 'Case on delivery'
                    }
                }

                const sendform = async () => {

                    try {
                        // console.log("data")
                        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/initiateorder`, data);
                        // console.log(resp.data)

                        if (resp.data.id) {

                            // let url = `/user/order-summaries/?id=${resp.data.id}`
                            // window.location = url;

                            if (!product) {

                                clearcart();
                            } else {
                                jsCookie.remove('bn_product')
                            }
                            router.push(`/user/order-summaries/?id=${resp.data.id}`);

                        }

                    } catch (err) {

                        // // Handle Error Here
                        // console.log("error")
                        // console.log(err);

                        if (err.response.data.error) {

                            toast.error(err.response.data.error, {
                                position: "bottom-center",
                                autoClose: 941,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {

                            toast.error("Check your internet", {
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


                // router.push('/user/order-summaries');
            }
        } else {

            toast.error('Cart is empty', {
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

    const checknaddandnpin = () => {

        if (to == 0 && !product) {

            toast.error('Your must have one product to checkout', {
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

        if (outostock == 1) {

            toast.error('Check your cart, some product is out of stock', {
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

        let prev = "";

        {
            !product && Object.keys(cart).map((item) => {

                if (prev == "") {

                    prev = cart[item].userid
                }

                if (cart[item].userid != prev) {

                    toast.error('All product must be from same shop', {
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
            })
        }


        if (!user.phone) {

            toast.error('Try again, after complete your profile.', {
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

        if ((cart != undefined && Object.keys(cart).length != 0) || product) {

            if (!address || address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!pincode || pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;

            } else {


                let data;
                {
                    !product ? data = {
                        cart, to, oid, email: user.email, userphone: user.phone, address, pincode, state, city, paymentstatus: 'Case on delivery'
                    }
                        : data = {
                            cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address, pincode, state, city, paymentstatus: 'Case on delivery'
                        }
                }


                const sendform = async () => {

                    try {
                        // console.log("data")
                        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/initiateorder`, data);
                        // console.log(resp.data)

                        if (resp.data.id) {

                            if (!product) {

                                clearcart();
                            } else {
                                jsCookie.remove('bn_product')
                            }

                            router.push(`/user/order-summaries/?id=${resp.data.id}`);
                        }


                    } catch (err) {

                        // // Handle Error Here
                        // console.log("error")
                        // console.log(err);
                        if (err.response.data.error) {

                            toast.error(err.response.data.error, {
                                position: "bottom-center",
                                autoClose: 941,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {

                            toast.error("Check your internet", {
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

                // let o = CryptoJS.AES.encrypt(oid, `${process.env.COOKIES_SECRET_KEY}`).toString()
                // router.push('/user/order-summaries');
            }

        } else {

            toast.error('Cart is empty. Please build your cart', {
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

    const initiatepayment = async () => {


        if (to == 0 && !product) {

            toast.error('Your must have one product to checkout', {
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

        if (outostock == 1) {

            toast.error('Check your cart, some product is out of stock', {
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

        let txnToken;

        let prev = "";

        {
            !product && Object.keys(cart).map((item) => {

                if (prev == "") {

                    prev = cart[item].userid
                }

                if (cart[item].userid != prev) {

                    toast.error('All product must be from same shop', {
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
            })
        }


        if (!seller.paytm_mkey || !seller.paytm_mid) {

            toast.error('Paytm payment is not avalible for this product', {
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

        if (!user.phone) {

            toast.error('Try again, after complete your profile.', {
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

        if (disable === 'newa') {

            if (!address || address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!pincode || pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
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

        } else {

            if (!user.address || user.address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!user.pincode || user.pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
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
        }

        let data;

        {
            !product ? data = {
                cart, to, oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city, paytm_mid: seller.paytm_mid, paytm_mkey: seller.paytm_mkey
            }
                : data = {
                    cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city, paytm_mid: seller.paytm_mid, paytm_mkey: seller.paytm_mkey
                }
        }

        // console.log(data)
        if (disable === 'newa') {

            {
                !product ? data = {
                    cart, to, oid, email: user.email, userphone: user.phone, address, pincode, state, city, paytm_mid: seller.paytm_mid, paytm_mkey: seller.paytm_mkey
                }
                    : data = {
                        cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address, pincode, state, city, paytm_mid: seller.paytm_mid, paytm_mkey: seller.paytm_mkey
                    }
            }
        }

        // console.log(data.cart.title)

        // Object.keys(data.cart).map((item) => {
        //     console.log(`${data.cart[item].productid}`);
        // })

        // const sendform = async () => {

        //     try {
        //         // console.log("data")
        //         let txnRes = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/payment/pretransaction`, data);
        //         // console.log("success")
        //         console.log(txnRes.data.response.body);
        //         txnToken = txnRes.data.response.body.txnToken

        //     } catch (err) {

        //         // // Handle Error Here
        //         // console.log("error")
        //         // console.log(err);
        //     }
        // };
        // sendform();
        // console.log(txnToken)

        // console.log("data")

        let a = await fetch(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/payment/pretransaction`, {

            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let txnRes = await a.json()

        // console.log(txnRes.error)

        if (txnRes.error == 'Some product is out of stock, check your cart') {

            toast.error('Some product is out of stock, check your cart', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;

        } else if (txnRes.error == 'Some products are not servisable in your area') {

            toast.error('Some products are not servisable in your area', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        } else if (txnRes.error) {

            toast.error('Check your internet', {
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
        else {

            jsCookie.remove('bn_product')
        }

        // console.log(txnRes.response)
        // console.log(txnRes.error)
        if (txnRes.response) {

            txnToken = txnRes.response.txnToken
        } else {

            toast.error(txnRes.error, {
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

        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": oid, /* update order id */
                "token": txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": to /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    // console.log("notifyMerchant handler function called");
                    // console.log("eventName => ", eventName);
                    // console.log("data => ", data);
                }
            }
        };
        // console.log(config)


        // initialze configuration using init method 
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {

            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
            // console.log("init");
        }).catch(function onError(error) {
            // console.log("error => ", error);
            // console.log("init");
        });
    }

    let googlePayClient;

    const tokenizationSpecification = {
        type: "PAYMENT_GATEWAY",
        parameters: {
            gateway: "example",
            getwayMerchantId: "gatewayMerchantId"
        }
    };

    const cardPaymentMethod = {
        type: "CARD",
        tokenizationSpecification: tokenizationSpecification,
        parameters: {
            allowedCardNetworks: ["VISA", "MASTERCARD"],
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            billingAddressRequired: true,
            billingAddressParameters: {
                format: "FULL",
                phoneNumberRequired: true
            }
        }
    };

    const googlePayBaseConfiguration = {
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [cardPaymentMethod]
    };


    function onGooglePayLoaded() {

        googlePayClient = new google.payments.api.PaymentsClient({
            // environment: "TEST"
            environment: "PRODUCTION"
        });

        googlePayClient.isReadyToPay(googlePayBaseConfiguration)
            .then(function (response) {
                if (response.result) {

                    console.log("success")
                    //   createAndAddButton();

                } else {

                    console.log("Unable to pay using Google Pay")
                }
            })
            .catch(function (err) {

                console.error("Error determining readiness to use Google Pay: ", err);
            });
    }

    const initiatepayment_googlepay = async () => {


        // <GooglePayButton
        //     environment="TEST"
        //     paymentRequest={{
        //         apiVersion: 2,
        //         apiVersionMinor: 0,
        //         allowedPaymentMethods: [
        //             {
        //                 type: 'CARD',
        //                 parameters: {
        //                     allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        //                     allowedCardNetworks: ['MASTERCARD', 'VISA'],
        //                 },
        //                 tokenizationSpecification: {
        //                     type: 'PAYMENT_GATEWAY',
        //                     parameters: {
        //                         gateway: 'example',
        //                         gatewayMerchantId: 'exampleGatewayMerchantId',
        //                     },
        //                 },
        //             },
        //         ],
        //         merchantInfo: {
        //             merchantId: '12345678901234567890',
        //             merchantName: 'Demo Merchant',
        //         },
        //         transactionInfo: {
        //             totalPriceStatus: 'FINAL',
        //             totalPriceLabel: 'Total',
        //             totalPrice: '1',
        //             currencyCode: 'USD',
        //             countryCode: 'US',
        //         },
        //         shippingAddressRequired: true,
        //         callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        //     }}
        //     onLoadPaymentData={paymentRequest => {
        //         console.log('Success', paymentRequest);
        //     }}
        //     onPaymentAuthorized={paymentData => {
        //         console.log('Payment Authorised Success', paymentData)
        //         return { transactionState: 'SUCCESS' }
        //     }
        //     }
        //     onPaymentDataChanged={paymentData => {
        //         console.log('On Payment Data Changed', paymentData)
        //         return {}
        //     }
        //     }
        //     existingPaymentMethodRequired='false'
        //     buttonColor='white'
        //     buttonType='Buy'
        // />


        if (to == 0 && !product) {

            toast.error('Your must have one product to checkout', {
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

        if (outostock == 1) {

            toast.error('Check your cart, some product is out of stock', {
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

        let txnToken;

        let prev = "";

        {
            !product && Object.keys(cart).map((item) => {

                if (prev == "") {

                    prev = cart[item].userid
                }

                if (cart[item].userid != prev) {

                    toast.error('All product must be from same shop', {
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
            })
        }


        if (!seller.google_mname || !seller.google_mid) {

            toast.error('Google pay is not avalible for this product', {
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

        if (!user.phone) {

            toast.error('Try again, after complete your profile.', {
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

        if (disable === 'newa') {

            if (!address || address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!pincode || pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
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

        } else {

            if (!user.address || user.address.length < 6) {

                toast.error('Valid Address must be required', {
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
            if (!user.pincode || user.pincode.length < 3) {

                toast.error('Valid Pincode must be required', {
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
        }

        let data;
        {
            !product ? data = {
                cart, to, oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city
            }
                : data = {
                    cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address: user.address, pincode: user.pincode, state: user.state, city: user.city
                }
        }

        if (disable === 'newa') {

            {
                !product ? data = {
                    cart, to, oid, email: user.email, userphone: user.phone, address, pincode, state, city
                }
                    : data = {
                        cart: { product }, to: (parseInt((product.price) - (((product.price) * product.discount) / 100))), oid, email: user.email, userphone: user.phone, address, pincode, state, city
                    }
            }
        }


        let a = await fetch(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/payment/googlepay_pretransaction`, {

            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let txnRes = await a.json()

        // console.log(txnRes.error)

        if (txnRes.error == 'Some product is out of stock, check your cart') {

            toast.error('Some product is out of stock, check your cart', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;

        } else if (txnRes.error == 'Some products are not servisable in your area') {

            toast.error('Some products are not servisable in your area', {
                position: "bottom-center",
                autoClose: 941,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            return;
        } else if (txnRes.error) {

            toast.error('Check your internet', {
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
        else {

            jsCookie.remove('bn_product')
        }


        googlePayClient = new google.payments.api.PaymentsClient({
            // environment: "TEST"
            environment: "PRODUCTION"
        });

        const paymentDataRequest = Object.assign({}, googlePayBaseConfiguration)

        if (product) {

            paymentDataRequest.transactionInfo = {

                totalPriceStatus: "FINAL",
                totalPrice: (parseInt((product.price) - (((product.price) * product.discount) / 100))),
                currencyCode: "INR",
                countryCode: 'IN',
            };
        } else {

            paymentDataRequest.transactionInfo = {

                totalPriceStatus: "FINAL",
                totalPrice: to,
                currencyCode: "INR",
                countryCode: 'IN',
            };
        }

        paymentDataRequest.merchantInfo = {

            merchantId: seller.google_mid,
            merchantName: seller.google_mname
        };
        let d;
        googlePayClient.loadPaymentData(paymentDataRequest)
            .then(function (paymentData) {

                // console.log(paymentData.paymentMethodData
                // );
                d = {
                    paymentinfo: paymentData.paymentMethodData, oid
                }

                // console.log(d)
                const sendform = async () => {

                    try {

                        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api//payment/googlepay_posttransaction`, d);
                        // console.log(resp.data.order._id)

                        // if (resp.data.id) {

                        //     if (!product) {

                        //         clearcart();
                        //     } else {
                        //         jsCookie.remove('bn_product')
                        //     }

                        router.push(`/user/order-summaries/?id=${resp.data.order._id}`);

                    } catch (err) {

                        // // Handle Error Here
                        // console.log("error")
                        // console.log(err);
                        toast.error("Check your internet", {
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

            })
            .catch(function (err) {
                // console.log(err);

                toast.error('Check your payment details', {
                    position: "bottom-center",
                    autoClose: 941,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            });

    }




    return (

        <div>

            <Head>
                <title>Squiggiy - Checkout</title>
                <meta name="description" content="Upp your fasion" />
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
                <link rel="icon" href="/favicon.png" />

            </Head>

            <Script async src="https://pay.google.com/gp/p/js/pay.js" onload={onGooglePayLoaded} />

            <Script type="application/javascript" crossorigin="anonymous" src={`https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/${seller.paytm_mid}.js`} />


            <div className='pt-14 min-h-screen'>

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

                <h2 className='flex items-center justify-center font-bold pb-7 text-xl text-indigo-700'>Checkout</h2>

                <div className="space-y-3">

                    <div className="space-y-3">
                        {disable === 'seta' ? <button onClick={(e) => { handleclick(e, 'seta') }} value={'seta'} className="container mx-auto border border-pink-400 md:w-1/2 flex flex-col rounded-md px-28 py-9 bg-pink-100 items-center justify-center text-xs sm:text-sm"><span> {user.address},{user.pincode}</span></button> : <button onClick={(e) => { handleclick(e, 'seta') }} value={'seta'} className="container mx-auto border border-gray-300 md:w-1/2 flex flex-col rounded-md px-28 py-9 bg-gray-200 items-center justify-center text-xs sm:text-sm"><span> {user.address ? `${user.address} ,` : ""}  {user.pincode}</span></button>}

                        {disable === 'newa' ? <button onClick={(e) => { handleclick(e, 'newa') }} value={'newa'} className="container mx-auto border border-pink-400 md:w-1/2 flex flex-col rounded-md px-9 py-4 bg-pink-100 items-center justify-center text-xs sm:text-sm">Add a new address</button> : <button onClick={(e) => { handleclick(e, 'newa') }} value={'newa'} className="container mx-auto border border-gray-300 md:w-1/2 flex flex-col rounded-md px-9 py-4 bg-gray-200 items-center justify-center text-xs sm:text-sm">Add a new address</button>}

                    </div>

                    <div className="py-4 px-6 sm:px-24 flex flex-col lg:w-full">

                        {disable === 'newa' && <><h2 className="mb-4 font-bold md:text-xl text-heading ">Shipping Address
                        </h2><form className="justify-center w-full mx-auto" method="post" action>

                                <div className="">
                                    <div className="space-x-0 lg:flex lg:space-x-4 mt-3">
                                        <div className="w-full ">
                                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                                pincode</label>
                                            <input value={pincode} onChange={handlechange} name="pincode" type="text" placeholder="Pincode"
                                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-300" />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <div className="w-full">
                                            <label htmlFor="Address"
                                                className="block mb-3 text-sm font-semibold text-gray-500">Address</label>
                                            <textarea value={address} onChange={handlechange}
                                                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-300"
                                                name="address" cols="20" rows="4" placeholder="Address"></textarea>
                                        </div>
                                    </div>
                                    <div className="space-x-0 lg:flex lg:space-x-4">
                                        <div className="w-full lg:w-1/2">
                                            <label htmlFor="city"
                                                className="block mb-3 text-sm font-semibold text-gray-500">City</label>
                                            <input value={city} onChange={handlechange} name="city" type="text" placeholder="City"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-300" />
                                        </div>
                                        <div className="w-full lg:w-1/2 ">
                                            <label htmlFor="state" className="block mb-3 text-sm font-semibold text-gray-500">
                                                State</label>
                                            <input value={state} onChange={handlechange} name="state" type="text" placeholder="State"
                                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-300" />
                                        </div>
                                    </div>
                                </div>
                            </form></>}


                        <div className="">
                            <h1 className="text-base mb-9 pt-7 font-bold">2.  Choose your payment method</h1>

                            <div className="container mx-auto w-1/2 flex justify-between pt-3">

                                <div className=" space-y-16">
                                    {pmethod != 'netbank' ? <input onClick={(e) => { handlecheck(e, 'netbank') }}
                                        value={'netbank'} className='cursor-pointer flex flex-col mt-5' type="radio" name="pmethod" id="" /> : <MdOutlineRadioButtonChecked className='mt-4' value={'netbank'} onClick={(e) => { handlecheck(e, 'netbank') }} />}

                                    {/* {pmethod != 'googlepay' ? <input onClick={(e) => { handlecheck(e, 'googlepay') }}
                                        value={'googlepay'} className='cursor-pointer flex flex-col' type="radio" name="pmethod" id="" /> : <MdOutlineRadioButtonChecked value={'googlepay'} onClick={(e) => { handlecheck(e, 'googlepay') }} />} */}

                                    {pmethod != 'cod' ? <input onClick={(e) => { handlecheck(e, 'cod') }} value={'cod'} className='cursor-pointer flex flex-col' type="radio" name="pmethod" id="" /> : <MdOutlineRadioButtonChecked value={'cod'} onClick={(e) => { handlecheck(e, 'cod') }} />}

                                </div>

                                <p className="space-y-10">
                                    <span className="font-medium text-sm flex flex-col">
                                        <img src='/image_processing20210128-7750-jldwgy.gif' alt='squiggiy' className='w-32 h-16'></img>
                                    </span>

                                    {/* <span className="font-medium text-sm flex flex-col">
                                        <img src='/Screensh.png' alt='squiggiy' className='w-16 h-6'></img>
                                    </span> */}

                                    <span className="font-medium text-sm flex flex-col">
                                        Case on delivery
                                    </span>
                                </p>
                            </div>

                            <div className="py-7">
                                <div className="container mx-auto bg-pink-200 border border-pink-400 rounded-lg">

                                    <h2 className="text-base font-bold mx-4 my-2"> Review</h2>

                                    <ol className=" my-3 list-decimal mx-7 flex flex-wrap">

                                        {/* {Object.keys(cart).length == 0 &&

                                                <div className='text-base font-semibold'>Your cart is Empty.</div>} */}

                                        {!product && cart != undefined && Object.keys(cart).map((item) => {

                                            return (

                                                <div key={item.productid} className="text-sm my-2 mx-6">
                                                    <li className="space-x-3">

                                                        {cart[item].quantity > 0 && <span> {cart[item].title} ({cart[item].quantity} {cart[item].mesure})</span>}
                                                        {cart[item].quantity == 0 && <span> {cart[item].title}</span>}

                                                        <span className='font-medium'> Qty: </span>{cart[item].qty}</li>
                                                </div>
                                            )
                                        })}

                                        {product &&
                                            <div className="text-sm my-2 mx-6">
                                                <li className="space-x-3">

                                                    {product.quantity > 0 && <span> {product.title} ({product.quantity} {product.mesure})</span>}
                                                    {product.quantity == 0 && <span> {product.title}</span>}
                                                    <span className='font-medium'> Qty: 1</span></li>

                                            </div>
                                        }

                                    </ol>

                                    {!product && cart != undefined && pmethod === 'netbank' && <div className="mx-10 my-4">
                                        <button onClick={initiatepayment} className='px-2 py-0.5 bg-pink-600 text-pink-50 hover:bg-pink-700 rounded-md'><span className='text-sm'>Pay</span> <span className='text-xs'>₹ {to}</span></button>

                                    </div>}
                                    {/* {!product && cart != undefined && pmethod === 'googlepay' && <div className="mx-10 my-4">
                                        <button onClick={initiatepayment} className='px-2 py-0.5 bg-pink-600 text-pink-50 hover:bg-pink-700 rounded-md'><span className='text-sm'>Pay</span> <span className='text-xs'>₹ {to}</span></button>

                                    </div>} */}


                                    {(product && pmethod === 'netbank') && <div className="mx-10 my-4">
                                        <button onClick={initiatepayment} className='px-2 py-0.5 bg-pink-600 text-pink-50 hover:bg-pink-700 rounded-md'><span className='text-sm'>Pay</span> <span className='text-xs'>₹ {(parseInt((product.price) - (((product.price) * product.discount) / 100)))}</span></button>

                                    </div>}
                                    {/* {(product && pmethod === 'googlepay') && <div className="mx-10 my-4">
                                        <button onClick={initiatepayment_googlepay} className='px-2 py-0.5 bg-pink-600 text-pink-50 hover:bg-pink-700 rounded-md'><span className='text-sm'>Pay</span> <span className='text-xs'>₹ {(parseInt((product.price) - (((product.price) * product.discount) / 100)))}</span></button>

                                    </div>} */}

                                </div>
                            </div>



                            {pmethod == 'cod' && disable === 'newa' && <div className="mt-4">

                                <button onClick={checknaddandnpin}
                                    className=" w-full px-6 py-1 md:py-2 text-pink-50 bg-pink-600 hover:bg-pink-700 rounded">Place Order</button>

                            </div>}
                            {pmethod == 'cod' && disable === 'seta' && <div className="mt-4">

                                <button onClick={checksaddandspin}
                                    className=" w-full px-6 py-1 md:py-2 text-pink-50 bg-pink-600 hover:bg-pink-700 rounded">Place Order</button>

                            </div>}

                        </div>
                    </div>

                </div>
            </div>
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
    const bn_product = cookies.bn_product ? cookies.bn_product : "";

    let t;
    // console.log(t)

    try {
        t = jwt.verify(token, process.env.JWT_SECRET_KEY)

    } catch (err) {

        jsCookie.remove('token', { expires: 1 });

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

    // console.log(t)
    // console.log("kjdfjskjkdf")
    let user = await User.findOne({ email: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let seller = await Seller.findOne({ shopemail: t.email, resetToken: token, expireToken: { $gt: Date.now() } })

    let cart = await Cart.find({ userid: t.email, savelater: false })

    let product = await Product.findOne({ slug: bn_product })

    // console.log(cart.length)
    // console.log(cart)

    if ((cart.length <= 0 && !bn_product) || (!cart && !bn_product)) {

        let a = 11111111111121;
        let b = 999999999999984;

        return {

            redirect: {
                permanent: false,
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`
            },

            props: {}

        }

    } else if (!bn_product && !cart) {

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
    // console.log(user)
    if (!user) {

        jsCookie.remove('token');
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
                destination: `/${(a + (b - a) * Math.random())}#GFDF$${(a + (b - a) * Math.random())}&%#${(a + (b - a) * Math.random())}/?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}`
            },

            props: {}

        }
    }



    let carts = {}
    let outostock = 0

    for (let item of cart) {

        if (item._id in carts) {

            if (!carts[item._id]) {
                carts[item._id]
            }
        } else {

            carts[item._id] = JSON.parse(JSON.stringify(item))

            let pp = await Product.findOne({ slug: carts[item._id].productid })
            carts[item._id].userid = pp.userid

            if (pp) {

                seller = await Seller.findOne({ shopemail: pp.userid })
            }

            if (pp.avalibleQty < carts[item._id].qty) {

                outostock = 1;
            }
        }
    }


    if (product) {

        seller = await Seller.findOne({ shopemail: product.userid })
    }


    let bytes;
    let bytes2;
    let bytes3;
    let pp;
    let pp2;
    let pp3;

    if (seller) {

        if (seller.paytm_mid) {

            bytes = CryptoJS.AES.decrypt(seller.paytm_mid, `${process.env.CRYPTO_SECRET_KEY}`)
            pp = bytes.toString(CryptoJS.enc.Utf8)
            seller.paytm_mid = pp
        }
        if (seller.paytm_mkey) {

            bytes2 = CryptoJS.AES.decrypt(seller.paytm_mkey, `${process.env.CRYPTO_SECRET_KEY}`)
            pp2 = bytes2.toString(CryptoJS.enc.Utf8)
            seller.paytm_mkey = pp2
        }
        if (seller.google_mid) {

            bytes3 = CryptoJS.AES.decrypt(seller.google_mid, `${process.env.CRYPTO_SECRET_KEY}`)
            pp3 = bytes3.toString(CryptoJS.enc.Utf8)
            seller.google_mid = pp3
        }
    }

    if (product) {

        return {
            props: { user: JSON.parse(JSON.stringify(user)), cart: JSON.parse(JSON.stringify(carts)), product: JSON.parse(JSON.stringify(product)), bn_product: bn_product, outostock: outostock, seller: JSON.parse(JSON.stringify(seller)) }
        }
    } else {

        return {
            props: { user: JSON.parse(JSON.stringify(user)), cart: JSON.parse(JSON.stringify(carts)), outostock: outostock, seller: JSON.parse(JSON.stringify(seller)) }
        }
    }

}


export default Checkout