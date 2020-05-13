const searchBar = document.getElementById("searchBar")
const searchForm = document.getElementById("searchForm")
const searchBarError = document.getElementById("searchBarError")
searchForm.onsubmit = (e) => {
    e.preventDefault()
    if(!searchBar.value){
        searchBarError.innerHTML = "please type any thing"
    }else{
        searchForm.submit()
    }
}