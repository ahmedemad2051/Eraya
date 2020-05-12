const Book = require('../models/Book')
const Author = require('../models/Author')
const Category = require('../models/Category')
exports.searchPage = (req, res, next)=>{
    res.render('front/searchResult')
}


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

exports.search = async(req, res, next) =>{
    if(req.body.searchBar){
        const regex = new RegExp(escapeRegex(req.body.searchBar), 'gi');
        foundBooks = await Book.find({"name": regex})
        foundAuthors = await Author.find(
            {$or: [{"fname": regex}, {"lname": regex}, {"dob":regex}]}
            )
        foundCategories = await Category.find({"name": regex})
        categoryDropDown = await Category.find({})
        authorDropDown = await Author.find({}) 
        var firstAuthor = authorDropDown[0].fname + authorDropDown[0].lname
        var firstCategory = categoryDropDown[0].name
        var foundBooksLength = foundBooks.length
        var foundAuthorsLength = foundAuthors.length
        var foundCategoriesLength = foundCategories.length
        var results = foundBooks.length + foundAuthorsLength + foundCategoriesLength
    }
    else{
        req.flash('info', "Please type anything")   
    }
    res.render('front/searchResult', {
        searchKeyword:          req.body.searchBar,
        foundBooks:             foundBooks,
        foundBooksLength:       foundBooksLength,
        foundAuthors:           foundAuthors,
        foundAuthorsLength:     foundAuthorsLength,
        foundCategories:        foundCategories,
        foundCategoriesLength:  foundCategoriesLength,
        categoryDropDown:       categoryDropDown,
        authorDropDown:         authorDropDown,   
        firstAuthor:            firstAuthor,
        firstCategory:           firstCategory,     
        results:                results,
    })
}


exports.advancedSearch = async(req, res, next)=>{
    console.log(req.body.author.trim(), req.body.category.trim())
    res.render('front/searchResult')
}
// , function (err, foundBooks) {
//     if(err){
//         console.log(err)
//     }else{

//         console.log(foundBooks)
//         if(foundBooks){
//             console.log(foundBooks)
//         }else{
//             console.log("No results found")
//         }
//     }
    
// })