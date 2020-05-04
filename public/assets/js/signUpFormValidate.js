const registerForm    = document.getElementById("registerForm")
const fName           = document.getElementById("fName")
const lName           = document.getElementById("lName")
const email           = document.getElementById("email")
const password        = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")

const fNameError           = document.getElementById("fNameError")
const lNameError           = document.getElementById("lNameError")
const emailError           = document.getElementById("emailError")
const passwordError        = document.getElementById("passwordError")
const confirmPasswordError = document.getElementById("confirmPasswordError")

registerForm.onsubmit = (e) => {
    e.preventDefault() 
    if(validateForm()){
        registerForm.submit();
    }                        
}



function validateForm() {
    let isValid = true;
    fNameError.innerHTML = "";
    lNameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";

    if (!fName.value) {
        fNameError.innerHTML = "First Name can not be empty";
        isValid = false;
    }
    
    if (!lName.value) {
        lNameError.innerHTML = "Last Name can not be empty";
        isValid = false;
    }

    if (!password.value) {
        passwordError.innerHTML = "Password can not be empty";
        isValid = false;
    } else if (password.value.length < 8) {
        passwordError.innerHTML = "Password must be at least 8 characters";
        isValid = false;
    } 
    

        if (confirmPassword.value != password.value) {
            confirmPasswordError.innerHTML = "Password does not match"
            isValid = false;
        }
    
  

    if (!validateEmail(email.value)) {
        emailError.innerHTML = "Not a valid email";
        isValid = false;
    } 


    return isValid;
}

function validateEmail(email){
    var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
    return re.test(String(email).toLowerCase())

}

