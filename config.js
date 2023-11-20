require('dotenv').config();

module.exports = {

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'secret_world',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_world',

    MONGO_CONNECT_URL: process.env.MONGO_CONNECT_URL || 'mongodb+srv://ulia:ulia123987@cluster0.maqudan.mongodb.net/?retryWrites=true&w=majority',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    PORT: process.env.PORT || 5000,
    PORT_3000: 'https://ulia-ushenko.vercel.app',

};