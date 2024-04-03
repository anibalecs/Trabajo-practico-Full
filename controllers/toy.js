require('mongoose');
const Toy = require('../models/toy');

const addToy = async (name, animal, color, accesories, price) => {
    
    
   /*  if(){
        const toy = new Toy({
            name: name, 
            animal: animal,
            color: color,
            accessories: accesories,
            price: price
        });

        let toyy = await toy.save();
        console.log("Nuevo toy");
        console.log(toyy);
        return{toyy};
    } else{
        return false;
    } */
}

const getToy = async (id) =>{
    const toyy = await Toy.findById(id);
    await Toy.findOne({ _id: req.params.id})
    return toyy;
}