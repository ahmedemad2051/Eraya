const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {timestamps: true});

schema.pre('find', function () {
    this.populate('author').populate('category').lean();
});

schema.pre('findOne', function () {
    this.populate('author').populate('category').lean();
});


const Book = mongoose.model('Book', schema);
module.exports = Book;