const express= require('express');
const app= express();
var mongoose = require('mongoose');



app.use((req,res,next)=>{
    res.setHeader('Content-Type','text/html');
    next();
  });

app.get('/songList' ,(req, res) => {
    
   
    res.send(songSheeran(songList));
  })
  app.listen(6000);




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/db_book_purchasing');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const bookSchema=mongoose.Schema =({
    title: {
    type: String,
    required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
    
});




var Model = mongoose.model('Model', kittySchema);
// mongoose.connect('mongodb://localhost:27017/db_book_purchasing');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });


// var schemaName = new todo({
//     title: { type: String, required: true },
//     author:{ type: String, required: true }
// }

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name);

kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };
  
  const Kitten = mongoose.model('Kitten', kittySchema);

  const fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"

await fluffy.save();
fluffy.speak();

const kittens = await Kitten.find();
console.log(kittens);
