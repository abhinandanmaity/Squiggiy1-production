// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import moment from 'moment';
import Seller from "../../models/Seller";
import { connectDb } from "../../middleware/mongoose";
var jwt = require('jsonwebtoken');

// const nodemailer = require('nodemailer')
// const sgTransport = require('nodemailer-sendgrid-transport');
// const { google } = require('googleapis');
// const sendgridTransport = require('@sendgrid/mail');


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

        const user = await Seller.findOne({ shopemail: req.body.email })

        console.log(user)
        console.log(req.body.email)
        if (user) {

            const token = jwt.sign(`${Math.random() * Date.now() * Math.random() * req.body.email}`, process.env.JWT_SECRET_KEY)

            user.presetToken = token
            user.pexpireToken = Date.now() + 900000

            await user.save();

            const a = 1211189383998493;
            const b = 999999992332399;

            const message = {
                from: 'squiggiyofficialmail@gmail.com',
                to: user.shopemail,
                subject: 'Squiggiy - Password Reset',
                html: `
                <h3> Hello, ${user.shopname} </h3>
                <p>Your password request to change your Squiggiy password has been triggered.</p>

                <p>If you did not make the request then ignore it.</p>
                <p></p>
                <p>To complete the password reset process, visit following link.</p>
                <p>To reset your account password please follow this <a target="_" href="http://localhost:3000/auth/reset-password-seller/${token}/?${(a + (b - a) * Math.random()) * Date.now()}">link </a> , this is valid for 15 min.</p>
                
                <p>Hurry ! </p>
                <p>Thanking you, from your Squiggiy Team.</p>
                <p></p>
                <p>Username : ${user.shopemail}</p>
                <p>Created : ${moment().format('D/MM/YYYY h:mm:ss')} GMT</p>
              `
            }

            sendEmail(message);

            res.status(200).json({ success: "success" })

        } else {

            res.status(400).json({ error: "Invalid credentials" })
        }



    } else {
        res.status(400).json({ error: "Invalid credentials" })
    }
}



