
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
const userTypeDefs = require('./typedef/typedefUser');
const ingredientsTypeDefs = require('./typedef/typedefIngredients');
const  receiptsTypeDefs  = require("./typedef/typedefReceipts");

//resolver import
// const { restaurantResolvers } = require("./resolver/resolver.js");
const userResolvers = require('./resolver/resolversUsers');
const ingredientsResolvers = require('./resolver/resoversIngredients');
const receiptsResolvers = require('./resolver/resolversReceipt');
// mergering 
typeDefs = mergeTypeDefs([userTypeDefs,ingredientsTypeDefs,receiptsTypeDefs])
resolvers = mergeResolvers([userResolvers,ingredientsResolvers,receiptsResolvers])

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




