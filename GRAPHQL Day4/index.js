// const express = require('express');
// const app= express()
// const { application } = require('express');
const { ApolloServer, gpl } = require('apollo-server');
const {ModelBook,BookSheft,modelSchemaFinalTaskMongodb,modelLogin,modelSchemaSongs} = require('./bookSchema')
// require('dotenev').config()
// const dotenev = require ('dotenev')
// const {keyBy} = require ('loadash')

//data loader:
// import DataLoader from 'dataloader';
const DataLoader = require ('dataloader')
const mongoose = require('mongoose');
const { GraphQLObjectType } = require('graphql');

//authentikasi
//  const jwt = require('jsonwebtoken');
//  const fs = require('fs');
// const path = require('path')
// let private = fs.readFileSync(path.join(__dirname, 'private.key'))

//database
const dbURI = 'mongodb://localhost:27017/bookDb';
mongoose.connect(dbURI, {useNewUrlParser:true})
// connect to database
const db = mongoose.connection
db.on("error", (err) => {
  console.error(`err: ${err}`)
})// if connected
db.on('connected', (err, res) => {
  console.log('Connected to database')
})



const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type userInfo{
  
      id: Int
      username: String
      password: String
      role: String
  }

  type login{
    status: String
}
  
  
  type songList{
    _id: ID
    artis:String
    albumSong: String
    nameSong: String
    genre: String
    rilis: String
    timePlaying: Int
    priceSong: Int
  }

  type songDetail{
    song_id:songList
    added: String
  }
  type playList{
    id: ID
    name_playlist:String
    playlist_list:[songDetail]
  }

  type updateSong{
    updatedataSong:playList
  }

  type deleteSong{
    dataSong: playList
  }
  
  type Book {
    id: ID
    title: String
    author: String
    publisher:String
    price: Int

  }

  type listBook{
    idBook:Book
  

  }

  type BookSheft{
    id: ID
    names:String
    list_book: [listBook]

  }

  type bookRead{
    readBOOK:Book
  }

  type updateBook{
    updateData:Book
  }

  type deleteBook{
    delete_book:Book
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
    bookshefts: [BookSheft]
    bookByid(
      id: ID,
      title: String,
      author: String):bookRead
    songPlaylists:[playList]
    login(username: String, password: String, secret: String): login
  }

  input CreateInput {
    id: ID
    title: String
    author: String
    publisher:String
    price: Int

  }
  input updateInput {
    title: String
 
  }

  type Mutation {
    addBook(data:CreateInput):Book
    updateBooks(id: ID,
      title: String,
      author: String,
      publisher:String,
      price: Int): updateBook
    deleteBooks(
      id:ID
    ):deleteBook

    updatePlaylists(
      id: ID,
      name_playlist: String
      ): updateSong

    deletePlaylists(
      id: ID,
      name_playlist: String
    ):deleteSong

    logins(
      email: String,
      username: String,
      password : String
    ): userInfo
  }

`;
//data loader
// async function batchBookSheft (BookSheft){
//   // const idBook= mongoose.typeDefs.object_id(list_book)
//   console.log('id loader:',BookSheft);
//   const bookshefts= await BookSheft.find({
//       // _id:mongoose.typeDefs.object_id(list_book),
//     _id:{
//       $in: BookSheft
//     }
//   });
//   console.log("result loader:",bookshefts);
//   const userMap={};

//   //insert data into map
//   bookshefts.forEach((user)=>{
//     userMap[user._id]= user;
//   });
//   console.log('map loader:',userMap);
//   result= BookSheft.map(id=>userMap[id]);
//   console.log("result:",result);
//   return result
  
// };//variable data from loader
// const bookSheftLoader = new DataLoader(batchBookSheft);

// // console.log('id bookshelf:',list)

// const getBookLoader=async function(parent,args)
// {
//   if(parent.idBook){
//     const result= await bookSheftLoader.loadMany(parent.list_book)
//     return result
//   }
// }
// playlist dataloader

// let activeUser = {};
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

const resolvers = {
  
    Query: {
      books: async()=>{
        try{
          const books = await modelSchemaFinalTaskMongodb.find({})
          if (!books) throw new Error('Book not found')
          return books
        }catch(error) {
            return {error: error.message}
        }
      },

      bookshefts: async()=>{
        try{
          const books = await BookSheft.collection.find({}).toArray()
          if (!books) throw new Error('Book not found')
          return books
        }catch(error) {
            return {error: error.message}
        }
      },
    
    bookByid: async (parent,{id}) => {
      try{
        const findID = await ModelBook.findById(id)
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
      const newBook = new ModelBook(id,title,author,publisher,price)
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



  
  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // const app = express();
// server.applyMiddleware({ app });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);