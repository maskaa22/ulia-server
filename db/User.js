const {Schema, model} = require('mongoose');

const passwordServise = require('../servises/password-servise');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        select: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

userSchema.statics = {
    async createUserWithHashPassword(userObject) {
        
        const hashedPassword = await passwordServise.hash(userObject.password);

        return this.create({...userObject, password: hashedPassword});
    }
};

module.exports = model('user', userSchema);