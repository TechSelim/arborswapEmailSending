require('dotenv').config()
const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");

router.post('/emailsubscription', async function(req, res){

    if( req.body.token === process.env.API_TOKEN ){
        const emailBody = `
                <h2> Subscription Email </h2>
                Email : ${req.body.email} <br />
        `;
        const from      = process.env.EMAIL_TO
        const to        = process.env.EMAIL_FROM
        const subject   = "New Subscription Arborswap"
    
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        });
    
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from:       from,
            to:         to, 
            subject:    subject,
            html:       emailBody,
        });
    
        if( info.messageId ){
            res.json({
                status: 200
            })
        }else{
            res.json({
                status: 500
            })
        }

    }else{
        res.json({
            status: 500
        })
    }

})

module.exports = router