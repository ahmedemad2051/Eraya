const Category = require('../models/Category')
const Book = require('../models/Book')
const BookRating= require('../models/Book_Rating')

exports.home = (req, res) => {
    res.render('front/home');
}

exports.categories = async (req, res, next) => {
    try{
        const categories = await Category.find({})
        return res.render('front/categories', {categories: categories});

    }catch(err){
        next(err)
    }

}

exports.categoryBooks = async (req, res, next) => {
    try{
        const books = await Book.find({category: req.params.id})
        console.log(req.params.id)
        console.log("category books page")
        return res.render('front/category_books', {books: books});

    }catch(err){
        next(err)
    }

}

exports.books = async (req, res, next) => {
    try{
        const books = await Book.find({})
        return res.render('front/books', {books: books});

    }catch(err){
        next(err)
    }

}

exports.bookDetails = async (req, res, next) => {

    try{

        const rates = await BookRating.find({book: req.params.id}).populate('book')
        console.log(rates)
        return res.render('front/book_details', {rates: rates});

    }catch(err){
        next(err)
    }
}

