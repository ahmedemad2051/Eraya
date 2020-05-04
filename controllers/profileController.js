const User_Books = require('../models/Users_Books');

let views = "front/profile"

exports.all =async (req, res) => {
    try {
        let books = await User_Books.find({});
        console.log(books);
        res.render(`${views}/all_books`,{books: books});
    } catch (e) {
        res.json({e})
    }
}


exports.current =async (req, res) => {
    try {
        let books = await User_Books.find({shelve: "current"});
        res.render(`${views}/current_books`, {books: books});
    } catch (e) {
        res.json({e})
    }
}


exports.finished =async (req, res) => {
    try {
        let books = await User_Books.find({shelve: "finished"});
        res.render(`${views}/finished`, {books: books});
    } catch (e) {
        res.json({e})
    }
}

exports.read =async (req, res) => {
    try {
        let books = await User_Books.find({shelve: "read"});
        res.render(`${views}/read`, {books: books});
    } catch (e) {
        res.json({e})
    }
}

