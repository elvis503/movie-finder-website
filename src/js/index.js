import Search from "./models/Search"
import Result from "./models/Result"
import Login from "./models/Login"
import Register from "./models/Register"
import Logout from "./models/Logout"
import Favorite from "./models/Favorite"

import * as searchView from "./views/searchView"
import * as resultView from "./views/resultView"
import * as overlayView from "./views/overlayView"

const searchForm = document.querySelectorAll(".search-submit");
const loginBtn = document.querySelector(".log-in-btn");
const logoutBtn = document.querySelector("#log-out-btn");
const showFavoritesBtn = document.querySelector("#view-favorites-btn")

let state = {};

//***********************EVENT LISTENERS***************************/
searchForm.forEach((form) => {
    form.addEventListener("submit", e => {
        e.preventDefault();
        const inputValue = form.querySelector(".search-input").value
        
        if(!inputValue){
            return alert("Please enter a valid search term.")
        }

        controlSearch(inputValue);
    })
})

loginBtn.addEventListener("click", () => {
    overlayView.toggleOverlay();
    
    if(state.login){
       overlayView.loadUserOverlay(state.login.currentUser.user.username);
    }else{
        overlayView.loadDefaultOverlay(controlLogin, controlRegister);
    }
})

logoutBtn.addEventListener("click", () => {
    overlayView.toggleOverlay();
    controlLogout();
    //reload page after
})

showFavoritesBtn.addEventListener("click", () => {
    viewFavorites();
    overlayView.toggleOverlay();

})

//******************SEARCH CONTROLLER*********************************/
const controlSearch = async (input) => {
    state.search = new Search(input);

    try {
        await state.search.searchMovie();
        
        if(state.search.results){
            searchView.displayResults(state.search.results);

            searchView.getTitleClick(controlResult);
            searchView.searchPageAnimation();
        }else{
            //ERROR API ALERT
        }
        
    } catch(error) {
        alert({error: error.message});
    }
};


const controlResult = async (id) => {
    state.result  = new Result(id);

    try {
        await state.result.getTitle()
        
        if(state.result.titleDetails) {
            console.log(state.result.titleDetails)
            resultView.displayTitle(state.result.titleDetails)
            resultView.titlePageAnimation();

            controlFavorite();

        }else{
            //ERROR API ALERT
        }
        
    } catch (error) {
        alert({error: error.message});
    }
}

const controlFavorite = () => {
    if(!state.login){
        resultView.toggleFavorite();
    }else{
        if(state.login.currentUser.user.favourites.includes(state.result.titleDetails.imdbID)){
            resultView.toggleFavorite("favorite");
        }else{
            resultView.toggleFavorite("notFavorite");
        }

        document.querySelector(".favorite-btn").addEventListener("click", checkFavoriteQuery);
    }
}

const viewFavorites = async () => {
    console.log(state.login.currentUser.user.favourites)
    for(let i = 0; i < state.login.currentUser.user.favourites.length; i++){
        state.search = new Search(state.login.currentUser.user.favourites[i]);
        
        try {
            await state.search.searchFavorite();
            console.log(state.search.results)                
        } catch(error) {
            alert({error: error.message});
        }
    }

    // if(state.search.results){
    //     searchView.displayResults(state.search.results);

    //     searchView.getTitleClick(controlResult);
    //     searchView.searchPageAnimation();
    // }else{
    //     //ERROR API ALERT
    // }

}

const checkFavoriteQuery = async () => {
    state.favorite = new Favorite(state.result.titleDetails.imdbID);

    if(state.login.currentUser.user.favourites.includes(state.result.titleDetails.imdbID)){
        state.login.currentUser.user.favourites = await state.favorite.deleteFavorite(state.login.currentUser.token);
        resultView.toggleFavorite("notFavorite");
    }else{
        state.login.currentUser.user.favourites = await state.favorite.addFavorite(state.login.currentUser.token);
        resultView.toggleFavorite("favorite");
    }
}

const controlLogin = async (loginInput) => {
    const {username, password} = loginInput;
    
    if(!username || !password){
        return alert("Please complete all input fields")
    }

    state.login = new Login(username, password);
    state.login.currentUser = await state.login.loginUser();

    if(state.login.currentUser){
        loginBtn.innerText = username;
        overlayView.toggleOverlay();
    }
}

const controlRegister = async (registerInput) => {
    const {email, username, password, confirm} = registerInput;
    
    if(!email || !username || !password || !confirm){
        return alert("Please complete all input fields");
    }else if(password !== confirm){
        return alert("Password confirmation failed, both inputs must match");
    }

    const register = new Register(email, username, password);
    state.newUser = await register.registerNewUser();

    //After register, login user 

}

const controlLogout = async () => {
    const logout = new Logout();
    const status = await logout.logoutUser(state.login.currentUser.token);

    if(status === 200){
        state = null;
        loginBtn.textContent = "Log In"
    }else{
        alert("There has been an error with the server, please try again.")
    }
}


