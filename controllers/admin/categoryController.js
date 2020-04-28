const Category = require('../../models/Category');

let views = "admin/category"

exports.index = async (req, res) => {
    try {
        let categories = await Category.find({});
        res.render(`${views}/index`, {categories: categories});
    } catch (e) {
        res.json({err: e})
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

exports.edit = async (req, res) => {
    try{
        let {id} = req.params;
        let category = await Category.findOne({_id: id})
        res.render(`${views}/edit`, {category});
    }catch (e) {
        res.status(500).err(e)
    }

}

exports.update = async (req, res) => {
    let {id} = req.params;
    let {name} = req.body;
    try{
        let category = await Category.findByIdAndUpdate(id, {
            $set:
                {
                    name: name
                }
        }, {new: true})
        res.redirect("/admin/categories");
    }catch (e) {
        res.status(500).err(e)
    }

}