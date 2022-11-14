const {ApolloServer,gpl} = require('apollo-server');

const receiptsTypeDefs= `#graphql
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
type receiptLoader{
  ingredient_id:Ingredients
  stock_used: Int
}

type readAllReceipts{
  id: ID
  receipt_name: String
  ingredients:[receiptLoader]
  status: status
}

type deleteReceipes{
  receipeData:readAllReceipts
}

input loaderReceipt{
  ingredient_id: ID
  stock_used: Int
}

type Query {

  getAllReceipts(
    receipt_name: String
  ):[readAllReceipts]
  
  GetOneReceipe(
    id:ID
  ):readAllReceipts
}

type Mutation {

  CreateReceipts(
    receipt_name: String,
    data: [loaderReceipt],
    status:String
    ): readAllReceipts

  UpdateReceipe(
    id:ID,
    receipt_name: String,
    data: [loaderReceipt]
  ):readAllReceipts
  
  DeleteReceipe(
    id:ID
  ):deleteReceipes
}

`;

// module.exports = {userTypeDefs};
module.exports = receiptsTypeDefs
