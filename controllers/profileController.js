const Users_Books = require('../models/Users_Books');
const User = require('../models/User');
const Book = require('../models/Book');

let views = "front/profile"

exports.all =async (req, res) => {
    try {
        let books = await Users_Books.find({});
        // if(books == {}){
        //     //flash message
        // }
        res.render(`${views}/all_books`,{books: books});
    } catch (e) {
        res.json({e})
    }
}


exports.current =async (req, res) => {
    try {
        let books = await Users_Books.find({shelve: "current"});
        res.render(`${views}/current_books`, {books: books});
    } catch (e) {
        res.json({e})
    }
}


exports.finished =async (req, res) => {
    try {
        let books = await Users_Books.find({shelve: "finished"});
        res.render(`${views}/finished`, {books: books});
    } catch (e) {
        res.json({e})
    }
}

exports.read =async (req, res) => {
    try {
        let books = await Users_Books.find({shelve: "read"});
        res.render(`${views}/read`, {books: books});
    } catch (e) {
        res.json({e})
    }
}

exports.bookStatus = async (req, res) => {
    try {
        let {selectedBook, book_id} = req.body;
        console.log(book_id)
        let currUser = await User.findOne({_id: "5eb093931a6b982bf0083f8d"});
        Book_exists = await Book.findOne({_id: book_id});
        if(!Book_exists){
            res.redirect('/');
        } else if(selectedBook != "finished" && selectedBook != "current" && selectedBook != "read" ){
            res.redirect('/');
         } 
        else if(!currUser){
            res.redirect('/');
        } 
        else {
            let userBook = await Users_Books.findOne({user: "5eb093931a6b982bf0083f8d", book: book_id });
            if(userBook){
               await Users_Books.update({shelve: selectedBook})
            }
            else {
             await  Users_Books.create({user: "5eb093931a6b982bf0083f8d" , book: book_id, shelve: selectedBook})
            }
            res.redirect(`${views}/profile`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
