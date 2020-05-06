const Category = require('../models/Category')
const Book = require('../models/Book')
const BookRating= require('../models/Book_Rating')
// const paginate = require('express-paginate')


exports.home = (req, res) => {
    res.render('front/home');
}
// app.use(paginate.middleware(10, 50));

exports.categories = async (req, res, next) => {
    try{
        const categories = await Category.find({})
        if(categories){
            return res.render('front/categories', {categories: categories});
        }else {
            return res.redirect('/')
        }


    }catch(err){
        next(err)
    }

}

exports.categoryBooks = async (req, res, next) => {
    var perPage = 6
    var page = req.query.page || 1
    const id = req.params.id
    try{
        const books = await Book.find({category: req.params.id})
                                .skip((perPage * page) - perPage)
                                .limit(perPage)
                                .exec();
         if(books) {
             // console.log(books)
             // get total documents in the Posts collection
             const count = await Book.countDocuments();

             return res.render('front/category_books', {
                 id: id,
                 books: books,
                 pagination: { page: page, limit:perPage,totalRows: count }
             });
         }else{
             return res.redirect('/')
         }

    }catch(err){
        next(err)
    }

}

exports.books = async (req, res, next) => {
    // destructure page and limit and set default values
    const { page = 1, limit = 10 } = req.query;
    try{

        // execute query with page and limit values
        const books = await Book.find({})
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        // get total documents in the Posts collection
        const count = await Book.countDocuments();
        return res.render('front/books', {
                               books: books,
                               totalPages: Math.ceil(count / limit),
                               currentPage: page
                           })

    }catch(err){
        next(err)
    }

}

exports.bookDetails = async (req, res, next) => {

    try{
        const book = await Book.findById(req.params.id)
        console.log(book)
        console.log(req.params.id)
        console.log(req.params.id)
        const rates = await BookRating.find({book: req.params.id})
        console.log(rates)
        return res.render('front/book_details', {book: book,rates: rates});

    }catch(err){
        next(err)
    }
}

exports.setRate= async (req,res,next)=>{
    console.log(req.params.rateValue)
    console.log(req.params.review)
    console.log(req.params.id)
    console.log(req.session.userId)

    try {
        const book = await Book.findById(req.params.id)
        if(book){
            const {rateValue, review  , id } = req.body
            await BookRating.create({rate: rateValue,
                                     review: review,
                                     book: id,
                                     user: req.session.userId
                                    })

        }else{
            res.redirect('/')
        }


    }catch (err) {

        next(err)
    }
}