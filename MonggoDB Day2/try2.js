const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

const kittySchema = new mongoose.Schema({
    name: String
  });

  const kitten = mongoose.model('Kitten', kittySchema);

  const silence = new kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'

kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };
  
//   const kitten = mongoose.model('Kitten', kittySchema);

  const fluffy = new kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"



const kittens =  kitten.find();
console.log(kittens);