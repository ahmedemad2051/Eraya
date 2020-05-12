const Author = require('../models/Author');
const Book = require('../models/Book');
const Users_Books = require('../models/Users_Books');
const User = require('../models/User');
const BookRating = require('../models/Book_Rating');

let views = "front/author_details"

exports.authors= async (req, res, next) => {
    console.log(req.session.userId)
    var perPage = 16
    var page = req.query.page || 1

    try {

        // execute query with page and limit values
        const authors = await Author.find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec();
        if(authors) {
            // get total documents in the Posts collection
            const count = await Author.countDocuments();
            return res.render('front/authors', {
                authors: authors,
                pagination: { page: page, limit:perPage,totalRows: count }
            })
        }else{
            return res.redirect('/')
        }

    } catch (err) {
        next(err)
    }

}
exports.author_details = async (req, res) => {
    let {id} = req.params;
    try {
        let author = await Author.findOne({_id: id}); 
        let books = await Book.find({author: id});
        res.render(`${views}`, {author, books});
    } catch (e) {
        res.status(403);
        res.redirect('/');
    }
}

exports.bookStatus = async (req, res) => {
    try {
        let {selectedBook, book_id} = req.body;
        let currUser = await User.findOne({_id: req.session.userId});
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
                console.log("update")
               await Users_Books.update({shelve: selectedBook})
            }
            else {
             await  Users_Books.create({user: currUser , book: book_id, shelve: selectedBook})
            }
            res.redirect(`/authors/${req.params.id}`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
