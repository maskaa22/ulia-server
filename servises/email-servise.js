const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'uliabulinaushenko@gmail.com',
        pass: 'xdsikpgmaojlogqo'
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