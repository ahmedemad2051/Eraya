const categoryDiv = document.getElementById("categoryDiv")
const authorDiv = document.getElementById("authorDiv")
const authorInput = document.getElementById("authorInput")
const categoryInput = document.getElementById("categoryInput")
const advSearchForm = document.getElementById("advSearchForm")
const searchKeyword = document.getElementById("searchKeyword")
const advSearchBarErr = document.getElementById("advSearchBarErr")
var catVal = ''





function selectedCategory(category) {
    categoryVal = category.innerHTML
    categoryDiv.innerHTML = categoryVal
    catVal = categoryVal
    console.log(catVal)
}


function selectedAuthor(author) {
    authorVal = author.innerHTML
    authorDiv.innerHTML = authorVal
    authVal = authorVal
}

advSearchForm.onsubmit=(e)=>{
    e.preventDefault()
    if (!searchKeyword.value) {
        advSearchBarErr.innerHTML = "please type any thing"
    }else{
        authorInput.value = authorDiv.textContent
        categoryInput.value = categoryDiv.textContent
        advSearchForm.submit()
    }
}