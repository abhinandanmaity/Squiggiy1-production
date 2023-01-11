

import User from "../../models/User";
import { connectDb } from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");


const nodemailer = require('nodemailer')

function sendEmail(message) {

    return new Promise((res, rej) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "squiggiyofficialmail@gmail.com",
                pass: "ksadwkdxuleolsvp"
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

        const newPassword = req.body.newpassword
        const sentToken = req.body.token

        const user = await User.findOne({ presetToken: sentToken, pexpireToken: { $gt: Date.now() } })

        if (!user) {
            return res.status(400).json({ error: "Try again session expired" })
        }

        let hashedpassword = CryptoJS.AES.encrypt(newPassword, process.env.CRYPTO_SECRET_KEY).toString()

        user.password = hashedpassword
        user.presetToken = undefined
        user.pexpireToken = undefined

        await user.save();

        const message = {
            from: "squiggiyofficialmail@gmail.com",
            to: user.email,
            subject: 'Squiggiy - Password Reset Confirmation',
            html: `
            <h3> Hello, ${user.name} </h3>
            <p>Your Password was successfully updated.</p>
            <p>Chress ! </p>
            <p>Thanking you, from your Squiggiy Team.</p>
          `
        }

        sendEmail(message);

        res.status(200).json({ message: "password updated successfully" })

    } else {

        res.status(400).json({ error: "Invalid credentials" })
    }

}





