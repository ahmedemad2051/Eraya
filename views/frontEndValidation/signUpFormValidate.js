const registerForm = document.getElementById("registerForm")
function fromScript(params) {


}

    registerForm.onsubmit = (params) => {
        params.preventDefault()
        console.log("from your js script")
    }


// registerForm.onsubmit = (e) => {
//     e.preventDefault() 
//     if(validateForm()){
//         registerForm.submit();
//     }                        
// }