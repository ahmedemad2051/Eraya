const fs = require('fs')
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
    let imgName = Math.floor(Math.random() * Math.floor(9999999999)) + avatar.name;
    let imgPath = `upload/authors/${imgName}`;
    try {
        await avatar.mv(`public/${imgPath}`);
        await Author.create({
            fname: fname,
            lname: lname,
            dob: dob,
            image: imgPath,
        });
        res.redirect("/admin/authors");
    } catch (err) {
        return res.status(500).send(err);
    }
}


exports.edit = async (req, res) => {
    try {
        let {id} = req.params;
        let author = await Author.findOne({_id: id})
        res.render(`${views}/edit`, {author});
    } catch (e) {
        res.status(500).err(e)
    }

}

exports.update = async (req, res) => {
    let {id} = req.params;
    let {fname, lname, dob} = req.body;

    try {
        let author= await Author.findOne({_id: id});
        let data = {
            fname: fname,
            lname: lname,
            dob: dob,
        };
        if (req.files) {
            let avatar = req.files.avatar;
            let imgName = Math.floor(Math.random() * Math.floor(9999999999)) + avatar.name;
            let imgPath = `upload/authors/${imgName}`;
            await avatar.mv(`public/${imgPath}`);
            // remove old image
            fs.unlink(`public/${author.image}`,(e)=>{
                if(e){
                    console.log(e)
                }
            });
            data['image'] = imgPath;
        }
        await Author.findByIdAndUpdate(id, {$set: data}, {new: true})
        res.redirect("/admin/authors");
    } catch (e) {
        res.status(500).write(e)
    }

}

exports.destroy = async (req, res) => {
    let {id} = req.params;
    try {
        await Author.findByIdAndRemove(id)
        res.status(200).json({"msg": 'success'});
    } catch (e) {
        res.status(500).err(e)
    }
}