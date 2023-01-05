// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


import { connectDb } from "../../middleware/mongoose"


export default async function handler(req, res) {

  // await connectDb();
  res.status(200).json({ name: 'John Doe' })
}



// export async function getServerSideProps(context) {

//   const cookies = parseCookies(context);

//   const token = cookies.token != "undefined" ? cookies.token : "";

//   // console.log(user)
//   if (token || !token) {

//     return {

//       redirect: {
//         permanent: false,
//         destination: "/",
//       },

//       props: {}

//     }
//   }

//   return {
//     props: {}
//   }
// }
