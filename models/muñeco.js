const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const muñSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    animal:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    accessories:{
        type: String,
        required: true,
        default: ['ninguno']
    },
    price:{
        type: Number,
        required: true
    }



})