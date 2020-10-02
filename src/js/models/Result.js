const axios = require("axios");

export default class Result{
    constructor(query){
        this.query = query;
    }

    async getTitle(){
        const options = {
            url: "https://video-club-api.herokuapp.com/api/services/searchMovieById",
            method: "POST",
            data:{
                imdbID: this.query,
            }
        };

        try{
            const response = await axios(options);
            this.titleDetails = response.data;

        }catch(error){
            alert(error.message);
        }
    }
}