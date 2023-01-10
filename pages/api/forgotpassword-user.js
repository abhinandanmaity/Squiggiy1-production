// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import moment from 'moment';
import User from "../../models/User";
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
                user: 'squiggiyofficialmail@gmail.com',
                pass: 'hzkkmunylqmekvxd'
            }
        })

        transporter.sendMail(message, function (err, info) {
            if (err) {
                rej(err)

                // console.log(err)
            } else {
                res(info)
                // console.log(info)
            }
        })
    })
}


export default async function handler(req, res) {

    if (req.method == 'POST') {
        await connectDb();

        let user = await User.findOne({ email: req.body.email })

        // console.log(user)

        if (user) {

            const token = jwt.sign(`${(Math.random() * Date.now() * Math.random() * req.body.email)}`, process.env.JWT_SECRET_KEY)

            user.presetToken = token
            user.pexpireToken = Date.now() + 900000

            await user.save();

            const a = 1211189383998493;
            const b = 999999992332399;

            // from: '"Squiggiy" <squiggiy-noreply@gmail.com>',
            const message = {
                from: '"Squiggiy " <reset-password-noreply@gmail.com>',
                to: user.email,
                subject: 'Squiggiy - Password Reset',
                html: `
                <h3> Hello, ${user.name} </h3>
                <p>Your password request to change your Squiggiy password has been triggered.</p>

                <p>If you did not make the request then ignore it.</p>
                <p></p>
                <p>To complete the password reset process, visit following link.</p>

                <p>To reset your account password please follow this <a target="_" href="https://squiggiy.netlify.app/auth/reset-password-user/${token}/?@${(a + (b - a) * Math.random() * Date.now())}">Link </a> , this link is valid for 15 minutes.</p>

                <p>Hurry !</p>
                <p>Thanking you, from your Squiggiy Team.</p>
                <p></p>
                <p>Username : ${req.body.email}</p>
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



