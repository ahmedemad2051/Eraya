const searchBar = document.getElementById("searchBar")
const searchForm = document.getElementById("searchForm")
const searchBarError = document.getElementById("searchBarError")
const submitForm = document.getElementById("submitForm")
// searchForm.onsubmit = (e) => {
//     e.preventDefault()
//     if(!searchBar.value){
//         searchBarError.innerHTML = "please type any thing"
//     }else{
//         searchForm.submit()
//     }
// }
submitForm.addEventListener("click", function(){
    console.log("yess")
    if(!searchBar.value){
        searchBarError.innerHTML = "please type any thing"
    }else{
        searchForm.submit()
    }
})