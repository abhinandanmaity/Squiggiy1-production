import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import mongoose from 'mongoose'
import Product from '../models/Product';
import { AiFillThunderbolt } from 'react-icons/ai';
import { BsCartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import { FcLike } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from 'nookies'
var jwt = require('jsonwebtoken');
import jsCookie from 'js-cookie';
import User from '../models/User';
import Seller from '../models/Seller'
import Wishlist from '../models/Wishlist'

import { Paper, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Image from 'next/image'
import { Fullscreen } from '@mui/icons-material'



const Home = ({ t, products }) => {

  // console.log(products)
  // console.log(t[0].email)

  const router = useRouter();

  const handlesubmit = (p) => {

    if (t != undefined) {

      const data = {
        userid: t[0].email, productid: p.slug, title: p.title, img: p.img, quantity: p.quantity, mesure: p.mesure, discount: p.discount, price: p.price
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
          // console.log(err);

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

  const pwishlist = (s) => {

    if (t != undefined) {

      let d = {
        email: t[0].email, productid: s
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

  return (

    <div>
      <Head>
        <title>Squiggiy</title>
        <meta name="description" content="Upp your fasion" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div>

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

        <Carousel sx={{

          // height: "350px"
        }}>
          {/* Change above line to <> and it work, maybe some issues in carousel */}
          <Paper>
            {/* <Typography>First Item</Typography> */}
            {/* <Button variant="outlined">Click me please!</Button> */}
            <Image src="/2-4.jpg" alt="" className='w-full h-1/2' width={1400} height={599} />

          </Paper>
          <Paper>
            {/* <Typography>Second Item</Typography> */}
            {/* <Button variant="outlined">Click me please!</Button> */}
            <Image src="/eCommerce-Website-Components-image-1024x660-min.jpg" alt="" className='w-full h-1/2' width={1400} height={599} />

          </Paper>
          <Paper>
            {/* <Typography>Third Item</Typography> */}
            {/* <Button variant="outlined">Click me please!</Button> */}
            <Image src="/order-placed-received-processing-concept-tiny-people-e-commerce-shopping-vector-illustration-set-online-booking-customer-216417607.jpg" alt="" className='w-full h-1/2' width={1400} height={599} />

          </Paper>
          <Paper>
            {/* <Typography>Third Item</Typography> */}
            {/* <Button variant="outlined">Click me please!</Button> */}
            <Image src="/buyonline.jpg" alt="" className='w-full h-1/2' width={1400} height={599} />

          </Paper>
        </Carousel>





        {/* <img src="/soshopimg2.jpg" alt="" className='w-full h-screen bg-no-repeat bg-cover ' /> */}


        <div className='' >

          {/* <span className="">fox ke ki ta</span> */}

          <div className="pb-16">
            <div className="bg-gray-100  flex flex-col justify-center items-center pt-9 sm:pt-12 lg:pt-16 pb-24 sm:pb-52">
              <div className="2xl:container 2xl:mx-auto flex flex-col justify-center items-center sm:pb-12 lg:pb-0 space-y-4 px-4 md:px-6 2xl:px-0">
                <div>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-9 text-center text-gray-800 ">Best Seller Products</p>
                </div>
                <div>
                  <p className="text-sm sm:text-base leading-normal sm:leading-none text-center text-gray-600 ">Explore products that are bought most frequently by people</p>
                </div>
              </div>
            </div>
            <div className="-mt-16 sm:-mt-48 lg:-mt-32 xl:-mt-40 2xl:container 2xl:mx-auto flex justify-center items-center space-y-4 px-4 md:px-6 2xl:px-0 mb-16">
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-between gap-x-6 gap-y-5">


                {Object.keys(products).map((item) => {

                  // console.log(similarproduct[item])

                  return (
                    <div key={products[item].slug} className="flex flex-col justify-center items-start px-1 py-2 bg-white cursor-pointer">

                      <div className="relative">

                        {/* <button onClick={() => { pwishlist(products[item].slug) }} className="top-1.5 left-1.5 absolute  text-pink-600 hover:text-pink-400 flex justify-center items-center bg-white rounded-full text-xs">
                          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-6" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                          </svg>
                        </button> */}

                        {/* {products[item].userid == "false" && <BsHeart className='top-1.5 left-1.5 absolute text-lg' onClick={() => { pwishlist(products[item].slug) }} />} */}

                        {/* {products[item].userid == "true" ? <FcLike className='top-1.5 left-1.5 absolute text-lg' onClick={() => { pwishlist(products[item].slug) }} /> : <BsHeart className='top-1.5 left-1.5 absolute text-lg' onClick={() => { pwishlist(products[item].slug) }} />} */}


                        {(products[item].userid == "false" || !t) && <BsHeart className='top-1.5 left-1.5 absolute text-lg' onClick={() => { pwishlist(products[item].slug) }} />}

                        {(products[item].userid == "true" && t) && <FcLike className='top-1.5 left-1.5 absolute text-lg' onClick={() => { pwishlist(products[item].slug) }} />}


                        <button onClick={() => { handlesubmit(products[item]) }} className="top-2 right-2 absolute p-0.5 text-gray-900 hover:text-gray-500 flex justify-center items-center bg-white  rounded-full">
                          <svg className="fill-stroke" width="15" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>

                        <Link href={`/product/${products[item].slug}`}><span>

                          <img className="rounded-t-lg w-56 h-44" src={products[item].img} alt="squiggiy" />

                          <div className="flex justify-between mt-5">
                            <div>
                              <p className="text-sm font-medium leading-none text-gray-800 ">{(products[item].title).slice(0, 38)}...</p>
                            </div>
                          </div>

                          <div className="flex justify-start pt-4">
                            <p className="text-xs xs:text-sm leading-none text-right text-gray-900 ">₹ {parseInt((products[item].price) - (((products[item].price) * products[item].discount) / 100))} <del className="text-xxs ml-2 font-extrathin"> {products[item].discount != 0 && ("₹" + (products[item].price).toString())}</del> <span className="text-xxs text-green-700" >{products[item].discount != 0 ? products[item].discount + "% off" : ''}</span></p>
                          </div>

                        </span></Link>

                      </div>
                    </div>
                  )

                })}


              </div>
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

  const token = cookies.token != "undefined" || cookies.token ? cookies.token : "";

  let t;
  // console.log(token)
  if (token) {

    try {

      t = jwt.verify(token, process.env.JWT_SECRET_KEY)

    } catch (err) {

    }
  }

  let products = await Product.find()
  let user = undefined, seller = undefined;
  if (t != undefined) {

    user = await User.find({ roll: "user", email: t.email })
    seller = await Seller.findOne({ roll: "seller", shopemail: t.email })
  }

  if (seller) {

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


  let prod = []

  for (let item of products) {

    if (item.discount >= 50) {
      prod.push(item)
    }
  }


  if (user) {

    // console.log(prod)
    for (let item in prod) {


      // console.log(similarproduct[item])

      let wish = await Wishlist.findOne({ productid: prod[item].slug, userid: user[0].email })

      // console.log(user[0].email)
      if (wish) {

        prod[item].userid = true
      } else {

        prod[item].userid = false
      }
      // console.log(wish)
    }
  }

  if (user == undefined || t == undefined) {

    return {
      props: { products: JSON.parse(JSON.stringify(prod)) }
    }
  } else {

    return {
      props: { t: JSON.parse(JSON.stringify(user)), products: JSON.parse(JSON.stringify(prod)) }
    }
  }
}


export default Home