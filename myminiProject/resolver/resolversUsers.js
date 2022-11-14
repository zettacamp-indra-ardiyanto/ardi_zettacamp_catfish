const jwt = require('jsonwebtoken');
const {modelUserSchema} = require('../model/userModel.js')
const bcrypt = require("bcrypt");
const { GraphQLError, graphql } = require('graphql');
// const fs = require('fs');
// const path = require('path')
// let public = fs.readFileSync(path.join(__dirname, '../../public.key'))

function passwordEncrypt(plainTextPassword,hash){
    const resultPassword= bcrypt.compare(plainTextPassword,hash);
    return resultPassword;
}

const userResolvers ={
    Query:{
      getAllUsers: async(parent,{page,limit},context)=>{
        console.log('parent:',parent);
        try{
          if(!page && limit){
          const bookss = await modelUserSchema.find();
          const count = await modelUserSchema.count();
          return {bookss,count}
        }else {
          // limit:limit,
          // page:page
          const pagination= await modelUserSchema.aggregate([{
            $skip:page*limit
          },
          {
            $limit: limit
          
          }]);
          const counts= await modelUserSchema.count();
          return{
            pagination,
            counts
          };

        };

        }catch(error) {
            return {error: error.message}
        }
      },
       
      GetOneUser: async (parent,{id,email},context) => {
        // console.log("id:",id);
        
        try{
          if(id){
            let findID = await modelUserSchema.findById(id)
            return {userdataID:findID}}
          else if (email){
              let findID= await modelUserSchema.findOne(
              {email:email}
                )
                console.log("parent:",parent);
              return {userdataID:findID}
          }else{
            throw new GraphQLError('Sorry bro,your data unvailable now')
          } 
    
          // if (!findID) 
          
        }catch (error) {
        return { error: error.message}
        }
      }
           

    },

    Mutation:{
        CreateUser: async (parent,{first_name,last_name,password,email,status} )=>{
            try{
                const newUser = new modelUserSchema({
                    first_name:first_name,
                    last_name: last_name,
                    // password: await bcrypt.hash(password, 10)
                    password:password,
                    email: email,
                    status: status
                })
                console.log(newUser);
               
                const saveUser =await newUser.save()
                if(!saveUser)  new Error('User data could not be saved')
                return {error: null,userDataInput:saveUser}
            } catch (error) {
                return new error(error)
            }
            
        },

        Login: async (parent, {email,password},context)=>{
            // console.log("pass:",password);
            if( email && password){
                let getUser= await modelUserSchema.find(
                    {
                        email:email
                        
                    });
                if (getUser.length<1) {
                    throw new GraphQLError( `sorry ${email} and ${password} must at least 6 digit  `);
                }
                if(password === getUser[0].password){
                    var token = jwt.sign({ email: getUser[0].email, password: getUser[0].password }, 'mykey', { expiresIn: '1h' });
                    // console.log("getuser:",getUser);
                    // console.log('token:',token);
                    // console.log("pass:",password);
                  
                    return {tokenData:token};
                }
                // console.log('get user:',getUser[0].password);

            }else{
                throw new GraphQLError( `sorry your ${email} and ${password} not found, please try again! `);
            }
        },
        deleteUser: async (parent,{id},context) => {
          try{
            console.log("id:",id);
            // const status;
            
             let deleteUserByID = await modelUserSchema.findByIdAndUpdate(
              id,
              {
                status: "deleted"
              },
              {new: true, runValidators: true})
              console.log('deleted:',deleteUserByID);
            if (!deleteUserByID) {
              throw new GraphQLError('Failed to delete user')
            }
            return { userDataDelete:deleteUserByID}
          }catch (error) {
          return { error: error.message, userDataDelete: null}
          }
        },

        UpdateUser: async (parent,{id,first_name,last_name,password,email},context) => {
          try{
            console.log("id:",id);
            // const status;
            
             let updateUserData = await modelUserSchema.findByIdAndUpdate(
              id,
              {
                first_name:first_name,
                last_name: last_name,
                password: password,
                email:email
              },
              {new: true})
              console.log('update:',updateUserData);
            if (!updateUserData) {
              throw new GraphQLError('Failed to delete user')
            }
            return { userDataUpdate:updateUserData}
          }catch (error) {
          return { error: error.message, userDataUpdate: null}
          }
        }

        
    }
}

// module.exports = {userResolvers}
module.exports = userResolvers

