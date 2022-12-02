require('dotenv').config();
const jwt = require('jsonwebtoken');
// const GenericController = require("./GenericController");

class Jwt{
    generateToken(data){
        return jwt.sign({
            // exp: new Date(2022, 10, 26, 13, 0, 0),
            data: data,
        }, process.env.SECRET_KEY, { 
            expiresIn: '1h',
            algorithm: 'HS256',
            });
    }



    verifyToken(token){
        if(token === undefined){
            return{
                result: "Você precisa passar um token",
                status: 400
            }
        }
        token = token.replace("jwt ", "");
        try {
            return{
                result: jwt.verify(token, process.env.SECRET_KEY),
                status:200,
            }
        } catch (err) {
            // if(err.toString().indexOf('jwt expired') > - 1 ){   ---> outra opção
                if(err.toString() === "TokenExpiredError: jwt expired"){
                return{
                    result: "Token expirado",
                    status: 401,
                };
            }else{
                return{
                    result: err,
                    status: 500,
                };
            }    
        }




        return jwt.verify(token, process.env.SECRET_KEY);
    }

}

module.exports = Jwt;