const Category = require('../models/Category')
const Book = require('../models/Book')
const BookRating = require('../models/Book_Rating')
// const paginate = require('express-paginate')


exports.home = (req, res) => {
    res.render('front/home');
}
// app.use(paginate.middleware(10, 50));

exports.categories = async (req, res, next) => {
    try {
        const categories = await Category.find({})
        if (categories) {
            return res.render('front/categories', {categories: categories});
        } else {
            return res.redirect('/')
        }


    } catch (err) {
        next(err)
    }

}

exports.categoryBooks = async (req, res, next) => {
    console.log(req.session.userId)
    var perPage = 16
    var page = req.query.page || 1
    const id = req.params.id

    try{
        const category = await Category.findById(req.params.id)
        const books = await Book.find({category: req.params.id})
                                .skip((perPage * page) - perPage)
                                .limit(perPage)
                                .exec();
         if(books) {
             // console.log(books)
             // get total documents in the Posts collection
             const count = await Book.countDocuments();

             return res.render('front/category_books', {
                 category: category,
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
    console.log(req.session.userId)
    var perPage = 16
    var page = req.query.page || 1
    const id = req.params.id
    try {

        // execute query with page and limit values
        const books = await Book.find({})
                    .skip((perPage * page) - perPage)
                    .limit(perPage)
                    .exec();
        if(books) {
            // get total documents in the Posts collection
            const count = await Book.countDocuments();
            return res.render('front/books', {
                books: books,
                pagination: { page: page, limit:perPage,totalRows: count }
            })
        }else{
            return res.redirect('/')
        }

    } catch (err) {
        next(err)
    }

}

exports.bookDetails = async (req, res, next) => {

    try {
        const book = await Book.findById(req.params.id)


        let authUser = req.session.userId;
        let avgRate = 0;
        let reviews = '';
        let review = '';
        if (authUser) {
            let book_rate = await BookRating.findOne({user: authUser, book: req.params.id})
            if (book_rate) {
                avgRate = book_rate.rate;
                review = book_rate.review;
            }
        } else {
            let book_rates = await BookRating.aggregate([
                {$match: {book: book._id}},
                {
                    $group:
                        {
                            _id: "$book",
                            avgRate: {$avg: {$sum: "$rate"}},
                        }
                }
            ]);
            if (book_rates) {
                avgRate = book_rates[0].avgRate;

            }

        }
        reviews = await BookRating.find({book: req.params.id}).lean()
        console.log(reviews)
        return res.render('front/book_details', {book: book, rate: avgRate, review: review, reviews: reviews});

    } catch (err) {
        next(err)
    }
}

exports.setRate = async (req, res, next) => {
    // console.log(req.params.review)
    // console.log(req.params.rate)
    let status = false;
    let msg = 'failed to add review, please try again later';
    try {
        const book = await Book.findById(req.params.id)
        let authUser = req.session.userId;
        const {rate, review} = req.body
        if (book && authUser && rate && review) {
            let book_rate = await BookRating.findOne({user: authUser, book: book._id});
            if (book_rate) {
                book_rate.update({rate: rate, review: review});
                msg = 'Your rate and review updated successfully';
            } else {
                await BookRating.create({
                    rate: rate,
                    review: review,
                    book: book._id,
                    user: authUser
                });
                msg = 'your rate and review added successfully';
            }
            status = true;
        }

        res.json({
            status: status,
            msg: msg
        });


    } catch (err) {
        res.json({
            status: status,
            msg: msg
        });
    }
}