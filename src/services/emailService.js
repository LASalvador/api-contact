const nodemailer = require('nodemailer');
require('dotenv/config');
const USER = process.env.EMAIL;
const sender = nodemailer.createTransport({
    host: process.env.HOST,
    port: 465,
    secure: true,
    auth: {
        user: USER,
        pass: process.env.PASSWORD
    }
});


const sendEmail = async (req, res) => {
    if (!validateEmail(req.body.to)) {
        res.status(400).json({status: 'ERROR', message: 'Email to is invalid'})
        return
    }
    
    var mailOptions = {
        from: USER,
        to: req.body.to,
        subject: req.body.subject,
        html: createEmailMessage(req.body.name, req.body.email, req.body.message),
    };
    let info;
    try {
        info = await sender.sendMail(mailOptions);
        emailMessage = "Message sent: " + info.messageId
        console.log(emailMessage);
        res.json({status: 'SUCCESS', message: emailMessage})
    } catch (error) {
        console.log(error);
        res.status(500).json({status: 'ERROR', message: 'Error to send email'})
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function createEmailMessage(name, email, message) {
    return '<b>Name:</b>' + name + '<br><b>Email:</b>' + email + '<br><b>Message:</b>' + message;
}

module.exports = {
    sendEmail
}

