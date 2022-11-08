const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const userSchema =new mongoose.Schema({
    first_name: {
        type: String
       
    },
    last_name: {
        type: String

    },
    password:{
        type: String

    },
    email: {
        type: String,
         unique: true
    },
    status:{
        type:String,
        enum : ['active','deleted'],
        default: 'active'
    }
})

module.exports.modelUserSchema= mongoose.model('users',userSchema);
