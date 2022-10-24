const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
  title: {
  type: String, required: true
  
  },
  author: {
    type: String, required: true
  
  },
  publisher: {
    type: String, required: true
   
  },
  price: {
    type: String, required: true
  
  },
  created: {
    type: Date, default: Date.now
    
  },
  updated: {
    type: Date, default: Date.now 
    // type: String, required: true
  }
 
})
// Export model
module.exports = mongoose.model('Book', 
  bookSchema)