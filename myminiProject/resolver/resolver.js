const mongoose = require("mongoose");
const DataLoader = require('dataloader');
const {ModelBook,BookSheft,modelSchemaFinalTaskMongodb,modelSchemaSongs} = require('../bookSchema')


let resultSong;
let songMap={};
async function batchPlaylist (playlist_list){
  console.log('id loader:',playlist_list);
  const PlaylistsData= await modelSchemaSongs.find({
    _id:{
      $in:playlist_list
    }
  });
  console.log("result loader:",PlaylistsData);

  PlaylistsData.forEach((n)=>{
    songMap[n._id]=n
  });
  console.log('map loader:',songMap);
  resultSong= playlist_list.map(id=>songMap[id]);
  return resultSong;
  // return songPlaylists
  // return songPlaylists;
  
};


console.log("batch playlist:",batchPlaylist);

// console.log('test:',batchPlaylist()); 
//calling loader
const songLoader= new DataLoader(batchPlaylist);

const getPlaylistLoader=async (parent,{object_id})=>
{
  console.log(parent.song_id);
  if(parent.song_id){
    console.log('sini');
    return await songLoader.load(parent.song_id)
  }
}

const restaurantResolvers = {
  
    Query: {
        
     
      books: async()=>{
        try{
          const bookss = await modelSchemaFinalTaskMongodb.find({})
          if (!bookss) throw new Error('Book not found')
          return bookss
        }catch(error) {
            return {error: error.message}
        }
      },

      bookshefts: async()=>{
        try{
          const bookSfeft = await BookSheft.collection.find({}).toArray()
          if (!bookSfeft) throw new Error('Book not found')
          return bookSfeft
        }catch(error) {
            return {error: error.message}
        }
      },
    
    bookByid: async (parent,{id}) => {
      try{
        const findID = await modelUserSchema.findById(id)
        if (!findID) throw new Error('Sorry bro,your data unvailable now')
        return { error: null,readBOOK:findID}
      }catch (error) {
      return { error: error.message, readBOOK: null}
      }
    },

    songPlaylists: async(parent)=>{
      try{

        const playListResult = await modelSchemaFinalTaskMongodb.find({})
        if (!playListResult) throw new Error('Book not found')
        return playListResult
      }catch(error) {
          return {error: error.message}
      }
    }
      
    },
  
  
  Mutation:{

    addBook: async (parent,{data} )=>{
      console.log(data);
      const newBook = new ModelBook(data)
      await newBook.save()
      return newBook
      
    },
      
    updateBooks: async (parent,{id, title,author,publisher,price}) =>{
        try{console.log("idnyo:",id);
        console.log("datanyo:",title );
        const updatedBook = await ModelBook.findByIdAndUpdate(
          id,{
            title:title,
            author:author,
            publisher:publisher,
            price:price
          },
          {new: true}
          )
          console.log("title:",title);
        
          // updatedBook = { 
          //   updateData:updatedBook
          // }
          console.log("update book:",updatedBook);
      // if(!updatedBook) throw new Error('Failed to update book')
          return {error:null,updateData:updatedBook}
          }catch(error) {
            return {error: error.message, updateData:   null}
          } 
    },

    deleteBooks: async (parent,{id}) => {
      try{
        const deletBook = await ModelBook.findByIdAndDelete(id,{new: true})
        if (!deletBook) throw new Error('Failed to delete book')
        return { error: null,delete_book:deletBook}
      }catch (error) {
      return { error: error.message, delete_book: null}
      }
    },
      
      updateBooks: async (parent, {id, title, author,publisher, price})=>{
        let result = await ModelBook.findByIdAndUpdate(
          id,
          {
            title: title,
            author: author,
            publisher,
            price: price
          
          },{new: true}
          )
          // result = {
          //   status : `Data ${id} berhasil di Update`,
          //   data_books: result
          // }
          console.log(result)
          return result;
      },
      
      updatePlaylists: async(parent,{id,name_playlist})=>{
        try{
        let resultPlaylist=  await modelSchemaFinalTaskMongodb.findByIdAndUpdate(
          id,
          {
            name_playlist: name_playlist

          },{new: true}
          )
          if (!resultPlaylist) throw new Error('Failed to update playlist')
          return { error: null,updatedataSong:resultPlaylist}
        }catch (error) {
        return { error: error.message, updatedataSong: null}
        }
      },
      deletePlaylists: async (parent,{id}) => {
        try{
          // const status;
          const deletPlaylist = await modelSchemaFinalTaskMongodb.findByIdAndDelete(id,{new: true})
          if (!deletPlaylist) throw new Error('Failed to delete book')
          return { error: null,dataSong:deletPlaylist}
        }catch (error) {
        return { error: error.message, dataSong: null}
        }
      }

     
  } ,
  // BookSheft:{
  //   listBook:getBookLoader
  // },
  songDetail:{
    song_id:getPlaylistLoader
    
  },

};


module.exports = {restaurantResolvers};