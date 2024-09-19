import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GrCart } from 'react-icons/gr';
import { MdDeleteOutline } from 'react-icons/md';
import { RiSave3Line } from 'react-icons/ri';
import { AiFillSchedule } from 'react-icons/ai';
import { GrAddCircle } from 'react-icons/gr';
import { GrSubtractCircle } from 'react-icons/gr';
import { MdAccountCircle } from 'react-icons/md';
import { parseCookies } from 'nookies'
import Seller from '../../models/Seller';
import User from '../../models/User';
var jwt = require('jsonwebtoken')
import axios from 'axios';


// {/* <style>
// {` /* width */
//   #scroll:: -webkit - scrollbar {
//     width: 1px;
//   }

//   /* Track */
//   #scroll:: -webkit - scrollbar - track {
//     background: #f1f1f1;
//   }

//   /* Handle */
//   #scroll:: -webkit - scrollbar - thumb {
//     background: rgb(133, 132, 132);
//   }
//   `}
// </style> */}


const Navbar = ({ user, logout }) => {

  const router = useRouter();
  // console.log(user.value.roll)
  // console.log(user.emai)


  // console.log(process.env.JWT_SECRET_KEY)
  // console.log(router.pathname.startsWith('/api'))
  // console.log(history.location.pathname.startwith('/api'))

  const [dropdown, setDropdown] = useState(false)
  const [disable, setDisable] = useState(true)


  // const ref = useRef()

  const [show, setShow] = useState(false);
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const [stotal, setStotal] = useState();
  const [dtotal, setDtotal] = useState();
  const [ccart, setCcart] = useState();
  const [qty, setQty] = useState(1);
  const [minus, setMinus] = useState(false);


  // let h = {"success" : "jjj"}

  // console.log(h == {})

  // let resp;
  const data = {
    userid: user.emai
  };
  let to = 0;
  let sto = 0;
  let dto = 0;

  const handlesubmit = () => {

    // console.log(data)
    // e.preventDefault();
    const sendform = async () => {

      try {
        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/getcart`, data);
        resp = resp.data.carts
        setCart(resp)
        // console.log("jkf");
        // console.log(Object.keys(cart).length)
        // for (let i = 0; i < Object.keys(cart).length; i++) {
        //  console.log("kf")

        // }
        // console.log(cart);

        // console.log(cart);
        // console.log(resp);

      } catch (err) {

        // Handle Error Here
        // console.error(err);
      }
    };
    sendform();

  }


  useEffect(() => {

    handlesubmit();

    // console.log(disable);
    // console.log(cart == {});
    // console.log(cart);
    // console.log(Object.keys(cart));
    // if (router.pathname == '/checkout') {
    //   setShow(false)
    // }

    // if (Object.keys(cart).length == 0) {

    //   setDisable(true)
    // }

    if (cart != undefined) {
      {
        Object.keys(cart).map((item) => {

          if (cart[item].savelater == false) {

            setDisable(false)

          }
        })
      }

    }

    if (cart != undefined) {

      {
        Object.keys(cart).map((item) => {

          if (cart[item].savelater == false) {

            setDisable(false)

          }
        })
      }

    }

    if (cart != undefined) {
      {
        Object.keys(cart).map((item) => {

          if (cart[item].savelater == false) {

            to += parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * (cart[item].qty));
            setTotal(to);
            sto += ((cart[item].price) * cart[item].qty);
            setStotal(sto);
            dto = stotal - total;
            setDtotal(dto);
          }
        })
      }

      if(to <= 399){

          to += 40;
          setTotal(to);
      }

    }
    // console.log(cart.length)
    // console.log(to)
    // for (let i = 0; i < cart.length; i++) {

    // }

  }, [cart, total, stotal, dtotal, disable])


  
  const handleclickIncrese = (id, qty) => {

    // console.log(parseInt(qty))
    // e.preventDefault();

    let dat = {
      _id: id, qty: parseInt(qty)
    }

    const sendform = async () => {

      try {

        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/updatecart-user`, dat);

        // console.log(cart);
        // console.log(resp);

      } catch (err) {

        // Handle Error Here
        // console.error(err);
      }
    };
    sendform();

  }
  const handleclickDecrese = (id, qty) => {

    // console.log(qty)
    // e.preventDefault();

    if (qty >= 1) {

      let dat = {
        _id: id, qty: parseInt(qty)
      }

      const sendform = async () => {

        try {

          let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/updatecart-user`, dat);

          // console.log(cart);
          // console.log(resp);

        } catch (err) {

          // Handle Error Here
          // console.error(err);
        }
      };

      sendform();

    } else {

    }
  }

  const clearcart = () => {

    // console.log(data)
    // e.preventDefault();
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

  const deleteitem = (productid) => {

    let d = {
      productid: productid
    }

    const sendform = async () => {

      try {
        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/deleteonecart`, d);
        // console.log("jkf");
        // setCart(undefined)

      } catch (err) {

        // Handle Error Here
        // console.error(err);
      }
    };
    sendform();
  }

  const savelater = (id) => {

    let d = {
      _id: id
    }

    const sendform = async () => {

      try {
        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/saveitlater`, d);
        // console.log(resp);
        // setCart(undefined)

      } catch (err) {

        // Handle Error Here
        // console.error(err);
      }
    };
    sendform();
  }


  const gotocart = (id) => {

    let d = {
      _id: id
    }

    const sendform = async () => {

      try {
        let resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/gotocart`, d);
        // console.log("jkf");
        // setCart(undefined)

      } catch (err) {

        // Handle Error Here
        // console.error(err);
      }
    };
    sendform();
  }

  return (

    <>

    

      {user.roll != 'seller' && <div className=" body flex flex-wrap p-3 flex-col xs:flex-row items-center bg-gray-200">

        <Link href={'/'}><a className="pt-2 xs:pt-0 flex title-font font-medium items-center text-gray-900 mb-3 xs:mb-0 ">
          <span className="xs:ml-3 text-xl"><img src="/squiggiylogo2.jpg" alt="" className=" h-5 w-20 md:h-6 md:w-24 " /></span>
        </a></Link>

        {user.roll != 'seller' && <nav className="py-2 xs:mr-auto xs:ml-2 xs:py-1 xs:pl-3 xs:border-l xs:border-gray-400 flex flex-wrap items-center text-sm md:text-sm justify-center font-semibold">

          <Link href={'/about'}><a className="mr-5 hover:text-pink-500">About</a></Link>

          <Link href={'/grocery'}><a className="mr-5 hover:text-pink-500">Grocery</a></Link>
          <Link href={'/vegitable'}><a className="mr-5 hover:text-pink-500">Vegitable</a></Link>
          <Link href={'/dairy'}><a className="mr-5 hover:text-pink-500">Dairy</a></Link>
          <Link href={'/books'}><a className="mr-5 hover:text-pink-500">Books</a></Link>

        </nav>}

        {/* {user.roll == 'seller' && <nav className="py-2 xs:mr-auto xs:ml-2 xs:py-1 xs:pl-3 xs:border-l xs:border-gray-400 flex flex-wrap items-center text-sm md:text-sm justify-center font-semibold">

          <Link href={'/about'}><a className="mr-5 hover:text-pink-500">About</a></Link>
          <Link href={'/seller/create-product'}><a className="mr-5 hover:text-pink-500">Add Products</a></Link>
          <Link href={'/seller/orders'}><a className="mr-5 hover:text-pink-500">Orders</a></Link>

        </nav>} */}

        {!user.value && <span className="space-x-0.5 visible xs:invisible" ><Link href={'/user/singup'}><button type="button" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-1.5 py-0.5 text-center mr-1 mb-1 text-xs cursor-pointer">Singup</button></Link>
          <Link href={'/user/login'}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-1.5 py-0.5 text-center mr-1 mb-1 text-xs cursor-pointer">Login</button></Link></span>}

        <div className=" flex mx-2 space-x-1 absolute right-1 top-2">

          {user.roll == 'user' && <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}> {dropdown && <div className="bg-pink-200 absolute top-6 right-12 z-10 rounded-br-xl rounded-bl-xl rounded-tl-xl w-32 sm:w-40 text-sm sm:text-sm py-2 shadow-xl border border-pink-300">
            <ul>
              <Link href="/user/myaccount"><li className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">My account</li></Link>
              <Link href="/user/mywishlist"><li className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">My wishlist</li></Link>
              <Link href="/user/myorders"><li className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">My orders</li></Link>
              <li onClick={logout} className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">Logout</li>
            </ul>
          </div>}
          </a>}

          {/* {user.roll == 'seller' && <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}> {dropdown && <div className="bg-pink-200 absolute top-6 right-3 z-20 rounded-br-xl rounded-bl-xl rounded-tl-xl w-32 sm:w-40 text-sm sm:text-sm py-2 shadow-xl border border-pink-300">
            <ul>
              <Link href="/seller/update-product"><li className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">Update product</li></Link>
              <Link href="/seller/myaccount"><li className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">My account</li></Link>
              <li onClick={logout} className="font-semibold px-3 cursor-pointer hover:text-pink-600 py-0.5">Logout</li>
            </ul>
          </div>}
          </a>} */}

          <div>

            {show && (

              <div className="w-52 sm:w-96 h-screen top-0 right-0 absolute" id="chec-div">
                <div className=" absolute z-10 right-0 w-full h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-400" id="checkout">
                  <div className="flex flex-col justify-start " id="cart">
                    <div className=" w-52 sm:w-96 pl-4 pr-10 py-8 bg-pink-200 overflow-y-auto overflow-x-hidden h-screen" id="scroll">
                      <div className="flex items-center text-gray-500 hover:text-black cursor-pointer" onClick={() => setShow(!show)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <polyline points="15 6 9 12 15 18" />
                        </svg>
                        <p className="text-xs pl-2 leading-none">Back</p>
                      </div>
                      <p className="text-xl sm:text-2xl font-semibold leading-10 text-black pt-3 py-3">Shopping Cart</p>


                      {cart != undefined && Object.keys(cart).length > 0 && Object.keys(cart).map((item) => {
                        // console.log(cart[item].title)

                        if (cart[item].savelater == false) {

                          return (

                            <div key={cart[item].productid} className="md:flex items-center mt-1 py-2 border-t border-black">

                              <Link href={`/product/${cart[item].productid}`}>
                                <div className="w-1/4 cursor-pointer">
                                  <img src={cart[item].img} alt="squiggiy" className="w-full h-full object-center object-cover" />
                                </div>
                              </Link>

                              <div className="md:pl-3 md:w-3/4 ">
                                <div className="flex items-center justify-between w-full pt-1">
                                  {cart[item].quantity == 0 && <p className="text-xs sm:text-sm font-semibold leading-none text-black">{cart[item].title}</p>}
                                  {cart[item].quantity > 0 && <p className="text-xs sm:text-sm font-semibold leading-none text-black">{cart[item].title} ({cart[item].quantity} {cart[item].mesure})</p>}
                                  {/* <select className="cursor-pointer text-xxs sm:text-xs py-0 px-0 sm:px-0.5 sm:py-0.5 border border-pink-300 rounded-lg focus:outline-none">
                                    <option onClick={() => { setqty(`${cart[item].productid}`, 1) }}>01</option>
                                    <option onClick={() => { setqty(`${cart[item].productid}`, 2) }}>02</option>
                                    <option onClick={() => { setqty(`${cart[item].productid}`, 3) }}>03</option>
                                  </select> */}


                                  <div className="flex">

                                    <GrSubtractCircle className="text-xs  my-0 sm:my-0.5 mx-0.5 cursor-pointer" onClick={() => { handleclickDecrese(`${cart[item]._id}`, `${cart[item].qty > 1 ? (cart[item].qty - 1) : (cart[item].qty)}`)}} />

                                    <span className="text-xs"> {cart[item].qty} </span>

                                    <GrAddCircle className="text-xs  my-0 sm:my-0.5 mx-0.5 cursor-pointer" onClick={() => { handleclickIncrese(`${cart[item]._id}`, `${cart[item].qty + 1}`)}} />
                                  </div>

                                </div>
                                {/* <option onClick={() => { setqty(`${cart[item]._id}`, 3) }}>03</option> */}
                                <div className="flex items-center justify-between pt-2 pr-6">

                                  {cart[item].discount > 0 && <p className=" text-black"><span className='text-xs sm:text-sm'>₹ {parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * cart[item].qty )}</span> <del className="text-xxs sm:text-xs ml-2 font-extrathin"> ₹ {cart[item].price}</del>
                                    <span className="text-xxs sm:text-xs text-green-700"> {cart[item].discount}% off</span></p>}

                                  {cart[item].discount == 0 && <p className=" text-black"><span className='text-xs sm:text-sm'>₹ {parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * cart[item].qty)}</span> <del className="text-xxs sm:text-xs ml-2 font-extrathin"> ₹ {cart[item].price}</del></p>}

                                </div>

                                <div className="flex justify-between space-x-1 my-4">
                                  <button onClick={() => { savelater(`${cart[item]._id}`) }} className="flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs w-1/2 justify-center sm:text-xs"><RiSave3Line className="my-0 sm:my-0.5 mx-0.5" /> Save it later</button>
                                  <button onClick={() => { deleteitem(`${cart[item].productid}`) }} className="flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs w-1/2 justify-center sm:text-xs"><MdDeleteOutline className=" my-0.5 mx-0.5" />Remove</button>
                                </div>
                              </div>
                            </div>
                          )
                        }
                      })
                      }



                      {cart != undefined && Object.keys(cart).length > 0 && <> <hr className=" mt-1 py-0.5 border-t border-black"></hr>
                        <div>
                          <p className="text-base sm:text-lg font-normal leading-9 text-black">Summary</p>

                          <hr className=" mt-1 py-0.5 border-t border-black"></hr>
                          <div className="flex items-center justify-between pt-3">
                            <p className="text-xs sm:text-sm leading-none text-black">Subtotal</p>
                            <p className="text-xs sm:text-sm leading-none text-black">₹ {stotal == undefined ? to : stotal}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <p className="text-xs sm:text-sm leading-none text-black">Discount</p>
                            <p className="text-xs sm:text-sm leading-none text-black">₹ {dtotal == undefined ? dto : dtotal}</p>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <p className="text-xs sm:text-sm leading-none text-black">Shipping Charge</p>
                            <p className="text-xs sm:text-sm leading-none text-black">{total <= 399 ? '₹ 40' : 'Free'}</p>
                          </div>
                          <div className="flex items-center justify-between pt-4">
                            <p className="text-xs sm:text-sm leading-none text-black font-semibold">Total</p>
                            <p className="text-xs sm:text-sm leading-none text-black font-semibold">₹ {total == undefined ? to : total}</p>
                          </div>
                        </div>
                      </>}

                      {(cart == undefined || Object.keys(cart).length <= 0) && <div className='font-semibold text-sm'>Your Cart is Empty!</div>}

                      <div className="flex justify-between space-x-1 my-7">
                        <Link href={'/user/checkout'}><button disabled={disable} className="disabled:bg-pink-400 flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs sm:text-xs w-1/2 justify-center"><AiFillSchedule className="my-0.5 mx-0.5" />Proceed to checkout</button></Link>

                        <button onClick={clearcart} disabled={disable} className="disabled:bg-pink-400 flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs sm:text-xs w-1/2 justify-center"><MdDeleteOutline className=" my-0.5 mx-0.5" />Clear Cart</button>
                      </div>

                      {cart != undefined && Object.keys(cart).length > 0 && Object.keys(cart).map((item) => {
                        // console.log(cart[item].title)


                        if (cart[item].savelater == true) {

                          return (

                            <div key={cart[item].productid} className="md:flex items-center mt-1 py-2 border-t border-black">


                              <Link href={`/product/${cart[item].productid}`}>
                                <div className="w-1/4">
                                <img src={cart[item].img} alt className="w-full h-full object-center object-cover" />
                                  
                                  {/* <img src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png" alt className="w-full h-full object-center object-cover" /> */}
                                </div>
                              </Link>

                              <div className="md:pl-3 md:w-3/4 ">
                                <div className="flex items-center justify-between w-full pt-1">
                                  {cart[item].quantity == 0 && <p className="text-xs sm:text-sm font-semibold leading-none text-black">{cart[item].title}</p>}
                                  {cart[item].quantity > 0 && <p className="text-xs sm:text-sm font-semibold leading-none text-black">{cart[item].title} ({cart[item].quantity} {cart[item].mesure})</p>}

                                  <div className="flex">

                                    <GrSubtractCircle className="text-xs  my-0 sm:my-0.5 mx-0.5 cursor-pointer" onClick={() => { handleclickDecrese(`${cart[item]._id}`, `${cart[item].qty > 1 ? (cart[item].qty - 1) : (cart[item].qty)}`)}} />

                                    <span className="text-xs"> {cart[item].qty} </span>

                                    <GrAddCircle className="text-xs my-0 sm:my-0.5 mx-0.5 cursor-pointer" onClick={() => { handleclickIncrese(`${cart[item]._id}`, `${cart[item].qty + 1}`)}} />
                                  </div>

                                </div>


                                <div className="flex items-center justify-between pt-2 pr-6">

                                  {cart[item].discount > 0 && <p className=" text-black"><span className='text-xs sm:text-sm'>₹ {parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * cart[item].qty)}</span> <del className="text-xxs sm:text-xs ml-2 font-extrathin"> ₹ {cart[item].price}</del>
                                    <span className="text-xxs sm:text-xs text-green-700"> {cart[item].discount}% off</span></p>}

                                  {cart[item].discount == 0 && <p className=" text-black"><span className='text-xs sm:text-sm'>₹ {parseInt(((cart[item].price) - (((cart[item].price) * cart[item].discount) / 100)) * cart[item].qty)}</span> <del className="text-xxs sm:text-xs ml-2 font-extrathin"> ₹ {cart[item].price}</del></p>}

                                </div>

                                <div className="flex justify-between space-x-1 my-4">
                                  <button onClick={() => { gotocart(`${cart[item]._id}`) }} className="flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs w-1/2 justify-center sm:text-xs"><RiSave3Line className="my-0 sm:my-0.5 mx-0.5" /> Go to cart</button>
                                  <button onClick={() => { deleteitem(`${cart[item].productid}`) }} className="flex mx-auto text-white bg-pink-600 border-0 py-1 px-2 focus:outline-none hover:bg-pink-700 rounded text-xxs w-1/2 justify-center sm:text-xs"><MdDeleteOutline className=" my-0.5 mx-0.5" />Remove</button>
                                </div>
                              </div>
                            </div>

                          )
                        }
                      })
                      }

                    </div>



                  </div>
                </div>
              </div>
            )}
          </div>


          {(user.value) && <p onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="cursor-pointer mr-3 pb-1">{!user.img ? <MdAccountCircle className="text-xl xs:text-2xl mr-2 xs:mr-3" /> : <div tabIndex="0" className="focus:outline-none h-5 w-6 xs:h-6 xs:w-6 mb-4 lg:mb-0 mr-3">
            <img src={user.img} alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
          </div>}</p>}

          {(user.value && user.roll == 'user') && <p onClick={() => setShow(!show)} className='cursor-pointer'><GrCart className="text-lg xs:text-xl mr-3" /></p>}

          {!user.value && <span className="space-x-0.5 invisible xs:visible" ><Link href={'/user/singup'}><button type="button" className=" text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-1.5 py-0.5 text-center mr-1 mb-1 text-xs cursor-pointer">Singup</button></Link>
            <Link href={'/user/login'}><button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-1.5 py-0.5 text-center mr-1 mb-1 text-xs cursor-pointer">Login</button></Link></span>}



        </div>

      </div>}


    </>
  )
}

