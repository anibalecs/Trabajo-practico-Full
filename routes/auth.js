const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth')


router.post("/auth/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try{
      const result = await AuthController.login(email, password);
      if(result){
        res.status(200).json(result);
      } else{
        res.status(401).send("No puede estar aqui")
      }
    } catch(error){
      res.status(500).send("Error");
    }
});


module.exports = router;