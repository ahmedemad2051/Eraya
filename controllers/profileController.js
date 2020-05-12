const Users_Books = require('../models/Users_Books');
const User = require('../models/User');
const Book = require('../models/Book');
const BookRating = require('../models/Book_Rating')

let views = "front"

exports.all =async (req, res) => {
    var perPage = 6
    var page = req.query.page || 1
    try {
        let books = await Users_Books.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();
        if(books){
            const count = await Users_Books.countDocuments();
            res.render(`${views}/all_books`,{books: books ,
           pagination: {page: page, limit: perPage, totalRows: count}});
        }
        else {
            return res.redirect('/')
        }
        
    } catch (e) {
        res.json({e})
    }
}

;
exports.current =async (req, res) => {
    var perPage = 6
    var page = req.query.page || 1
    try {
        let books = await Users_Books.find({shelve: "current"})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();
        if(books){
            const count = await Users_Books.countDocuments();
            res.render(`${views}/all_books`,{books: books ,
           pagination: {page: page, limit: perPage, totalRows: count}});
        }
        else {
            return res.redirect('/')
        }
        
    } catch (e) {
        res.json({e})
    }
}


exports.finished =async (req, res) => {
    var perPage = 6
    var page = req.query.page || 1
    try {
        let books = await Users_Books.find({shelve: "finished"})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();
        if(books){
            const count = await Users_Books.countDocuments();
            res.render(`${views}/all_books`,{books: books ,
           pagination: {page: page, limit: perPage, totalRows: count}});
        }
        else {
            return res.redirect('/')
        }
        
    } catch (e) {
        res.json({e})
    }
}

exports.read =async (req, res) => {
    var perPage = 6
    var page = req.query.page || 1
    try {
        let books = await Users_Books.find({shelve: "read"})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();
        if(books){
            const count = await Users_Books.countDocuments();
            res.render(`${views}/all_books`,{books: books ,
           pagination: {page: page, limit: perPage, totalRows: count}});
        }
        else {
            return res.redirect('/')
        }
        
    } catch (e) {
        res.json({e})
    }
}

exports.bookStatus = async (req, res) => {
    try {
        let {selectedBook, book_id} = req.body;
        let currUser = await User.findOne({_id: req.session.userId});
        console.log(req.session.userId);
        console.log(book_id);
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
            let userBook = await Users_Books.findOne({user: currUser, book: book_id });
            if(userBook){
               await Users_Books.update({shelve: selectedBook})
            }
            else {
             await  Users_Books.create({user: currUser , book: book_id, shelve: selectedBook})
            }
            res.redirect(req.get('referer'));
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
