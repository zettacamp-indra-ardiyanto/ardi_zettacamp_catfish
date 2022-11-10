
const { ApolloServer } = require('apollo-server');
const {mergeTypeDefs,mergeResolvers} = require('@graphql-tools/merge');
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware, middleware } = require('graphql-middleware');
// const http = require('http');   


//db
const db = require('./db/db.js')

// middleware
const {middleWare} = require('./middleware/authmiddlleware'); 
// const middlewareAuth= [authMiddleware]

//typedef import
const { restaurantTypeDefs } = require("./typedef/typedef.js");
const userTypeDefs = require('./typedef/typedefUser')

//resolver import
const { restaurantResolvers } = require("./resolver/resolver.js");
const userResolvers = require('./resolver/resolversUsers');

// mergering 
typeDefs = mergeTypeDefs([userTypeDefs])
resolvers = mergeResolvers([userResolvers])

//apollo schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})
const schemaWithMiddleWare = applyMiddleware(schema,...middleWare)
 server = new ApolloServer({
  schema: schemaWithMiddleWare,
  context: function({req}){
    return{req}
  }
})

//   server.listen({ port: 4000 })
//  .then(({ url }) => console.log(`🚀 app running at ${url}`));


server.listen({ port: 4000 });
// console.log( `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
//  server.listen({ port:4000 }, () =>
//  console.log(
//   `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
//  )
// );
// }

// start(typeDefs, resolvers);

// apolloStarted(typeDefs,resolvers);




