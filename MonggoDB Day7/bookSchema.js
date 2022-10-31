const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const bookSchema = new mongoose.Schema({
  title:  {
    type: String,
    required: true
    },

  author:  {
    type: String,
    required: true
    },

  publisher:  {
    type: String,
    required: true
    },

  price: {
    type: Number,
    required: true
    },
  
  created: { 
    type: Date, 
    default: Date.now },
  updated: {
    type: Date, 
  default: Date.now },
    // type: String, required: true
  
 
});


const bookSheftSchema = new mongoose.Schema([{
  names:  {
    type: String,
    required: true
    },

  list_book:  [{
    type: Schema.Types.ObjectId,
    ref:'BookSheft'

    }],

}]);
const objDate=new Date();
const bookSchemaTask4= new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  book_ids: [{
    _id:false,
    object_id:{
    type: Schema.Types.ObjectId,
    ref:'booktask4'
    // required:true
    },
    added:{
      type:Date
    },
    stock:{
      type:Number

    }

  }],
  
  date:[{
    
    _id:false,
    date:{
      type:Date,
      default: new Date()
    },
    time:{
      type: String,
      default: `${objDate.getHours()}:${objDate.getMinutes()}`,
      
    },
  },
],
},
{timestamps:true},
{strict:false}
);

module.exports.ModelbookTask4=mongoose.model('booktask4',bookSchemaTask4);
module.exports.ModelBook = mongoose.model('book',  bookSchema);
module.exports.BookSheft = mongoose.model('BookSheft',bookSheftSchema  );

