const Category = require('../../models/Category');

let views = "admin/category"

exports.index = async (req, res) => {
    try {
        let categories = await Category.find({});
        res.render(`${views}/index`, {categories: categories});
    } catch (e) {
        res.json({err:e})
    }
}

exports.create = (req, res) => {
    res.render(`${views}/create`);
}

exports.store = async (req, res) => {
    let {name} = req.body;
    try {
        let category = await Category.create({name: name});
        res.redirect("/admin/categories");
    } catch (err) {
        throw err;
    }
}