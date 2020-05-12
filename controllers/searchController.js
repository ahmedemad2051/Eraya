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
        var firstAuthor = authorDropDown[0].fname + " " +authorDropDown[0].lname
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
    const searchKeyword = new RegExp(escapeRegex(req.body.searchKeyword), 'gi')
    const author = req.body.author.trim()
    const authorName = author.split(" ")
    const fname = new RegExp(escapeRegex(authorName[0]), 'gi')
    const lname = new RegExp(escapeRegex(authorName[1]), 'gi')
    const category = req.body.category.trim()

    const categoryDropDown = await Category.find({})
    const authorDropDown = await Author.find({})

    var firstAuthor = authorDropDown[0].fname + " " +authorDropDown[0].lname
    var firstCategory = categoryDropDown[0].name
    console.log(authorName[0])
    authorFound = await Author.find({
        fname: fname,
        lname: lname
    })
    categoryFound = await Category.findOne({
        name: category
    })  
    foundBooks = await Book.find({
            "name": searchKeyword,
            "author":authorFound,
            "category": categoryFound._id
    })
    foundBooksLength  = foundBooks.length

    res.render('front/searchResult',{
        searchKeyword: req.body.searchKeyword,
        foundBooks: foundBooks,
        results: foundBooksLength,
        categoryDropDown: categoryDropDown,
        authorDropDown: authorDropDown,
        firstAuthor: firstAuthor,
        firstCategory: firstCategory,
        foundBooksLength: foundBooksLength
    })
}


exports.getBookByCategory =async (req, res, next)=>{
    // console.log(req.params.searchKeyword)
    categoryName = req.params.name
    const categoryDropDown = await Category.find({})
    const authorDropDown = await Author.find({})

    var firstAuthor = authorDropDown[0].fname + " " +authorDropDown[0].lname
    var firstCategory = categoryDropDown[0].name

    categoryFound = await Category.findOne({
        name: categoryName
    })  
    foundBooks = await Book.find({
        "category": categoryFound._id
    })
    foundBooksLength = foundBooks.length

    res.render('front/searchResult',{
        foundBooks: foundBooks,
        results: foundBooksLength,
        foundBooksLength: foundBooksLength,
        categoryDropDown: categoryDropDown,
        authorDropDown: authorDropDown,
        firstAuthor: firstAuthor,
        firstCategory: firstCategory,
        // foundBooksLength: foundBooksLength
    })
}