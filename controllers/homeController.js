const CategoryModel = require('../models/Category')
const BookModel = require('../models/Book')

exports.home = (req, res) => {
    res.render('front/home');
}

exports.categories = async (req, res, next) => {
    try{
        const categories = await CategoryModel.find({}).populate('admin')
        return res.render('front/categories', {categories: categories});

    }catch(err){
        next(err)
    }

}

exports.categoryBooks = async (req, res, next) => {
    try{
        const books = await BookModel.find({}).populate('category').populate('author')
        return res.render('front/category_books', {books: books});

    }catch(err){
        next(err)
    }
}