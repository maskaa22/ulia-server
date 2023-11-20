const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 8),
    compare: async (password, hash) => {
        const isPasswordMatced = await bcrypt.compare(password, hash);

        if (!isPasswordMatced) {

            return isPasswordMatced;
        }

        return isPasswordMatced;
    }
};