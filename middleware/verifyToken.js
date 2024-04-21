const jwt = require('jsonwebtoken');
const Usr = require('../models/user');

const verifyToken = async (req, res, next) => {
    let token = req.headers['authorization'];
    token = token.replace("Bearer ", "");
    if(!token){
        return res.status(401).send("Token no proporcionado");
    }
    try{
        const decode =  jwt.verify(token, process.env.SECRET_KEY_TOKEN);
        const user = await Usr.findOne({email: decode.email});
        req.userId = user._id;
        req.user = user;
        next();
    } catch(error){
        res.status(403).send("No autorizado");
    }     
}

module.exports = {verifyToken}