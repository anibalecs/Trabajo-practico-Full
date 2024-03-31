const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config(); 
const PORT = process.env.PORT || 8000;

const UsrController = require('./controllers/user');
const AuthController = require('./controllers/auth');
//const Middleware = require('./middleware/auth-middleware');
const MailController = require('./controllers/mail')


mongoose
  .connect(uri, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => {
    console.log("connedted");
  })
  .catch((err) => console.log(err))


app.use(express.json());
app.use(cors());


//acceso a la DB
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (res,req) => {
  res.statusCode(200).json("Estoy funcionando");
});

class muñeco{
  constructor(){
    
  }
}




//get de todos los usuarios
app.get("/users", Middleware.verify, async (req, res) =>{
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
app.get("/users/:id", async (req, res) => {
  let userId = req.params.id;
  try{
    user = await UsrController.getUser(userId);
    res.status(200).json(user);
  } catch(error){
      res.status(500).send("Error");
  }
});

//crar nuevo usuario
app.post("/users", async (req,res) => {
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
app.put("/users/:id", async (req, res) => {
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

//elimino un usuario
app.delete("/users/:id", async(req, res) => {
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

app.put("/users/:id/roles", async (req, res) => {
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

app.post("/auth/login", async (req, res) => {
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

//manda un email
MailController.sendMail();


app.get("/muñeco", (req, res) => {
    let resultado = {
       'Oso':{'precio':20500, 'medida':70, 'color':'', 'accesorios':''},
       'Conejo':{'precio':12000, 'medida':30, 'color':'', 'accesorios':''},
       'Perro':{'precio':15700, 'medida':50, 'color':'', 'accesorios':''},
       'Mapache':{'precio':18000, 'medida':60, 'color':'', 'accesorios':''},
       'Gato':{'precio':14200, 'medida':40, 'color':'', 'accesorios':''}
    }
    res.json({'muñeco':resultado})
});

app.get("/color", (req, res) => {
    res.send("Hola mundo.");
    let resultado = {
       '1':'rosa', 
       '2':'amarillo', 
       '3':'verde'
    }
    res.json({'color':resultado})
});

app.get("/accesorios", (req, res) => {
    res.send("Hola mundo.");
    let resultado = {
       '1':'camiseta y pelota de futbol',
       '2':'guitarra electrica',
       '3':'notebook',
       '4':'sin accesorios'
    }
    res.json({'accesorios':resultado})
});

app.post("/eleccion", (req, res)=>{
    res.end('llamada post')
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});