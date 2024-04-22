const express = require("express");
const router = express.Router();
const ToyController = require('../controllers/toy');
const {verifyToken} = require('../middleware/verifyToken');

//crear nuevo toy
router.post("/private/toys", verifyToken, async (req, res) => {
    let {name, animal, color, accessories, price} = req.body;
    const userId = req.userId;
    try{
        const result = await ToyController.addToy(name, animal, color, accessories, price, userId);
        if(result){
            res.status(201).send("toy creado correctamente");
        } 
    } catch(error){
        console.log(error);
        res.status(500).send("Error al crear toy.");
    }
});

//get info de un toy
router.get("/private/toys/:id", verifyToken, async (req, res) => {
    let toyId = req.params.id;
    try{
        const toy = await ToyController.getToy(toyId);
        res.status(200).json(toy);
    } catch(error){
        console.log(error); 
        res.status(500).send("Error");
    }
});

//eliminar toy
router.delete("/private/toys/:id", verifyToken, async (req, res) => {
    const userId = req.userId;
    try{
        const result = await ToyController.deleteToy(req.params.id, userId);
        if(result){
            console.log(result);
            res.status(200).send("Toy eliminado")
        } else{
            res.status(404).send("No se pudo eliminar el toy")     
        }
    } catch(error){
        console.log(error);
        res.status(500).send("Error")
    }
});

//ranking público 
router.get("/ranking/toys", async (req, res) => {
    try{
        const results = await ToyController.bringRanking();
        res.status(200).json(results);
    } catch(error){
        res.status(500).send("Error, no se puedo generar el ranking")
    }
});

//get todos los toys de un usuario
router.get("/private/allUsr/toys", verifyToken, async (req, res) => {
    const userId = req.userId; 
    try{ 
        const toys = await ToyController.getAllToysUsr(userId);
        res.status(200).json(toys);
    } catch(error){
        console.log(error);
            res.status(500).send("Error")
    }
    }); 

module.exports = router;