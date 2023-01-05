// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

// const nodemailer = require('nodemailer')


// function sendEmail(message) {
//     return new Promise((res, rej) => {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: "abhinandanmaity1122@gmail.com",
//                 pass: 'zxcmnb...,,,???'
//             }
//         })

//         transporter.sendMail(message, function (err, info) {
//             if (err) {
//                 rej(err)
//             } else {
//                 res(info)
//             }
//         })
//     })
// }


export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        const { name, email } = req.body;

        let user = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_SECRET_KEY).toString() });


        let token = jwt.sign({ roll: user.roll, img: user.img, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '25d' });

        user.resetToken = token
        user.expireToken = Date.now() + 2160000000

        await user.save();

        // const message = {
        //     from: 'no-replay@gmail.com',
        //     to: 'abhinandanmaity222@gmail.com',
        //     subject: 'Your App - Activate Account',
        //     html: `
        //     <h3> Hello, ${user.name} </h3>
        //     <p>Your forget password link...</p>
        //     <p>To reset your account password please follow this <a target="_" href="http://localhost:3000/">link </a>, this is valid for 10 min.</p>
        //     <p>Cheers ! </p>
        //     <p>Your Application Team.</p>
        //   `
        // }

        // sendEmail(message);


        res.status(200).json({ token: token, user: { email } })

    } else {
        res.status(400).json({ error: "Invalid request type" })
    }
}


// exports.sendConfirmationEmail = function ({ toUser, hash }) {
//     const message = {
//         from: process.env.GOOGLE_USER,
//         // to: toUser.email // in production uncomment this
//         to: process.env.GOOGLE_USER,
//         subject: 'Your App - Activate Account',
//         html: `
//         <h3> Hello ${toUser.username} </h3>
//         <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
//         <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
//         <p>Cheers</p>
//         <p>Your Application Team</p>
//       `
//     }

//     return sendEmail(message);
// }
