const axios = require("axios");

export default class Logout{
    async logoutUser(token){
        const options = {
            url: "https://movie-finder-api-elvisduv.herokuapp.com/user/logout",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        try{
            const response = await axios(options);

            if(response.status === 200){
                return response.status
                //Logged out succesfully message
            }
            
        }catch(error){
            alert(error.response.data.error)
        }
    }
}