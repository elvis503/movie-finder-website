const axios = require("axios");

export default class Search{
    constructor(query){
        this.query = query;
    }

    async searchMovie(){
        const options = {
            url: "https://video-club-api.herokuapp.com/api/services/searchMovies",
            method: "POST",
            data:{
                title: this.query,
            }
        };
    
        await axios(options)
        
        .then(response => {
            this.results = response.data;
        })
        .catch(err => console.log(err))
    };
}



