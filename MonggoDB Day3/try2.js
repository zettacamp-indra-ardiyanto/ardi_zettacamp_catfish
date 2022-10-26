const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.post('/create',express.urlencoded({extended:true}) ,async (req, res) => {
    const{name}=req.body;
    const silence = new kitten({ name});
    console.log('hasil:',silence.name);
   let savebook= await silence.save();
    res.send(savebook)
})

app.get('/crea',express.urlencoded({extended:true}) ,async (req, res) => {
  const{name}=req.body;
  const silence = new kitten({ name});
  console.log('hasil:',silence.name);
 let savebook= await silence.save();
  res.send(savebook)
})

app.post('/create',express.urlencoded({extended:true}) ,async (req, res) => {
  const{name}=req.body;
  const silence = new kitten({ name});
  console.log('hasil:',silence.name);
 let savebook= await silence.save();
  res.send(savebook)
})

app.listen(3000);

//database 
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
 
}

//schema
const kittySchema = new mongoose.Schema({
    name: String
  });

  //model
  const kitten = mongoose.model('Kitten', kittySchema);

  //created




const kittens =  kitten.find();
console.log(kittens);