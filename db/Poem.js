const {Schema, model} = require('mongoose');

const poemSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    name: {
        type: String,
    },
    text: {
        type: String,
    },
    rating: {
        type: Number,
    }
}, {timestamps: true});

module.exports = model('poem', poemSchema);