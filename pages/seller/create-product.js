
import React from 'react'
import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
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
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'

import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";


const Createproduct = ({ user }) => {

  // console.log(user)

  const [title, setTitle] = useState('')
  const [decs, setDecs] = useState('')
  const [img, setImg] = useState()
  const [quantity, setQuantity] = useState(0)
  const [category, setCategory] = useState(user.categories)
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [avalibleQty, setAvalibleQty] = useState(0)
  const [disable, setDisable] = useState(user.categories)
  const [mesure, setMesure] = useState('kg')
  const [exdate, setExdate] = useState('')
  const [profile, setProfile] = useState()
  const [loading, setLoading] = React.useState(false);
  // const [dis, setDis] = useState(true)

  const handlechange = (e) => {

    if (e.target.name == 'title') {
      setTitle(e.target.value);
    }
    else if (e.target.name == 'decs') {
      setDecs(e.target.value);
    }
    else if (e.target.name == 'quantity') {
      setQuantity(e.target.value);
    }
    else if (e.target.name == 'discount') {
      setDiscount(e.target.value);
    }
    else if (e.target.name == 'avalibleQty') {
      setAvalibleQty(e.target.value);
    }
    else if (e.target.name == 'price') {
      setPrice(e.target.value);
    }
    else if (e.target.name == 'exdate') {
      setExdate(e.target.value);
    }
  }

  const handleclick = (e, cate) => {

    // console.log(cate)
    e.preventDefault();

    setCategory(cate);
    setDisable(cate);

    // console.log(categories.length);
  }

  const refershvarient = (del) => {

    setMesure(del);

  }


  const handleupload = (e) => {

    e.preventDefault();

    // const axios = require('axios').default;

    if (!profile || !profile.name || !profile.size) {

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
    data.append('upload_preset', 'Squiggiy-p-upload');

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



  const handlesubmit = (e) => {

    e.preventDefault();

    // const axios = require('axios').default;

    if (category === "dairy" && (mesure === "kg")) {

      toast.error('Check your quantity unit', {
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

    if ((category === "dairy" || category === "veg" || category === "all") && quantity <= 0) {

      toast.error('Quantity never be zero', {
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

    let dummy = title.toLowerCase();

    let a = 11111111111;
    let b = 999999999999984;

    dummy = dummy.replace(/\s+/g, '-') + Math.floor(a + (b - a) * Math.random() * Date.now()) + Math.floor(a + (b - a) * Math.random());

    const data = [{
      userid: user.shopemail, slug: dummy, title, decs, img: profile, quantity, mesure, avalibleQty, discount, price, category, exdate
    }]

    if (title.length != 0 && decs.length != 0 && quantity.length != 0 && price.length != 0 && avalibleQty.length != 0 && Number(discount) >= 0 && Number(discount) <= 100 && (Number.isInteger(Number(quantity))) && (Number.isInteger(Number(avalibleQty))) && (Number.isInteger(Number(discount))) && (Number.isInteger(Number(price)))) {

      const sendform = async () => {

        try {
          const resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/addproducts`, data);

          toast.success('Successfully added', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTitle('');
          setDecs('');
          setImg();
          setQuantity(0);
          setDiscount(0);
          setAvalibleQty(0);
          setPrice(0);
          setExdate('');
          setMesure('kg');


        } catch (err) {
          // Handle Error Here
          // console.log(err.response);

          if (err.response.data.e) {

            toast.error('Product already added', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          } else if (err.response.data.se) {

            toast.error('Complete your profile', {
              position: "bottom-center",
              autoClose: 941,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

          } else {

            toast.error('Please check your product details', {
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
  React.useEffect(() => {


  }, [mesure]);


  return (

    <div>

      <Head>
        <title>Squiggiy - Create Product</title>
        <meta name="description" content="Add your products" />
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

            <div className="mt-4">
              <h1 className="flex items-center justify-center font-bold text-pink-600 text-xl lg:text-2xl">
                Add your Products
              </h1>
            </div>
            <div className="container lg:p-10 mx-auto pt-9 px-2 xs:px-4">
              <div className="flex flex-col w-full px-0 mx-auto lg:flex-row">
                <div className="flex flex-col lg:w-full">
                  <h2 className="mb-4 font-bold md:text-xl text-heading ">Product Details
                  </h2>
                  <form className="justify-center w-full mx-auto" method="post">
                    <div className="">

                      <div className="space-x-0 lg:flex lg:space-x-4 pt-5">

                        <div className="w-full">
                          <label htmlFor="Email"
                            className="block mb-3 text-sm font-semibold text-gray-500">What are you choose for add ?</label>
                          {user.categories == 'all' ? <div className='flex justify-around flex-wrap appearance-none rounded-none w-full px-3 py-3 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm space-y-3 xs:space-y-0'>


                            {disable === 'all' ? <button onClick={(e) => { handleclick(e, 'all') }} value={'all'} className="flex flex-col border rounded-md px-9 py-4 bg-pink-100 border-pink-400 " ><GiShoppingBag className='mx-auto text-3xl pb-3 justify-center' />Groceries</button> : <button onClick={(e) => { handleclick(e, 'all') }} value={'all'} className="flex flex-col border border-gray-300 rounded-md px-9 py-4 bg-gray-200" ><GiShoppingBag className='mx-auto text-3xl pb-3 justify-center' />Groceries</button>}

                            {disable === 'veg' ? <button onClick={(e) => { handleclick(e, 'veg') }} value={'veg'} className="flex flex-col border rounded-md px-9 py-4 bg-pink-100 border-pink-400 "><GiPotato className='mx-auto text-3xl pb-3 justify-center' />Vegitable</button> : <button onClick={(e) => { handleclick(e, 'veg') }} value={'veg'} className="flex flex-col border border-gray-300 rounded-md px-9 py-4 bg-gray-200"><GiPotato className='mx-auto text-3xl pb-3 justify-center' />Vegitable</button>}

                            {disable === 'dairy' ? <button onClick={(e) => { handleclick(e, 'dairy') }} value={'dairy'} className="flex flex-col border rounded-md px-12 py-4 bg-pink-100 border-pink-400 "><GiMilkCarton className='mx-auto text-3xl pb-3 justify-center' />Dairy </button> : <button onClick={(e) => { handleclick(e, 'dairy') }} value={'dairy'} className="flex flex-col border border-gray-300 rounded-md px-12 py-4 bg-gray-200"><GiMilkCarton className='mx-auto text-3xl pb-3 justify-center' />Dairy </button>}

                          </div> : <div className='flex justify-around flex-wrap appearance-none rounded-none w-full px-3 py-3 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm space-y-3 xs:space-y-0'>


                            {disable === 'books' ? <button onClick={(e) => { handleclick(e, 'books') }} value={'books'} className="flex flex-col border rounded-md px-12 py-4 bg-pink-100 border-pink-400 " ><GiShoppingBag className='mx-auto text-3xl pb-3 justify-center' />Books</button> : <button onClick={(e) => { handleclick(e, 'books') }} value={'books'} className="flex flex-col border border-gray-300 rounded-md px-9 py-4 bg-gray-200" ><GiShoppingBag className='mx-auto text-3xl pb-3 justify-center' />Books</button>}

                          </div>}
                        </div>

                      </div>
                      <div className="space-x-0 lg:flex lg:space-x-4 mt-3">
                        <div className="w-full ">
                          <label htmlFor="Email"
                            className="block mb-3 text-sm font-semibold text-gray-500">Title</label>
                          <input required value={title} onChange={handlechange} name="title" type="text" placeholder="Title of your product"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                        </div>

                      </div>
                      <div className="mt-4">
                        <div className="w-full">
                          <label htmlFor="Address"
                            className="block mb-3 text-sm font-semibold text-gray-500">Description</label>
                          <textarea required value={decs} onChange={handlechange}
                            className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600"
                            name="decs" cols="20" rows="4" placeholder="Description of your product"></textarea>
                        </div>
                      </div>
                      <div className="space-x-0 lg:flex lg:space-x-4 mt-3">
                        <div className="w-full ">
                          <label htmlFor="Email"
                            className="block mb-3 text-sm font-semibold text-gray-500">Product Image</label>

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

                      </div>

                      {(category == 'dairy') || (category == 'books') || <>

                        <div className=" lg:flex lg:justify-between pt-3">
                          <div className="flex lg:w-1/2">
                            <div className="w-full ">
                              <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                Quantity</label>
                              <input required value={quantity} onChange={handlechange} name="quantity" type="text" placeholder="Quantity "
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />

                            </div>
                            <div className="pt-8">
                              <select value={mesure} onChange={(e) => { refershvarient(e.target.value) }} name="mesure" aria-placeholder="fuyhg" required className='appearance-none relative block w-full px-2 py-3 border-b-2 border-t-2 border-r-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm ' placeholder='jkdfd'>
                                <option value={"kg"}>kg</option>
                                <option value={"g"}>g</option>
                                <option value={"mg"}>mg</option>
                              </select>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Avalible Stock</label>
                            <input required value={avalibleQty} onChange={handlechange} name="avalibleQty" type="text" placeholder="Avalible amount"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>
                        </div>
                        <div className="space-x-0 lg:flex lg:space-x-4 pt-3">
                          <div className="w-full lg:w-1/2 ">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Price</label>
                            <input required value={price} onChange={handlechange} name="price" type="text" placeholder="Price"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>
                          <div className="w-full lg:w-1/2 ">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Discount (%)</label>
                            <input required value={discount} onChange={handlechange} name="discount" type="text" placeholder="Discount %"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>
                        </div>


                        {category == 'all' && <div className="space-x-0 lg:flex lg:space-x-4 mt-3">
                          <div className="w-full ">
                            <label htmlFor="Email"
                              className="block mb-3 text-sm font-semibold text-gray-500">Expire Date</label>
                            <input required value={exdate} onChange={handlechange} name="exdate" type="date" placeholder="Add your product image"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>

                        </div>}
                      </>}

                      {category == 'dairy' &&


                        <div className="space-x-0 lg:flex lg:space-x-4 pt-3">

                          <div className="flex lg:w-1/2">
                            <div className="w-full ">
                              <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                Quantity</label>
                              <input required value={quantity} onChange={handlechange} name="quantity" type="text" placeholder="Quantity "
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />

                            </div>
                            <div className="pt-8">
                              <select value={mesure} onChange={(e) => { refershvarient(e.target.value) }} name="mesure" aria-placeholder="fuyhg" required className='appearance-none relative block w-full px-2 py-3 border-b-2 border-t-2 border-r-2 border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-pink-500 focus:border-pink-500 focus:z-10 sm:text-sm' placeholder='jkdfd'>
                                <option ></option>
                                <option value={"L"}>L</option>
                                <option value={"ml"}>ml</option>

                              </select>
                            </div>
                          </div>

                          <div className="w-full lg:w-1/2 pl-0 lg:pl-4">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Avalible Stock</label>
                            <input required value={avalibleQty} onChange={handlechange} name="avalibleQty" type="text" placeholder="Avalible amount"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>

                          <div className="w-full lg:w-1/2 ">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Price</label>
                            <input required value={price} onChange={handlechange} name="price" type="text" placeholder="Price"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>

                          <div className="w-full lg:w-1/2 ">
                            <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                              Discount (%)</label>
                            <input required value={discount} onChange={handlechange} name="discount" type="text" placeholder="Discount %"
                              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                          </div>

                        </div>


                      }

                      {category == 'books' &&

                        <><div className="w-full ">
                          <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                            Avalible stock</label>
                          <input required value={avalibleQty} onChange={handlechange} name="avalibleQty" type="text" placeholder="Avalible amount"
                            className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                        </div>
                          <div className="space-x-0 lg:flex lg:space-x-4 pt-3">
                            <div className="w-full lg:w-1/2 ">
                              <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                Price</label>
                              <input required value={price} onChange={handlechange} name="price" type="text" placeholder="Price"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                            </div>
                            <div className="w-full lg:w-1/2 ">
                              <label htmlFor="Pincode" className="block mb-3 text-sm font-semibold text-gray-500">
                                Discount (%)</label>
                              <input required value={discount} onChange={handlechange} name="discount" type="text" placeholder="Discount %"
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-pink-600" />
                            </div>
                          </div></>

                      }




                      <div className="mt-4">
                        <button onClick={handlesubmit} className="disabled:bg-pink-400 w-full px-6 py-1 md:py-2 text-pink-50 bg-pink-600 hover:bg-pink-700 rounded">Add Product</button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
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
        destination: "/seller/singup",
      },

      props: {}

    }
  }

  return {
    props: { user: JSON.parse(JSON.stringify(user)) }
  }
}

export default Createproduct