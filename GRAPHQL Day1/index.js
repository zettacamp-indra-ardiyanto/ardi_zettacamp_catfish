const express = require('express');
const { ApolloServer } = require('apollo-server');
const { default: mongoose } = require('mongoose')
const {ModelBook} = require('./bookSchema')
// const db = require('./db')
// const { default: mongoose } = require('mongoose')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String
    created: String
    author: String
    publisher:String
    price: Int
    updated: String
    
  
  }
 type people{
    name : String!
    id: ID!
 }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    peoples: [people]
    books: [Book]
  }
`;



const books = [
    {
      id: "rd1",
      title: ' Awakening',
      author: 'Kate Chopin',
      publisher:'Joko',
      price: '100000'
      
    },
    {
      id: "rd2",
      title: 'City of Glass',
      author: 'Paul Auster',
      publisher:'Joko',
      price: '55000',
    
    },
  ];

  const readall= async()=>{
    try{
      const books = await ModelBook.find({})
      if (!books) throw new Error('Book not found')
      return {error: null, data: books}
    }catch(error) {
        return {error: error.message, data: null}
    }
  }
  // Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
      readallBook: () => readall,
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