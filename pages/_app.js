import '../styles/globals.css'
import Footer from './component/Footer'
import Navbar from './component/Navbar'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import jsCookie from 'js-cookie'
var jwt = require('jsonwebtoken');
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'



function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({ value: null, img: null, roll: null, emai: null })
  const [key, setKey] = useState(0)

  const [progress, setProgress] = useState(0)

  const router = useRouter()

  const logout = () => {
    jsCookie.remove('token');
    setUser({ value: null })
    setKey(Math.random())

    let url = `${process.env.NEXT_PUBLIC_DOMEN_NAME}`
    window.location = url;

  }

  const removebncookies = () => {

    jsCookie.remove('bn_product', { path: '/user/checkout' });

  }

  const token = parseCookies()

  // let secret = process.env.JWT_SECRET_KEY;
  let r = 'kkk'


  const data = token;
  let resp;
  const [check, setCheck] = useState()

  const sendform = async () => {

    try {
      resp = await axios.post(`${process.env.NEXT_PUBLIC_DOMEN_NAME}/api/finduser`, data);
      // console.log(resp.data);
      // console.log(check);
      // if (resp.data.success == 'true') {

      //   // console.log("ireiuuiiuj")
      //   check = true
      //   return check;
      //   // console.log(check)

      // }

      return new Promise((resolve, reject) => {
        if (resp.data.success == 'true') resolve(true);
        else reject('Oopsy...');
      })

    } catch (err) {

      // Handle Error Here
      // console.error(err);

      return new Promise((resolve, reject) => {
        if (err.data == 'true') resolve(true);
        else reject(false);
      })
    }
  }

  let promise;

  let promiseex = async () => {
    promise = await Promise.all([
      sendform()
    ])

    setCheck(promise.toString())
    // console.log(promise.toString())
    // console.log(check)

    setKey(promise.toString() + Math.random())

  }


  useEffect(() => {

    // router.events.on('routeChangeStart', () => {
    //   setProgress(26);
    // })

    router.events.on('routeChangeStart', () => {
      setProgress(37);
    })

    router.events.on('routeChangeStart', () => {
      setProgress(59);
    })

    // router.events.on('routeChangeStart', () => {
    //   setProgress(70);
    // })

    router.events.on('routeChangeStart', () => {
      setProgress(82);
    })

    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    })

    // console.log(router.route)
    if (router.route != "/user/checkout") {

      removebncookies()
    }

    // const { token } = parseCookies()
    if (router.pathname.startsWith('/api')) {
      r = 'gggggg'
    }

    let t = null;
    // console.log(token)

    if (token.token != null || token.token != 'undefined') {

      try {

        t = jwt.verify(token.token, `SDDFF%*&^%#GFGjwts763267ecretHJJK%^^&**(%^5475jhdh`)

      } catch (err) {
        // jsCookie.remove('token');
      }
    }

    if (t != null) {
      setUser({ value: t, img: t.img, roll: t.roll, emai: t.email })
    }

    setKey(Math.random())

  }, [router.query])

  // useEffect(() => {



  // }, [])



  return (

    <>

      <LoadingBar
        progress={progress}
        height={4}
        color='pink'
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />

      {user.roll != "seller" && <Navbar logout={logout} user={user} key={key} token={token} />}

      <Component user={user} logout={logout} {...pageProps} />

      {user.roll != "seller" && <Footer user={user}/>}

    </>

  )
}



export default MyApp
