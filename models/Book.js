const mongoose = require('mongoose');
const BookRating = require('../models/Book_Rating')
const {Schema} = mongoose;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, {timestamps: true});

schema.methods.getBookRates = async function getBookRates() {
    let avgRate = 0;
    let book_rates =  await BookRating.aggregate([
        {$match: {book: this._id}},
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
    return avgRate;
}


schema.pre('find', function () {
    this.populate('author').populate('category').lean();
});

schema.pre('findOne', function () {
    this.populate('author').populate('category').lean();
});


const Book = mongoose.model('Book', schema);
module.exports = Book;

//
// schema.virtual('average_rate').get(async function () {
//     let avgRate = 0;
//     try{
//         let book_rates =  await BookRating.aggregate([
//             {$match: {book: this._id}},
//             {
//                 $group:
//                     {
//                         _id: "$book",
//                         avgRate: {$avg: {$sum: "$rate"}},
//                     }
//             }
//         ]);
//
//         if (book_rates) {
//             avgRate = book_rates[0].avgRate;
//
//         }
//     }catch (e) {
//
//     }finally {
//         console.log('rate '+avgRate )
//
//     }
//
//     return 2;
// });