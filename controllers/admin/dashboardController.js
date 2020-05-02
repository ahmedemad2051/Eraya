const User = require('../../models/User');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const Book = require('../../models/Book');

exports.index = async (req, res) => {
    let users_count = await User.count();
    let categories_count = await Category.count();
    let authors_count = await Author.count();
    let books_count = await Book.count();

    res.render('admin/index', {users_count, categories_count, authors_count, books_count});
}

exports.categories = (req, res) => {
    res.render('admin/category/index');
}