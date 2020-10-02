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
        }

        try{
            const response = await axios(options);
            
            if(!response.data){
                throw new Error("No titles found. Please try a new search term.");
            }

            this.results = response.data;
            
        }catch(error){
            alert(error.message)
        }
    }
}



