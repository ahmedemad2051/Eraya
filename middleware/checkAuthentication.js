exports.isAdmin = async(req, res, next)=>{
    if(req.session.isAdmin){
        next()
    }else{
        res.redirect('/')
    }
}

exports.redirectHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/')
    }else{
        next()
    }
}
