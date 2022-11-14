const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const ingerdientsSchema =new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    stock: {
        type: Number

    },
    status:{
        type:String,
        enum : ['active','deleted'],
        default: 'active'
    }
})

// module.exports.modelIngerdientsSchema= mongoose.model('ingredients',ingerdientsSchema);


const receiptsSchema =new mongoose.Schema({
    receipt_name: {
        type: String
      
      },
      ingredients: [{
  
        ingredient_id:{
        type: Schema.Types.ObjectId,
        ref:'ingredients'
        // required:true
        },
        stock_used:{
          type:Number
    
        }
    
      }],
     status:{
        type: String,
        enum: ['active','deleted'],
        default:'active'
     }
})

module.exports.modelReceiptsSchema= mongoose.model('receipts',receiptsSchema);