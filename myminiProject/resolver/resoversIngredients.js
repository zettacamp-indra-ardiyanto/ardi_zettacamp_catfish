const jwt = require('jsonwebtoken');
const { modelIngerdientsSchema} = require('../model/ingredientsModel')
const { GraphQLError, graphql } = require('graphql');


const ingredientsResolvers ={
    Query:{
      
      getOneIngredients:async(parent,{_id})=>{
        // let stockk=[];
         const getOneIngredient= await modelIngerdientsSchema.findById(_id)
         console.log('data:',getOneIngredient);
         return getOneIngredient;
      },
        // stockk.push(stockData)
      getAllIngredients:async(parent,{stock,name})=>{
        let stockk=[];
        let stockData;
        if(stock ==0||stock > 0){
         stockData= await modelIngerdientsSchema.aggregate([
          {
            $match: {stock:{$gt:stock}}
          }
        ])
   
        return {ingredientsData:stockData}
      }
      else if(name){
          stockData= await modelIngerdientsSchema.findOne(
          {
            name:name
          }
          )
          stockk.push(stockData) 
          console.log("data:",stockk);
          
         
          return {ingredientsData:stockk}
        }
       
    },

       
},
        Mutation:{
            CreateIngredient: async (parent,{name,stock} )=>{
                try{
                    const newIngredient = new modelIngerdientsSchema({
                        name:name,
                        stock: stock
                    
                    })
                    console.log(newIngredient);
                
                    const saveIngredient =await newIngredient.save()
                    if(!saveIngredient)  new Error('ingredient data could not be saved')
                    return {error: null,ingredientsData:saveIngredient}
                } catch (error) {
                    return new error(error)
                }
                
            },

            UpdateIngredient: async (parent,{id,stock}) => {
                try{
                  console.log("id:",id);
                  // const status;
                  
                   let updateIngredientData = await modelIngerdientsSchema.findByIdAndUpdate(
                    id,
                    {
                      stock:stock
                    },
                    {new: true})
                    console.log('update:',updateIngredientData);
                  if (!updateIngredientData) {
                    throw new GraphQLError('Failed to delete user')
                  }
                  return { ingredientsData:updateIngredientData}
                }catch (error) {
                return { error: error.message, ingredientsData: null}
                }
            },

            DeleteIngredient: async (parent,{id}) => {
              try{
                console.log("id:",id);
                // const status;
                
                 let deleteUserByID = await modelIngerdientsSchema.findByIdAndUpdate(
                  id,
                  {
                    status: "deleted"
                  },
                  {new: true, runValidators: true})
                  console.log('deleted:',deleteUserByID);
                if (!deleteUserByID) {
                  throw new GraphQLError('Failed to delete user')
                }
                return { ingredientsData:deleteUserByID}
              }catch (error) {
              return { error: error.message, ingredientsData: null}
              }
            },

        }
    

}

module.exports = ingredientsResolvers