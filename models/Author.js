const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    dob: {
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
    }
}, { timestamps: true });

schema.pre('find', function () {
    this.lean();
});

schema.pre('findOne', function () {
    this.lean();
});

const Author = mongoose.model('Author', schema);
module.exports = Author;