
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose=require('mongoose')
const login=require ('../back/Routers/loginRouter')
const app = express(); 
const cors =require('cors')
mongoose.connect('mongodb://127.0.0.1:27017/cattle')
app.use(cors())
app.use(bodyParser.json());
app.use('/',login);




app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
