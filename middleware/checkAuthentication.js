exports.isAuthenticated = async(req, res, next)=>{
    if(req.session.userId){
        res.render('front/home', {userId: req.session.userId, fName: req.session.fName, lName: req.session.lName})
    }else{
        next()
    }
}

exports.redirectHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()
    }
}
