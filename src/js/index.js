
import Search from "./models/Search";
import * as searchView from "./views/searchView";

const searchForm = document.querySelector(".search-submit");

let state = {};

const controlSearch = async () => {
    const searchInput = document.querySelector(".input-search").value;    
    state.search = new Search(searchInput);

    try{
        await state.search.searchMovie();
        console.log(state.search.results);
        navigateResultsPage();
        searchView.displayResults(state.search.results);
        
    }catch(err){
        alert(err);
    }
    
}

const navigateResultsPage = () => {
    window.location.href = "./results.html";
}

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});
