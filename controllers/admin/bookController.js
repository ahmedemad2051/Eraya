const Book = require('../../models/Book');
const Author = require('../../models/Author');
const Category = require('../../models/Category');

let views = "admin/book"

exports.index = async (req, res) => {
    try {
        let books = await Book.find({});
        res.render(`${views}/index`, {books});
    } catch (e) {
        res.json({err: e})
    }
}

exports.create = async (req, res) => {
    try {
        let authors = await Author.find({});
        let categories = await Category.find({});
        res.render(`${views}/create`, {authors, categories});
    } catch (e) {
        return res.status(500).send(e);
    }

}

exports.store = async (req, res) => {
    let {name, author, category} = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let image = req.files.image;
    let imgName = Math.floor(Math.random() * Math.floor(9999999999)) + image.name;

    try {
        await image.mv(`public/upload/books/${imgName}`);
        let book = await Book.create({
            name: name,
            author: author,
            category: category,
            image: imgName,
        });
        res.redirect("/admin/books");
    } catch (err) {
        return res.status(500).send(err);
    }
}