const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'comment'
    },
    item: {
        type: Array,
    }
}, {timestamps: true, toObject: {virtuals: true}, toJSON: {virtuals: true}});

module.exports = model('item_poem', userSchema);