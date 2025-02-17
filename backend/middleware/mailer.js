const nodemailer = require('nodemailer');

module.exports.sendEmail = (receiver_email,email_subject, email_body) => {
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS: true,
        auth: {
            user: process.env.SERVER_MAILER_ID,
            pass: process.env.SERVER_MAILER_PASSWORD,
        }
    })

    const mailOptions = {
        from: process.env.SERVER_MAILER_ID,
        to: receiver_email,
        subject: email_subject,
        text: email_body
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
    })
}