export async function getServerSideProps(context) {

  const cookies = parseCookies(context);
  const token = cookies.token != "undifined" ? cookies.token : "";
  let a = 11111111111121;
  let b = 999999999999984;

  if (token || !token) {

    const { res } = context

    res.writeHead(302, { Location: `/ ${(a + (b - a) * Math.random())} #GFDF$${(a + (b - a) * Math.random())}&% #${(a + (b - a) * Math.random())} /?jD${(a + (b - a) * Math.random())} HI%$ ${(a + (b - a) * Math.random())}` });
    res.end();
  }


  return {
    props: {}
  }
}

export default Navbar



{/* <div className="px-6 flex items-center sm:flex-row flex-wrap">
<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-6 w-6 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_0.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-8 w-8 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_1.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-10 w-10 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_2.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-12 w-12 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_3.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-16 w-16 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_4.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-20 w-20 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_5.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-24 w-24 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_6.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->

<!-- Code block starts -->
<div tabIndex="0" className="focus:outline-none h-32 w-32 mb-4 lg:mb-0 mr-4">
    <img src="https://tuk-cdn.s3.amazonaws.com/assets/components/avatars/a_3_7.png" alt="man avatar" className="h-full w-full rounded-full overflow-hidden shadow" />
</div>
<!-- Code block ends -->
</div> */}
