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

module.exports.modelIngerdientsSchema= mongoose.model('ingredients',ingerdientsSchema);
