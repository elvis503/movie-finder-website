const titleContainer = document.querySelector(".title-display");

export const displayTitle = (details) => {
    //Erase previous result
    titleContainer.innerHTML = "";

    const markup = `
            <div class="btns-container">
                <button class="close-results-btn">
                    <i class="material-icons">close</i>
                </button>

                <button class="favorite-btn">
                    <i class="material-icons">favorite_border</i>
                </button>
            </div>
            <h1 class="title-name">${details.Title} (${details.Year})</h1>
            <div class="title-details">
                <h2 class="title-type">${details.Type}</h2>
                <h2 class="title-director">Director: ${details.Director}</h2>
                <h2 class="title-genre">Genres: ${details.Genre}</h2>
                <h2 class="title-country">Country: ${details.Country}</h2>
            </div>
            <ul class="title-actors">Starring:
                <li class="actor">${details.Actors}</li>
            </ul>
            <h2 class="title-description">${details.Plot}</h2>
            <div class="title-poster">
                <img src=${details.Poster}>
            </div>
            <div class="additional-info">    
                <h2 class="title-rating">${details.Rated}</h2>
                <h2 class="title-runtime">Duration: ${details.Runtime}</h2>
                <ul class="title-critic-ratings">Critic Rating
                    <span>
                        <i class="material-icons">star</i>
                    </span>
                    <li class="rating">Metacritic: 8</li>
                    <li class="rating">Rotten Tomatoes: 8.9</li>
                    <li class="rating">IMDB: 9.3</li>
                </ul>
            </div>
    `;

    titleContainer.insertAdjacentHTML("afterbegin", markup)
}

export const titlePageAnimation = () => {    
    titleContainer.classList.remove("title-animation-right");
    titleContainer.classList.add("title-animation-left");

    document.querySelector(".close-results-btn").addEventListener("click", () => {
        titleContainer.classList.add("title-animation-right");
    })
}
