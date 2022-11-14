const {ApolloServer,gpl} = require('apollo-server');

const userTypeDefs= `#graphql
enum status{
    active
    deleted
}
type Users{
    id: ID
    first_name: String
    last_name: String
    password: String
    email: String
    status: status
}

type readAll{
  userReadAll:[Users],
  count: Int
}

type inputDataUser{
  userDataInput:Users
}
type deleteUserByID{
  userDataDelete:Users
}
type updateDataUser{
  userDataUpdate:Users
}
type pageUser{
  userDataReader: Users
}
type userID{
  userdataID:Users
}

type token{
  tokenData: String
}

  type Query {
    getAllUsers(page: Int,limit:Int): readAll
      GetOneUser(id: ID,
        email: String
        ):userID

    
  }

  type Mutation {

    CreateUser(
      first_name: String,
      last_name: String,
      password: String,
      email: String,
      status: status): inputDataUser

    Login(
      email: String,
      password: String): token
    
    deleteUser(
      id:ID
    ):deleteUserByID
    
    UpdateUser(
      id:ID,
      first_name: String,
      last_name: String,
      password: String,
      email: String
    ):updateDataUser

  }


  

`;

// module.exports = {userTypeDefs};
module.exports = userTypeDefs
