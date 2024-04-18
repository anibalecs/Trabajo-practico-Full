const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    let token = req.headers['authorization'];
    token = token.replace("Bearer ", "");
    if(!token){
        return res.status(401).send("Token no proporcionado");
    }
    try{
        const decode =  jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        req.result= decode;
        next();
    } catch(error){
        console.log(error);
        res.status(403).send("No autorizado");
    }     
}

module.exports = {verifyToken}