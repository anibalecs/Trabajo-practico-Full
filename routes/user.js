const express = require("express");
const router = express.Router();
const UsrController = require('../controllers/user');


//get de todos los usuarios
router.get("/users", async (req, res) =>{
    let limit = req.query.limit;
    let offset = req.query.offset;
  
    try{
      const results = await UsrController.getAllUsers(limit, offset);
      res.status(200).json(results);
    } catch(error){
        res.status(500).send("Error. Intente mas tarde")
    }
  });
  
//get info de un usuario
router.get("/users/:id", async (req, res) => {
    let userId = req.params.id;
    try{
      user = await UsrController.getUser(userId);
      res.status(200).json(user);
    } catch(error){
        res.status(500).send("Error");
    }
});
  
//crear nuevo usuario
router.post("/users", async (req,res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
  
    try{
      const result = await UsrController.addUser(name, lastname, email, isActive, password);
      if(result){
        res.status(201).send("Usuario creado correctamente");
      } else{
        res.status(409).send("El usuario ya existe");
      }
    } catch(error){
      res.status(500).send("Error al crear el usuario.");
    }
});
  
//modifico un usuario 
router.put("/users/:id", async (req, res) => {
    const user = {_id: req.params.id, ...req.body};
    try{
      const result = await UsrController.editUser(user);
      if(result){
        res.status(200).json(result);
      } else{
        res.status(404).send("El usuario no existe.");
      }
    } catch(error){
        res.status(500).send("Error");
    }
});
  
router.put("/users/:id/roles", async (req, res) => {
    const roles = req.body.roles;
    //const user = { _id: req.params.id, ...req.body };
    try{
      const result = await UsrController.editRoles(roles, req.params.id);
      if(result){
        res.status(200).jeson(result);
      } else{
        res.status(404).send("El usuario no existe.");
      }
    } catch(error){
      res.status(500).send("Error");
    }
});

//elimino un usuario
router.delete("/users/:id", async(req, res) => {
    try{
      const result = await UsrController.deleteUser(req.params.id);
      if(result){
        res.status(200).send("Usuario borrado")
      } else{
        res.status(404).send("No se ha podido eliminar el usuario.")
      }
    } catch(error){
      res.status(500).send("Error")
    }
});
  

module.exports = router;