const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const bookSchema = new mongoose.Schema({
  name:  {
    type: String,
    required: true
    },

  list_book:  [{
    type: Schema.Types.ObjectId,

    }],


    // type: String, required: true
  
 
});

module.exports = mongoose.model('Book',  bookSchema)

