const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// const objDate=new Date();
const SchemaFinalTaskMongodb= new mongoose.Schema({
  name_playlist: {
    type: String,
    required:true
  },
  playlist_list: [{
    _id:false,
    object_id:{
    type: Schema.Types.ObjectId,
    ref:'booktask4'
    // required:true
    },
    added:{
      type:Date
    }
  }],
  
},
{timestamps:true},
{strict:false}
);

const SchemaSongs = new mongoose.Schema({
  artis:  {
    type: String,
    required: true
    },

    albumSong:  {
      type: String,
      required: true
    },

    nameSong:  {
      type: String,
      required: true
    },

    genre: {
      type: String,
      required: true
    },
  
    rilis: { 
      type: Date
      },
    timePlaying: {
      type: Number
     },
     priceSong: {
      type: Number
     }
    // type: String, required: true
  
 
});

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

module.exports.modelSchemaSongs= mongoose.model('songList',SchemaSongs);
module.exports.modelSchemaFinalTaskMongodb= mongoose.model('playlist_music',SchemaFinalTaskMongodb);
module.exports.ModelbookTask4=mongoose.model('booktask4',bookSchemaTask4);
module.exports.ModelBook = mongoose.model('book',  bookSchema);
module.exports.BookSheft = mongoose.model('BookSheft',bookSheftSchema  );

