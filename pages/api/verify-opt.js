
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

        const newotp = req.body.code;
        const exotp = req.body.exotp;

        // console.log(exotp)
        // console.log(Date.now())
        // // console.log(exotp >= Date.now())

        let hashedotp = CryptoJS.AES.decrypt(req.body.hcode, process.env.CRYPTO_SECRET_KEY);

        if (newotp !== hashedotp.toString(CryptoJS.enc.Utf8) || exotp <= Date.now()) {
            return res.status(400).json({ error: "Invalid verification" })
        }

        const message = {
            from: 'abhinandanmaity1122@gmail.com',
            to: req.body.email,
            subject: 'Squiggiy - Verify Successfully',
            html: `
            <h3> Hello, ${req.body.name} </h3>
            <p>Your account successfully verified.</p>
            <p>chrees ! </p>
            <p>Thanking you, from your Squiggiy Team.</p>
          `
        }

        sendEmail(message);

        res.status(200).json({ message: "verify successfully" })

    } else {

        res.status(400).json({ error: "Invalid credentials" })
    }

}