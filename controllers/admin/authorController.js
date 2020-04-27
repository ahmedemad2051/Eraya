const Author = require('../../models/Author');

let views = "admin/author"

exports.index = async (req, res) => {
    try {
        let authors = await Author.find({});
        res.render(`${views}/index`, {authors: authors});
    } catch (e) {
        res.json({err: e})
    }
}

exports.create = (req, res) => {
    res.render(`${views}/create`);
}

exports.store = async (req, res) => {
    let {fname, lname, dob} = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let avatar = req.files.avatar;
    let imgName = avatar.md5 + avatar.name;

    try {
        await avatar.mv(`public/upload/authors/${imgName}`);
        let author = await Author.create({
            fname: fname,
            lname: lname,
            dob: dob,
            image: imgName,
        });
        res.redirect("/admin/authors");
    } catch (err) {
        return res.status(500).send(err);
    }
}