const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    text: {
        type: String,
    },
    // user_name: {
    //     type: String,
    // },
    poem_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'poem'
    },
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('comment', userSchema);