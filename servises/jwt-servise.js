const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = require('.././config');

module.exports = {
    generateTokenPair: (id) => {

        const access_token = jwt.sign({id}, JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refresh_token = jwt.sign({id}, JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, secret) => {
        try {

            const verifyToken = await jwt.verify(token, secret);

            return {verifyToken}
        } catch (e) {
            return null;
        }
    }
};