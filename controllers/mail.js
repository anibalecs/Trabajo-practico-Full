const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.APP_EMAIL,
        pass: process.env.APP_EMAIL_PASS,
    },

    tls:{
        rejectUnauthorized: false
    }
});

let mailOptions = {
    from: 'myemail@gmail.com',
    to:"pedro.123@gmail.com",
    subject: `Notificciones de Full Stack`,
    html: `Estamos probando el envio de emails.`,
};

const sendMail = () =>{
    transporter.sendMail(mailOptions, function (err, info){
        if(err){
            console.log(err)
        } else{
            console.log(info);
        }
    });
}

module.exports = {sendMail}