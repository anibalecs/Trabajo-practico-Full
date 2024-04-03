const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const toySchema = new Schema({

    name:{
        type: String,
        required: true
    },
    animal:{
        type: String,
        enum:['perro', 'conejo', 'oso', 'mapache', 'gato'],
        required: true
    },
    color:{
        type: String,
        enum: ['rosa', 'amarillo', 'verde'],
        required: true,
        defaut: ['rosa']
    },
    accessories:{
        type: String,
        enum: ['camiseta y pelota de futbol', 'guitarra electrica', 'notebook', 'sin accesorios'],
        required: true,
        default: ['ninguno']
    },
    price:{
        type: Number,
        required: true
    }

}, {timestamps: true}).set('toJSON',{   // revisar esto
    transform: (document, object) => {
        object.id = document.id;
        delete object._id;
    }
 
});

const toySch = mongoose.model('toySch', toySchema);
module.exports = toySch;