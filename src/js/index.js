
import Search from "./models/Search";
import * as searchView from "./views/searchView";

const resultsPagePath = "/results.html";
const searchForm = document.querySelector(".search-submit");

let state = {};

const controlSearch = async () => {
    const searchInput = document.querySelector(".input-search").value;
    state.search = new Search(searchInput);

    try {
        await state.search.searchMovie();
        navigateResultsPage(state.search.results);

    } catch (err) {
        alert(err);
    }

}

const navigateResultsPage = results => {
    history.pushState({ results }, "", resultsPagePath);
    window.location.href = resultsPagePath;
}

searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});

if (window.location.pathname === resultsPagePath) searchView.displayResults(history.state.results);