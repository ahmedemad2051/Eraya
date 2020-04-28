const CategoryModel = require('../models/Category')
const BookModel = require('../models/Book')
const BookRatingModel = require('../models/Book_Rating')

exports.home = (req, res) => {
    res.render('front/home');
}

exports.categories = async (req, res, next) => {
    try{
        const categories = await CategoryModel.find({})
        return res.render('front/categories', {categories: categories});

    }catch(err){
        next(err)
    }

}

exports.categoryBooks = async (req, res, next) => {
    try{
        const books = await BookModel.find({category: req.params.Id}).populate('category').populate('author')
        return res.render('front/category_books', {books: books});

    }catch(err){
        next(err)
    }
}

exports.books = async (req, res, next) => {
    try{
        const books = await BookModel.find({}).populate('author')
        return res.render('front/books', {books: books});

    }catch(err){
        next(err)
    }

}

exports.bookDetails = async (req, res, next) => {
    try{

        const rates = await BookRatingModel.find({book: req.params.bookId}).populate('book')
        return res.render('front/book_details', {book: rates});

    }catch(err){
        next(err)
    }
}

