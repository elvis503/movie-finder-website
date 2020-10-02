const axios = require("axios");

export default class Login{
    constructor(username, password){
        this.username = username;
        this.password = password
    }

    async loginUser(){
        const options = {
            url: "https://movie-finder-api-elvisduv.herokuapp.com/user/login",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data:{
                username: this.username,
                password: this.password
            }
        };

        try{
            const response = await axios(options);
            
            if(response.status === 200){
                return response.data
            }
            
        }catch(error){
            alert(error.response.data.error)
        }
    }
}