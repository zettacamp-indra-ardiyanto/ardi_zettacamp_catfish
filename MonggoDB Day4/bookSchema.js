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
    type: String,
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
  name:  {
    type: String,
    required: true
    },

  list_book:  [{
    type: Schema.Types.ObjectId,
    ref:'BookSheft'

    }],


    // type: String, required: true
  
 
}]);

const bookSchemaTask4= new mongoose.Schema({
  nameBook: {
  type: String,
  required: true
  },

  book_ids: [{
    _id:false,
    Object_id:{
    type: Schema.Types.ObjectId,
    ref:'booktask4'
    },
    added:{
      type:Date,
      default:Date.now
    },
    stock:{
      type:Number

    }

  }],
  date:[{
    
    _id:false,
    dateTime:{
      type:Date
    },
    time:{
      type: String
      
    }
  }],

  created_at:{
 type: Date, 
  default: Date.now
    
  },
  updated_at:{
    type: Date, 
    default: Date.now
      
    }
})

module.exports.ModelbookTask4=mongoose.model('bookTask4',bookSchemaTask4);
module.exports.ModelBook = mongoose.model('book',  bookSchema);
module.exports.BookSheft = mongoose.model('BookSheft',bookSheftSchema  );

