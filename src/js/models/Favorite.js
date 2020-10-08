const axios = require("axios");

export default class Favorite{
    constructor(movieID){
        this.movieID = movieID
    }

    async addFavorite(token){
        const options = {
            url: `https://movie-finder-api-elvisduv.herokuapp.com/user/update/add/${this.movieID}`,
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data:{}
        };

        try{
            const response = await axios(options);
            
            if(response.status === 200){
                console.log(response.data)
            }
            
        }catch(error){
            alert(error.response.data.error)
        }
    }
}