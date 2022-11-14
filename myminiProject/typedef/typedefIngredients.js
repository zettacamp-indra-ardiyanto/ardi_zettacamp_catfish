const {ApolloServer,gpl} = require('apollo-server');

const ingredientsTypeDefs= `#graphql
enum status{
    active
    deleted
}
type Ingredients{
    _id: ID
    name: String
    stock: Int
    status: status
}

type readall{
  ingredientsData: [Ingredients]
}
type updateIngredient{
  ingredientsData: Ingredients
}

type inputDataIngredients{
  ingredientsData: Ingredients
}

type deleteIngredient{
  ingredientsData: Ingredients
}

  type Query {

    getAllIngredients(
      stock: Int,
      name: String
    ):readall

    getOneIngredients(_id: ID):Ingredients

  }

  type Mutation {

    CreateIngredient(
      name: String,
      stock: Int
      ): inputDataIngredients

    UpdateIngredient(
      id:ID,
      stock:Int
    ):updateIngredient
  
    DeleteIngredient(
      id:ID
    ):deleteIngredient
  }

`;

// module.exports = {userTypeDefs};
module.exports = ingredientsTypeDefs
