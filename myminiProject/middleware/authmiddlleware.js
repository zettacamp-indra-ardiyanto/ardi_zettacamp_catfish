const jwt = require('jsonwebtoken')
const {ApolloServer , ApolloError} = require('apollo-server-express')
const { GraphQLError } = require('graphql')
// const { ApolloError } = require('apollo-server-express');
// const fs = require('fs');
// const path = require('path');

// let private = fs.readFileSync(path.join(__dirname, '../,./private.key'))

const userAuth = async (resolve, root, args, context, info) => {
    let token = context.req.headers.authorization
    if (!context.req.headers.authorization) {
       throw new GraphQLError('please fill your account!')
    }
    jwt.verify(token,'mykey',(err)=>{
        if(err){
            throw new GraphQLError(err)
        }
    });
    return await resolve(parent,args,context,info);
}

const middleWare = [{
    Query:{
        userPages:userAuth,
        userByID:userAuth
    },
    Mutation: {
        // registrationInput: userAuth
    }
}]

module.exports = {middleWare}