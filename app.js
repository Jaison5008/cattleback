
const express = require('express');
const bodyParser = require('body-parser'); 
const mongoose=require('mongoose')
const login=require ('./Routers/loginRouter')
const app = express(); 
const cors =require('cors')
//mongoose.connect('mongodb://127.0.0.1:27017/cattle') 
mongoose.connect('mongodb://jaison:WyyHBXIs3mga8vRa@ac-izcmxll-shard-00-00.x1hj1hv.mongodb.net:27017,ac-izcmxll-shard-00-01.x1hj1hv.mongodb.net:27017,ac-izcmxll-shard-00-02.x1hj1hv.mongodb.net:27017/?replicaSet=atlas-81kuyw-shard-0&ssl=true&authSource=admin')
app.use(cors())
app.use(bodyParser.json());
app.use('/',login);




app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
