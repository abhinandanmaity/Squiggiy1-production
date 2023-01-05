
import { useRouter } from "next/router";
import Seller from "../models/Seller";
import { parseCookies } from 'nookies'
import mongoose from 'mongoose'
var jwt = require('jsonwebtoken');
import jsCookie from 'js-cookie';
import User from '../models/User';

import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import FullLayout from "../src/layouts/FullLayout";

const Errorpage = () => {

  const router = useRouter();

  const handleInput = () => {
    router.push("/");
  };

  const path = router.asPath
  // console.log(router.asPath)
  let token = jsCookie.get('token')

  // console.log(token)
  let t;

  try {

    t = jwt.verify(token, process.env.JWT_SECRET_KEY)
  } catch (err) {

  }
  console.log(t)

  return (

    <>

      {/* <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>We are sorry, Page not found!</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>

          <a onClick={handleInput}>Back To Homepage</a>
        </div>
      </div> */}
      {t && t.roll == "seller" ? <ThemeProvider theme={theme}>
        <FullLayout>

          <div className="min-h-screen">

            <div className="flex items-center justify-center py-12">
              <div className=" rounded-md flex items-center justify-center mx-4 md:w-2/3">
                <div className="flex flex-col items-center py-16">
                  <img className="px-4 hidden md:block" src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png" />
                  <img className="md:hidden" src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png" />
                  <h1 className="px-4 pt-8 pb-4 text-center  text-5xl font-bold leading-10 text-gray-800">OOPS!</h1>
                  <p className="px-4 pb-10 text-base leading-none  text-center text-gray-600">No signal here! we cannot find the page you are looking for</p>
                  <button className="mx-4 h-10 w-44  rounded-md text-white text-base bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Go Back</button>
                </div>
              </div>
            </div>

          </div>


        </FullLayout>
      </ThemeProvider> : <div className="min-h-screen">

        <div className="flex items-center justify-center py-12">
          <div className=" rounded-md flex items-center justify-center mx-4 md:w-2/3">
            <div className="flex flex-col items-center py-16">
              <img className="px-4 hidden md:block" src="https://i.ibb.co/9Vs73RF/undraw-page-not-found-su7k-1-3.png" />
              <img className="md:hidden" src="https://i.ibb.co/RgYQvV7/undraw-page-not-found-su7k-1.png" />
              <h1 className="px-4 pt-8 pb-4 text-center  text-5xl font-bold leading-10 text-gray-800">OOPS!</h1>
              <p className="px-4 pb-10 text-base leading-none  text-center text-gray-600">No signal here! we cannot find the page you are looking for</p>
              <button className="mx-4 h-10 w-44  rounded-md text-white text-base bg-pink-700 hover:bg-pink-800 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">Go Back</button>
            </div>
          </div>
        </div>

      </div>}
    </>
  );
};


export default Errorpage;