// const express = require('express');
// const app= express()
// const { application } = require('express');
const { ApolloServer, gpl } = require('apollo-server');
const {ModelBook} = require('./bookSchema')

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




// const {ObjectId}= mongoose.Types




// const { default: mongoose } = require('mongoose')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
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
}
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).

  type Query {
    books: [Book]
  }

  input CreateInput {
    title: String
    created: String
    author: String
    publisher:String
    price: Int
    updated: String
  }

  type Mutation {
    addBook(data:CreateInput):Book
  }

`;



//   const { readAll } = require('./dbHelpers')
// app.get('/read_all', async (req, res) => {
//   const books = await readAll()
//   if (books.error) {
//     res.status(500).json({
//       message: error.message,
//       books: books.data
//     })
//   }
//   res.status(200).json({
//       message: 'success',
//       books: books.data
//     }) 
// })
  // const readall= async()=>{
  //   try{
  //     const books = await ModelBook.find({})
  //     if (!books) throw new Error('Book not found')
  //     return {books}
  //   }catch(error) {
  //       return {error: error.message}
  //   }
  // }
  // Resolvers define how to fetch the types defined in your schema.

    //  characters(_,_, {characters}){
    //     return characters;
    //   },
  
  // This resolver retrieves books from the "books" array above.
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
     
    },
  
  
    Mutation:{
      addBook: async ({data} )=>{
      //  data = {...data, id: characters.length+1  };
      // characters.push(data)
      const newBook = new ModelBook(data)
      await newBook.save()
   
        console.log(data);
        // let newbook= new ModelBook(data)

        // await newbook.save();
        // return data;
      // if(!savedBook) throw new Error('Book could not be saved')
      // return {error: null}
      return newBook
     
    },
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