exports.home = (req, res) => {
    res.render('front/home');
}

exports.categories = (req, res) => {
    res.render('front/categories');
}

exports.categoryBooks = (req, res) => {
    res.render('front/category_books');
}