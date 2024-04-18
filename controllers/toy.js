require('mongoose');
const Toy = require('../models/toy');

const addToy = async (name, animal, color, accessories, price) => {
        const toy = new Toy({
            name: name, 
            animal: animal,
            color: color,
            accessories: accessories,
            price: price
        });

        let toyy = await toy.save();
        console.log("Nuevo toy");
        console.log(toyy);
        return{toyy};
    }  

const getToy = async (id) =>{
    const toyy = await Toy.findById(id);
    await Toy.findOne({ _id: req.params.id})
    return toyy;
}

const deleteToy = async (id) => {
    const result = await Toy.findByIdAndDelete(id);
    return result;
}

const bringRanking = async ()=>{
    const results = await Toy.aggregate([
        {$group: {_id:'$animal', count: { $sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 3}
    ]);

    return results;
}

module.exports = {addToy, getToy, deleteToy, bringRanking}