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
        let validation = validateForm(fName, lName, email, password, confirmPassword)
        if(validation[0]){
          try{
            //validateExistance(email) returns true if the email in exist
            let user = await User.findOne({email: req.body.email})
            if(!user){
              const newOne = await newUser.save()
              console.log("Registered Successfully!")
              res.redirect('/')
            }else{
                console.log("This email alresdy exists")
                req.flash("info", "This email alresdy exists")
                res.redirect('/signup')
            }  
          }  
            catch(err){
                res.redirect('/signUp')
          }
        }else{
          for(var i=0; i<validation.length; i++){
            req.flash("info", validation[i])
            console.log(validation[i])
          }
          res.redirect('/signup')
        }
    
}

function validateForm(fName, lName, email, password, confirmPassword) {
  let isValid = []
  isValid[0] = true
  if (!fName) {
    isValid[0] = false
    isValid.push("First Name is required")
  }
  
  if (!lName) {
    isValid[0] = false
    isValid.push("Last Name is required")

  }

  if (!password) {
    isValid[0] = false
    isValid.push("Password is required")
      
  } else if (password.length < 8) {
    isValid[0] = false
    isValid.push("Password must be at least 8 characters")

  } 
      if (confirmPassword != password) {
        isValid[0] = false
        isValid.push("Passwords doesn't match")
      }

      if (!validateEmail(email)) {
        isValid[0] = false
        isValid.push("not a valid email format")
      }
      return isValid
}

function validateEmail(email){
  var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  return re.test(String(email).toLowerCase())

}
// exports.login = async(req, res, next) => {
// let user = await User.findOne({email: email})
 validateExistance = async (email) => {
   try{
      let user = await User.findOne({email: email})
      if(user){
        return true
      }else{
        return false
      }
     
   }catch(err){
    //  return false
    console.log(err)
   }
}
