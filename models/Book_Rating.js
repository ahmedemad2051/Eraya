const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    rate:{
        type: {
            type: Number,
            required: true
        }
    },
    review: {
        type: String,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });


const Book_Rating = mongoose.model('Book_Rating', schema);
module.exports = Book_Rating;