require('dotenv').config()
const express = require('express')
const router = express.Router()
const nodemailer = require("nodemailer");

router.post('/applylisting', async function(req, res){

    if( req.body.token === process.env.API_TOKEN ){

        const emailBody = `
                <h2> Project Details </h2>
                Project Name:   ${req.body.project_name} <br />
                Website:        ${req.body.website} <br />
                Description:    ${req.body.description} <br /><br />
                <h2> Contact Info </h2>
                Name :                  ${req.body.name} <br />
                Email Address :         ${req.body.email} <br />
                Telegram Handle :       ${req.body.telegram} <br />
                Phone Number :          ${req.body.phone} <br />
                Message or Comments :   ${req.body.message} <br />
        `;
        const from      = process.env.EMAIL_TO
        const to        = process.env.EMAIL_FROM
        const subject   = "Apply Listing"
    
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