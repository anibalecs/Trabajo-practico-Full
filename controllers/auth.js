require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email, password) => {
    const cryptoPass = require('crypto') 
    .createHash('sha256')     
    .update(password)
    .digest('hex');

const result = await Usr.findOne({email: email, isActive: true, password: cryptoPass})

    if(result){
        const payload = {
            email: result.email
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: "60m"});
        return token;
    }
    return null;
}

module.exports = {login}