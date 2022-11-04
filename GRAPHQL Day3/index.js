// const express = require('express');
// const app= express()
// const { application } = require('express');
const { ApolloServer, gpl } = require('apollo-server');
const {ModelBook,BookSheft,ModelbookTask4} = require('./bookSchema')
// require('dotenev').config()
// const dotenev = require ('dotenev')
// const {keyBy} = require ('loadash')

//data loader:
// import DataLoader from 'dataloader';
const DataLoader = require ('dataloader')


const mongoose = require('mongoose');
const { GraphQLObjectType } = require('graphql');
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
  type Book {
    id: ID
    title: String
    created:  String
    author: String
    publisher:String
    price: Int
    updated: String

  }

  type list_book{
    id: Book
    title: String
    created:  String
    author: String
    publisher:String
    price: Int
    updated: String

  }

  type BookSheft{
    id: ID
    names:String
    list: [Book]

  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
    bookshefts: [BookSheft]
  }


  input CreateInput {
    title: String
    created: String
    author: String
    publisher:String
    price: Int
    updated: String
  }
  input updateInput {
    title: String
 
  }


  type Mutation {
    addBook(data:CreateInput):Book
    updateBook(id:ID,data: updateInput):Book
  }

`;
//data loader
async function batchBookSheft (idBook){
  const bookshefts= await BookSheft.find({
    _id:{
      $in: idBook 
    }
  });
  // const userByids = keyBy(bookshefts, '_id');
  // console.log("book by id:",userByids);
  // result= idBook.map(ownerId =>userByids[ownerId]);
  // console.log('resultnyo:',result);
  // return result
  const userMap={};

  //insert data into map
  bookshefts.forEach((user)=>{
    userMap[user._id]= user;
  });
  result= idBook.map(id=>userMap[id]);
  return result
};//variable data from loader
const bookSheftLoader = new DataLoader(batchBookSheft);

// console.log('id bookshelf:',list)

const getBookLoader=async function(parent,arggs)
{
  if(parent.list){
    const result= await bookSheftLoader.loadMany(parent.list)
    return result;
  }
}
const resolvers = {
  
    Query: {
      books: async()=>{
        try{
          const books = await ModelBook.find({})
          if (!books) throw new Error('Book not found')
          return books
        }catch(error) {
            return {error: error.message}
        }
      },

      bookshefts:async()=>{
        try{
          const books = await BookSheft.collection.find({}).toArray()
          if (!books) throw new Error('Book not found')
          return books
        }catch(error) {
            return {error: error.message}
        }
      },

  
     
    },
  
  
    Mutation:{
      addBook: async (parent,{data} )=>{
      console.log(data);
      const newBook = new ModelBook(data)
      await newBook.save()
      return newBook
     
    },
    
    // updateBook:async (parent,{id,data}) =>{
    //   const updatedBook = await ModelBook.updateOne(
    //     id,
      
    //   // try{
    //   //   // let titleData;
    //   //   console.log('id:',id)
    //   //   console.log('data:',data)
    //   //   const updatedBook = await ModelBook.updateOne(
          
    //   //       id
    //   //     ,
    //   //     {
    //   //       $set:{
    //   //         title:data
    //   //       },
    //   //     },{new: true}
    //   //   )
    //   //   if(!updatedBook) 
    //   //   return {error: null}
    //   //  } catch (error) {
    //   //    return {error: error.message}
    //   // }
    // }
  },
  BookSheft:{
    list:getBookLoader
  }
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