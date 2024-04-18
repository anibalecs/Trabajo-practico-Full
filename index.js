const express = require("express"); 
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config(); 
const PORT = process.env.PORT || 8000;
const uri = process.env.DB_URI;

const userRoutes = require("./routes/user");
const toyRoutes = require("./routes/toy");
const authRoutes = require("./routes/auth")

const MailController = require('./controllers/mail')

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', toyRoutes);
app.use('/api', authRoutes);


mongoose
  .connect(uri, {useNewUrlParser:true, useUnifiedTopology: true})
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err))

  
app.get('/', (res,req) => {
  res.statusCode(200).json("Estoy funcionando");
});


//MailController.sendMail();     hay un problema en con  la autnetificacion en el controller mail y en el env


app.listen(PORT, () => {
  console.log(`Servidor levantado ${PORT}`)
}) 