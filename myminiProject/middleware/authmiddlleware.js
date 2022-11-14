const jwt = require('jsonwebtoken')
const {ApolloServer , ApolloError} = require('apollo-server-express')
const { GraphQLError } = require('graphql')
const {modelUserSchema} = require('../model/userModel.js')

const userAuth = async (resolve, parent, args, context) => {
    
    if (!context.req.headers.authorization) {
       throw new GraphQLError('please fill your account!')
    }


    let token = context.req.headers.authorization;
    let decode=jwt.verify(token,'mykey')

    const getUserData= await modelUserSchema.find({
        email:decode.email
    });

    context.user= getUserData;
    context.token=token;
    return await resolve(parent,args,context);
}

const middleWare = [{
    Query:{
        getAllUsers:userAuth,
        GetOneUser:userAuth
    },
    Mutation: {
        deleteUser:userAuth,
        UpdateUser:userAuth
        // registrationInput: userAuth
    }
}]

module.exports = {middleWare}