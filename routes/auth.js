const express = require("express");
const router = express.Router();
const AuthController = require('../controllers/auth')

router.post("/auth/login", async (req, res) => {
    //const email = req.body.email;
    //const password = req.body.password;
    const { email, password } = req.body;
  
    try{
      const result = await AuthController.login(email, password);
      if(result){
        res.status(200).json(result);
      } else{
        res.status(401).send("The user with this email-password combination does not exist")
      }
    } catch(error){
      res.status(500).send("Error");
    }
});


module.exports = router;