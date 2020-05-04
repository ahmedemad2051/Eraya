const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shelve:{
        type: String, enum: ["finished","current","read"],
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
})
schema.pre('find', function () {
    this.populate('book').populate('user').lean();
});

schema.pre('findOne', function () {
    this.populate('book').populate('user').lean();
});

const Users_Books = mongoose.model('Users_Books', schema);
module.exports = Users_Books;