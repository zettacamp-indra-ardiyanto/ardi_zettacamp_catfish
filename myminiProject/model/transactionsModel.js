const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const transactionSchema =new mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'

      },
     menu: [{
  
        receipe_id:{
        type: Schema.Types.ObjectId,
        ref:'receipts'
        // required:true
        },
        amount:{
          type:Number
    
        },
        note:{
          type: String
        }
      }],
     order_status:{
        type: String,
        enum: ['success','failed'],
        default:'success'
     },
     order_date:{
      type:Date,
      default: new Date()
    },
    status:{
      type: String,
      enum: ['activate','deleted'],
      default:'activate'
    }
})

module.exports.modelTransactionSchema= mongoose.model('transactions',transactionSchema);