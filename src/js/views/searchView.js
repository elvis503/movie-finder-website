const resultsContainer = document.querySelector(".results-container");

export const displayResults = (results) => {
    resultsContainer.innerHTML = "";
    
    results.forEach(element => {
        renderMarkup(element);
    });
};

const renderMarkup = (result) => {
    const markup = `
        <article class="result">
            <h1 class="result-id">${result.imdbID}</h1>
            <h2 class="result-name">${result.Title} (${result.Year})</h2>
            <p class="result-type">${result.Type}</p>
            <img class="result-poster" src= ${result.Poster}>
        </article>
    `;

    resultsContainer.insertAdjacentHTML("beforeend", markup);
};

export const getTitleClick = (fn) => {
    const results = document.querySelectorAll(".result-name");

    results.forEach(element => {
        element.addEventListener("click", e => {
            const titleID = e.target.closest(".result").querySelector(".result-id").innerHTML;
            fn(titleID);
        })
    })
};

export const searchPageAnimation = () => {
    const resultsPage = document.querySelector(".results-page");
    resultsPage.classList.add("results-animation-up")
};



