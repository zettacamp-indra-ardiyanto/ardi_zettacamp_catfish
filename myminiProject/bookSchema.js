const mongoose = require('mongoose');
const {Schema} = require('mongoose');

// const objDate=new Date();

const userSchema = new mongoose.Schema({ 
  username: String,
  password: String,
  role: String,
  active: Boolean
}, {timestamps: true});

const SchemaFinalTaskMongodb= new mongoose.Schema({
  name_playlist: {
    type: String,
    // required:true
  },
  playlist_list: [{
    song_id:{
    type: Schema.Types.ObjectId,
    ref:'songList'
    // required:true
    },
    added:{
      type:String
    }
  }],
  
},
{timestamps:true},
{strict:false}
);

const SchemaSongs = new mongoose.Schema({
  artis:  {
    type: String
    // required: true
    },

    albumSong:  {
      type: String
      // required: rue
    },

    nameSong:  {
      type: String
      // required: true
    },

    genre: {
      type: String
      // required: true
    },
  
    rilis: { 
      type: String
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
    type: String
    // required: true
    },

  author:  {
    type: String
    // required: true
    },

  publisher:  {
    type: String
    // required: true
    },

  price: {
    type: Number
    // required: true
    }
},
  {timestamps:true},
  {strict:false}
);

const rakBukuSchema = new mongoose.Schema({
  names: {
    type: String
  },
  list_book:[{
    _id:false,
    object_id:{
      type: Schema.Types.ObjectId,
      ref: 'book'
    }
  }]
});


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
    ref:'book'
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
module.exports.BookSheft = mongoose.model('BookSheft',rakBukuSchema  );
module.exports.modelLogin = mongoose.model('user',userSchema  );

