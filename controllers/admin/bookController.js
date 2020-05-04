const Book = require('../../models/Book');
const Author = require('../../models/Author');
const Category = require('../../models/Category');
const fs = require('fs')

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
    let imgPath = `upload/books/${imgName}`;
    try {
        await image.mv(`public/${imgPath}`);
        await Book.create({
            name: name,
            author: author,
            category: category,
            image: imgPath,
            admin: req.session.userId
        });
        res.redirect("/admin/books");
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.edit = async (req, res) => {
    try {
        let {id} = req.params;
        let book = await Book.findOne({_id: id})
        let authors = await Author.find({});
        let categories = await Category.find({});
        res.render(`${views}/edit`, {book, authors, categories});
    } catch (e) {
        res.status(500).err(e)
    }

}

exports.update = async (req, res) => {
    let {id} = req.params;
    let {name, author, category} = req.body;

    try {
        let book = await Book.findOne({_id: id});
        let data = {
            name: name,
            author: author,
            category: category,
        };
        if (req.files) {
            let image = req.files.image;
            let imgName = Math.floor(Math.random() * Math.floor(9999999999)) + image.name;
            let imgPath = `upload/books/${imgName}`;
            await image.mv(`public/${imgPath}`);
            // remove old image
            fs.unlink(`public/${book.image}`, (e) => {
                if (e) {
                    console.log(e)
                }
            });
            data['image'] = imgPath;
        }
        await Book.findByIdAndUpdate(id, {$set: data}, {new: true})
        res.redirect("/admin/books");
    } catch (e) {
        res.status(500).write(e)
    }

}

exports.destroy = async (req, res) => {
    let {id} = req.params;
    try {
        await Book.findByIdAndRemove(id)
        res.status(200).json({"msg": 'success'});
    } catch (e) {
        res.status(500).err(e)
    }
}