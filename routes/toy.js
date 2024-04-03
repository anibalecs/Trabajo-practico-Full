const express = require("express");
const router = express.Router();
const ToyController = require('../controllers/toy');

//crear nuevo toy
router.post("/toys", async (req, res) => {
    let name = req.body.name;
    let animal = req.body.animal;
    let color = req.body.color;
    let accessories = req.boody.accessories;
    let price = req.body.price;

    try{
        const result = await ToyController.addToy(name, animal, color, accessories, price);
        if(result){
            res.status(201).send("toy creado correctamente");
        } 
    } catch(error){
        res.status(500).send("Error al crear toy.");
    }
});

//get info de un toy
router.get("/toys/:id", async (req, res) => {
    let toyId = req.params.id;
    try{
        toy = await ToyController.getToy(toyId);
        res.status(200).json(toy);
    } catch(error){
        res.status(500).send("Error");
    }
});

module.exports = router