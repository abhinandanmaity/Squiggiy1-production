
import moment from 'moment';
import User from "../../models/User";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");


const nodemailer = require('nodemailer')

function sendEmail(message) {
    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "abhinandanmaity1122@gmail.com",
                pass: "bmcpjexgbolmcrvp"
            }
        })

        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
        })
    })
}

export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        let newotp = '';

        var digit = '0123456789'

        for (let i = 0; i < 6; i++) {
            newotp += digit[Math.floor(Math.random() * 10)];
        }

        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ error: "Invalid email" })
        }

        let hashedotp = CryptoJS.AES.encrypt(newotp, process.env.CRYPTO_SECRET_KEY).toString()

        // console.log(Date.now() + 900000)
        // console.log(Date.now())

        const message = {
            from: "abhinandanmaity1122@gmail.com",
            to: req.body.email,
            subject: 'Otp Verification',
            html: `
            <p>Your one time otp is, <h4>${newotp}</h4> This is valid for 15 minuites.</p>
            <p>Hurry ! </p>
            <p>Thanking you , from your Application Team.</p>
            <p></p>
            <p>Username : ${req.body.email}</p>
            <p>Created : ${moment().format('D/MM/YYYY h:mm:ss')} GMT</p>
          `
        }

        sendEmail(message);

        res.status(200).json({ hashedotp, email_id: req.body.email, message: "send successfully", exotp: Date.now() + 900000 })

    } else {

        res.status(400).json({ error: "Invalid credentials" })
    }

}





