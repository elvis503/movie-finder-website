export const displayResults = (results) => {
    results.forEach(element => {
        renderMarkup(element);
    });
}

const renderMarkup = (result) => {
    const resultsContainer = document.querySelector(".results-container");
    const markup = `
        <article class="result">
            <div class="left-column">
                <h2 class="movie-title ">${result.Title} (${result.Year})</h2>
                <p class="movie-desc">${result.Type}</p>
            </div>
            <div class="right-column">
                <img class="movie-poster" src= ${result.Poster}>
                <i class=material-icons id="star">star</i>
                <h3 class="movie-rating">IMDB Rating: 8/10</h3>
            </div>
        </article>
    `;

    resultsContainer.insertAdjacentHTML("beforeend", markup);
};





