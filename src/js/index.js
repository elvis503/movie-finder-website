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
const favoritesBtn = document.querySelector("#view-favorites-btn")

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

favoritesBtn.addEventListener("click", () => {
    overlayView.toggleOverlay();
    controlFavorites();
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

        }else{
            //ERROR API ALERT
        }
        
    } catch (error) {
        alert({error: error.message});
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

const controlFavorites = async () => {

}

const controlLogout = async () => {
    const logout = new Logout();
    const status = await logout.logoutUser(state.login.currentUser.token);

    if(status === 200){
        state.login = null;
        loginBtn.textContent = "Log In"
    }else{
        alert("There has been an error with the server, please try again.")
    }
}


