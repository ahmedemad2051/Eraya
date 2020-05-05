const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: {
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

const Category = mongoose.model('Category', schema);
module.exports = Category;