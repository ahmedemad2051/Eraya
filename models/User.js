const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Schema } = mongoose;

const schema = new Schema({
    email: {
        type: String,
        match: /.+@+\..+/,
        unique: true,
        index:true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 25
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    }
});

schema.pre('save',async function(next) {
    let user = this;
    if (user.isNew){
        user.password = await bcrypt.hash(user.password,10) ;
    }
    next();
});

const User = mongoose.model('User', schema);
module.exports = User;