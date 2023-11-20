const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenPair: (id) => {

        const access_token = jwt.sign({id}, 'secret_world', {expiresIn: '15m'});
        const refresh_token = jwt.sign({id}, 'refresh_world', {expiresIn: '30d'});

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