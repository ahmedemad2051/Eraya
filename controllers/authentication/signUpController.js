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
            console.log("Registered Successfully!")
            res.redirect('/signUp')
          }  
            catch(err){
                validateForm(fName, lName, email, password, confirmPassword)
                res.redirect('/signUp')
            }
    
}

function validateForm(fName, lName, email, password, confirmPassword) {

  if (!fName) {
      // flashMessage
      console.log("First Name can not be empty")
  }
  
  if (!lName) {
      // flashMessage
      console.log("Last Name can not be empty")
  }

  if (!password) {
      // flashMessage
      console.log("Password can not be empty")
  } else if (password.length < 8) {
      console.log("Password must be at least 8 characters")
      // passwordError.innerHTML = "Password must be at least 8 characters";
  } 
      if (confirmPassword != password) {
          console.log("Password does not match")
          // confirmPasswordError.innerHTML = "Password does not match"
      }

      if (!validateEmail(email)) {
        console.log("Not a valid email format")
        // emailError.innerHTML = "Not a valid email format";
      }
      User.find({'email': email}, function(err, user){
        if(user.length != 0){
          if(user[0].email){
            console.log("this email alresdy exists "+ email)
          }
        }
      }) 

}

function validateEmail(email){
  var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  return re.test(String(email).toLowerCase())

}
