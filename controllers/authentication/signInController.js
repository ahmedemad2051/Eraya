const User = require('../../models/User')
const bcrypt = require('bcrypt');
const session = require("express-session")

const index = require('../../index')

const express = require('express');
const app = express();



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
                    req.session.fName = user.fName
                    req.session.lName = user.lName
                    req.session.isAdmin = user.isAdmin
                    await req.session.save()
                    res.redirect('/')
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




exports.redirectLogin =async (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/signin')
    }
    else{
        next()
    }
}


exports.logOut = async(req, res, next)=>{
    req.session.destroy(err =>{
        if(err){
            res.redirect('/')
        }
        res.clearCookie('sid')
        res.redirect('/')
    })
}


