const User = require('../../models/User')

exports.signUp = (req, res) => {
    res.render('front/signUp')
}


exports.register = async(req, res, next) => {
    let {fName, lName, email, password, confirmPassword} = req.body;
        const newUser = new User({
            fName,
            lName,
            email,
            password,
        })
          try{
            const newOne = await newUser.save()
            console.log("succededddddddddddddddddddddddddddddddd")
            res.redirect('/signUp')
          }  
            catch(err){
                console.log("errrrrrrrrrrrrrrrrrrrror")
                console.log(err.code)
                res.redirect('/signUp')
            }
       
     
        

    
}
