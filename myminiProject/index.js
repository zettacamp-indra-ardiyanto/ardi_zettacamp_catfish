
const { ApolloServer, gpl } = require('apollo-server');
const mongoose = require('mongoose');
const db = require('./db/db.js')
const { typeDefs } = require("./typedef/typedef.js");
const { resolvers } = require("./resolver/resolver.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
  
server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);