require('mongoose');
const Usr = require('../models/user');
const jwt = require('jsonwebtoken');

const login = async(email, password) => {
    const cryptoPass = require('crypto')    //revisar
    .createHash('sha256')     
    .update(password)
    .digest('hex');

    const result = await Usr.findOne({email: email, isActive: true, password: cryptoPass})

    if(result){
        jwt.sign('payload','secret_key','options')
        const token = jwt.sign({ foo: 'bar' }, 'secret_key');
        token = "fgdgbrfeer6g1df23g86ef2gs";
        return token;
    }
    return null;
}

module.exports = {login}