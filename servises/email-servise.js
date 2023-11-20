const nodemailer = require('nodemailer');
const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('.././config');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});


const sendMailForUs = (user_email, text) => transporter.sendMail({
    from: `${user_email}`,
    to: 'uliabulinaushenko@gmail.com',
    subject: `Вітаю, моя пошта: ${user_email}`,
    html: `<p>${text}</p>`
});

module.exports = {
    sendMailForUs
};