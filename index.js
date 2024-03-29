const express = require("express"); 
const app = express();
app.use(express.json());
const http = require("http").createServer(app);
require('dotenv').config(); 
const PORT = process.env.PORT || 8000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.urlMongoDb;

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


app.post("/login", (req, res)=>{
    const datosUsuario = req.body;
    console.log(datosUsuario);
    res.send(datosUsuario);
})

app.get("/categorias", (req, res) => {
    res.send("Hola mundo.");
    let resultado = {
       'Oso':{'precio':20500, 'medida':70, 'color':'', 'accesorios':''},
       'Conejo':{'precio':12000, 'medida':30, 'color':'', 'accesorios':''},
       'Perro':{'precio':15700, 'medida':50, 'color':'', 'accesorios':''},
       'Mapache':{'precio':18000, 'medida':60, 'color':'', 'accesorios':''},
       'Gato':{'precio':14200, 'medida':40, 'color':'', 'accesorios':''}
    }
    res.json({'muñeco':resultado})
})

app.get("/color", (req, res) => {
    res.send("Hola mundo.");
    let resultado = {
       '1':'rosa', 
       '2':'amarillo', 
       '3':'verde'
    }
    res.json({'color':resultado})
})

app.get("/accesorios", (req, res) => {
    res.send("Hola mundo.");
    let resultado = {
       '1':'camiseta y pelota de futbol',
       '2':'guitarra electrica',
       '3':'notebook',
       '4':'sin accesorios'
    }
    res.json({'accesorios':resultado})
})

app.post("/eleccion", (req, res)=>{
    res.end('llamada post')
})

http.listen(PORT,()=>{
    console.log(`server corriendo  ${PORT}`);
})