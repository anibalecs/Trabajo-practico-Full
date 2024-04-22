require('mongoose');
const { default: mongoose } = require('mongoose');
const Toy = require('../models/toy');
const Usr = require('../models/user');

const addToy = async (name, animal, color, accessories, price, userId) => {
        const toy = new Toy({
            name: name, 
            animal: animal,
            color: color,
            accessories: accessories,
            price: price
        });

        let toyy = await toy.save();
        const id = await toyy._id;
        
        await Usr.findByIdAndUpdate(userId, {
            $addToSet:{plushToys: id}
        });

        console.log("Nuevo toy");
        console.log(toyy);
        return{toyy};
    }  

const getToy = async (id) =>{
    const toyy = await Toy.findById(id);
    return toyy;
}

const deleteToy = async (id, userId) => {
        id = id.replace("\n", "");
        const result = await Toy.findByIdAndDelete(id);
        const objectId = new mongoose.Types.ObjectId(id);
        await Usr.findByIdAndUpdate(userId, {
            $pull: { plushToys: objectId }
        });
        return result;  
}

const bringRanking = async () => {
    const results = await Toy.aggregate([
        {$group: {_id:'$animal', count: { $sum: 1}}},
        {$sort: {count: -1}},
        {$limit: 3}
    ]);

    return results;
}

const getAllToysUsr = async(userId) =>{
    const user = await Usr.findById(userId);
    const toysIds = user.plushToys;
    const toys = await Toy.find({_id: {$in: toysIds}})
    return toys;
}

module.exports = {addToy, getToy, deleteToy, bringRanking, getAllToysUsr}