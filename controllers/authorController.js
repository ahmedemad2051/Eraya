const Author = require('../models/Author');
const Book = require('../models/Book');
const Users_Books = require('../models/Users_Books');
const User = require('../models/User');

let views = "front/author_details"

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
        // let currUser = await User.findOne({_id: "5eaebd532baa8ec9b4de66eb"});
        Book_exists = await Book.findOne({_id: book_id});
        if(!Book_exists){
            res.redirect('/');
        } else if(selectedBook != "finished" && selectedBook != "current" && selectedBook != "read" ){
            res.redirect('/');
         } 
        //else if(!currUser){
        //     console.log(currUser);
        //     res.redirect('/');
        // } 
        else {
            let userBook = await Users_Books.findOne({user: "5eaebd532baa8ec9b4de66eb", book: book_id });
            console.log(userBook)
            if(userBook){
               await userBook.update({shelve: selectedBook})
            }
            else {
             await  Users_Books.create({user: "5eaebd532baa8ec9b4de66eb" , book: book_id, shelve: selectedBook})
            }
            res.redirect(`/authors/${req.params.id}`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
