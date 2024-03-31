const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require('dotenv').config(); 
const PORT = process.env.PORT || 8000;
const uri = process.env.DB_URI;
const userRoutes = require("./routes/user");

const MailController = require('./controllers/mail')
const AuthController = require('./controllers/auth');

app.use(express.json());
app.use(cors());

//middleware
app.use('/api', userRoutes);


//mongo db connection
mongoose
  .connect(uri, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => {
    console.log("connedted");
  })
  .catch((err) => console.log(err))


app.get('/', (res,req) => {
  res.statusCode(200).json("Estoy funcionando");
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
//MailController.sendMail();     hay un problema en con  la autnetificacion en el controller mail y en el env


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
    res.end('llamada post')//quitar
});

http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});