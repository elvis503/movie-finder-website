const loginUserButton = document.querySelector("#log-in-btn");
const registerUserButton = document.querySelector("#register-btn");
const closeOverlayButton = document.querySelector(".close-overlay-btn");
const overlay = document.querySelector(".log-in-overlay");
const userContainer = document.querySelector(".user-container");
const forms = document.querySelector(".forms-container")

export const toggleOverlay = () => {
    overlay.classList.toggle("show-overlay");
    toggleView();
}

closeOverlayButton.addEventListener("click", toggleOverlay);

export const loadDefaultOverlay = (login, register) => {
    forms.style.display = "block";
    userContainer.style.display = "none"

    loginUserButton.addEventListener("click", (e) => {
        e.preventDefault();
        
        const loginData = {
            username: document.querySelector("#username-input-login").value,
            password: document.querySelector("#password-input-login").value
        }

        login(loginData);
    })

    registerUserButton.addEventListener("click", (e) => {
        e.preventDefault(); 

        const registerData = {
            email: document.querySelector("#email-input-register").value,
            username: document.querySelector("#username-input-register").value,
            password: document.querySelector("#password-input-register").value,
            confirm: document.querySelector("#confirm-input-register").value
        }

        register(registerData);
    })
}

export const loadUserOverlay = (user) => {
    forms.style.display = "none";
    userContainer.style.display = "block";

    //call login success animation
    document.querySelector("#user-header").textContent = `Logged In As ${user}`;
}

const toggleView = () => {
    const modalViews = document.querySelectorAll(".modal-section");

    document.querySelectorAll(".log-in-header").forEach((header) => {
        header.addEventListener("click", () => {
            modalViews.forEach((view) => view.classList.toggle("hide-section"));
        })
    })
}


