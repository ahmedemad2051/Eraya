const User = require('../../models/User')
const bcrypt = require('bcrypt');
const session = require("express-session")
const index = require('../../index')

const express = require('express');
const app = express();


session.name = "mohamed"


exports.signIn = (req, res) => {
    res.render('front/signIn')
}






exports.login = async(req, res, next) => {
    
    let {email, password} = req.body
    let validation = validateSignInForm(email, password)
    if (validation[0]){
        try{
            let user = await User.findOne({email: email})
            if(!user){
                req.flash('info', "Invalid Email OR Password.")
                res.redirect('/signin')
            }else{
                let isEqual= await bcrypt.compare(password, user.password);
                if(isEqual){

                    req.session.userId = user.id
                    sessionUserId = user.id
                    app.locals.sayHi = "hi"
                    await req.session.save()
                    res.redirect('/home')
                }else{
                    req.flash('info', "Invalid Email OR Password.")
                    res.redirect('/signin')
                }
                
            }
            
        }
        catch(err){
            console.log(err)
            res.redirect('/signin')    
        }
    }else{
         
        for(var i=0; i<validation.length; i++){
            req.flash("info", validation[i])
            console.log(validation[i])
        }
        res.redirect('/signin') 
    }
} 


function validateSignInForm(email, password) {
    let isValid = []
    isValid[0] = true
    if (!validateEmail(email)) {
        isValid[0] = false
        isValid.push("Not a valid email format")
      }
    if (!password) {
        isValid[0] = false
        isValid.push("password can't be empty")
        
    } else if (password.length < 8) {
        isValid[0] = false
        isValid.push("password must bt at least 8 characters")       
    }

      return isValid
}

function validateEmail(email){
    var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return re.test(String(email).toLowerCase())
  
  }

exports.homeRender =async (req, res, next) =>{
    const user =await User.findOne({_id: req.session.userId})
    res.render('front/profile', {userId: req.session.userId})
}


exports.redirectLogin =async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/signin')
    }
    else{
        next()
    }
}
exports.redirectHome = (req, res, next) =>{
    if(req.session.userId){
        res.redirect('/home')
    }else{
        next()
    }
}




exports.logOut = async(req, res, next)=>{
    console.log(req.session)
    req.session.destroy(err =>{
        if(err){
            res.redirect('/home')
        }
        res.clearCookie('sid')
        res.redirect('/')
    })
}