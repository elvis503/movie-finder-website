const axios = require("axios");

export default class Register{
    constructor(email, username, password){
        this.email = email
        this.username = username
        this.password = password
    }

    async registerNewUser(){
        const options = {
            url: "https://movie-finder-api-elvisduv.herokuapp.com/user/create",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            data:{
                email: this.email,
                username: this.username,
                password: this.password
            }
        }

        try{
            const response = await axios(options);
            if(response.status === 201){
                return response;
            }
            

        }catch(error){
            alert(error.response.data.error)
        }
    }
}