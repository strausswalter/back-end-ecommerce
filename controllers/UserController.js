const User = require("../models/User");


class UserController{
    getUser(id){
        return{
            id: 1,
            name: "Fulano de Tal",
        };
    }

    getUsers(){
        return [
            {
                id: 1,
                name: "Fulano de Tal 01",
            },
            {
                id: 2,
                name: "Michael Jackson",
            },
        ];
    }
}

module.exports = UserController;