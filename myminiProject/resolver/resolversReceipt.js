const mongoose = require("mongoose");
const DataLoader = require('dataloader');
const {modelIngerdientsSchema} = require('../model/ingredientsModel')
const {modelReceiptsSchema} = require('../model/receiptsModel')

// let resultSong;
let receiptsMap={};
async function batchReceipts (Receipts_ID){
//   console.log('id loader:',playlist_list);
  const receiptsData= await modelIngerdientsSchema.find({
    _id:{
      $in:Receipts_ID
    }
  });
  console.log("result loader:",receiptsData);

  receiptsData.forEach((n)=>{
    receiptsMap[n._id]=n
  });
//   console.log('map loader:',songMap);
  return Receipts_ID.map(id=>receiptsMap[id]);
  
  // return songPlaylists
  // return songPlaylists;
  
};


// console.log("batch playlist:",batchPlaylist);

// console.log('test:',batchPlaylist()); 
//calling loader
const receiptsLoader= new DataLoader(batchReceipts);

const getReceiptLoader=async (parent,{ingredient_id})=>
{
  console.log(parent.ingredient_id);
  if(parent.ingredient_id){
    console.log('sini');
    return await receiptsLoader.load(parent.ingredient_id)
  }
}

const receiptsResolvers = {
  
    Query: {
        
     
        getAllReceipts: async(parent,{receipt_name})=>{
            try{
                const receiptData = await modelReceiptsSchema.find({
                    receipt_name: receipt_name
                })
                if (!receiptData) throw new Error('Book not found')
                return receiptData
            }catch(error) {
                return {error: error.message}
            }
        },
        GetOneReceipe: async (parent,id)=>{
            try{
                const GetOneReceipes= await modelReceiptsSchema.findOne({
                    id:id
                })
                console.log("GetOneReceipe:",GetOneReceipes);
                return GetOneReceipes
            }catch{
                return{ error:error.message}
            }
        }

      
      
    },
  
  
  Mutation:{

    CreateReceipts: async (parent,{receipt_name,data,stock_used} )=>{
    //   console.log(data);
      const newReceiptsData = new modelReceiptsSchema({
        receipt_name: receipt_name,
        ingredients: data,
        stock_used: stock_used
      })
      console.log("create:",newReceiptsData);
     const saveReceiptData= await newReceiptsData.save()
      return saveReceiptData;
      
    },

    UpdateReceipe:async (parent,{id,receipt_name,data,stock_used})=>{
      try{
        console.log(receipt_name);
        const updateDataReceipes= new modelReceiptsSchema.findByIdAndUpdate(
          id,
          {
            receipt_name: receipt_name,
            ingredients:data,
            stock_used: stock_used
          },
          {new: true})
          console.log("update data:",updateDataReceipes);
          return updateDataReceipes;

      }catch (error) {
          return { error: error.message}
          }
    },
 
     
  } ,
  // BookSheft:{
  //   listBook:getBookLoader
  // },
  receiptLoader:{
    ingredient_id:getReceiptLoader
    
  },

};


module.exports = receiptsResolvers;