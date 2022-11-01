const express=require ('express')
const { default: mongoose } = require('mongoose')
const app = express()
const {ModelBook,BookSheft,ModelbookTask4,modelSchemaSongs,modelSchemaFinalTaskMongodb} = require('./../Model/bookSchema')


// read all songs
exports.readAllSongs = async () => {
  try{
    const AgregatSongs= await modelSchemaSongs.aggregate([
      {
        $match:{}
      }
    ])

    if (!AgregatSongs) throw new Error('Book that you wish not found')
    return {error: null, data:AgregatSongs}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
//delete many playlist
exports.deleteAllPlaylist = async () => {
  try{
    const isDeleted = await modelSchemaFinalTaskMongodb.deleteMany({})
    if (!isDeleted) throw new Error('Failed to delete books')
    return {error: null}
  }catch (error) {
  return { error: error.message }
  }
}

//delete one playlist
exports.deleteOnePlaylist = async (id) => {
  try{
    const isDeleted = await modelSchemaFinalTaskMongodb.deleteOne(
      {
        _id:mongoose.Types.ObjectId(id)
      }
    )
    if (!isDeleted) throw new Error('Failed to delete book')
    return { error: null}
  }catch (error) {
  return { error: error.message}
  }
}

//update all playlist
exports.updateAllPlaylist = async (albumSong) =>{
  try{
  
    const updatedPlaylist = await modelSchemaFinalTaskMongodb.updateMany(
      {},
      {
        $set:{	name_playlist:albumSong}
      }
    )
    if(!updatedPlaylist) throw new Error('Failed to update book')
    return {error: null, data: updatedPlaylist}
   } catch (error) {
     return {error: error.message, data: null}
  }
}
//update playlist
exports.updatePlaylist = async (id, name_playlist) =>{
  try{
  
    const updatedPlaylist = await modelSchemaFinalTaskMongodb.updateOne(
      {
        _id:mongoose.Types.ObjectId(id)
      },
      {
        $set:{
          name_playlist:name_playlist
        }
      }
    )
    if(!updatedPlaylist) throw new Error('Failed to update book')
    return {error: null, data: updatedPlaylist}
   } catch (error) {
     return {error: error.message, data: null}
  }
}
// read one playlist
exports.readOnePlaylists = async (readData) => {
  try{
    const AgregatPlaylists= await modelSchemaFinalTaskMongodb.aggregate([
      {

        $match:{name_playlist: readData}
      }
    ])

    if (!AgregatPlaylists) throw new Error('Book that you wish not found')
    return {error: null, data:AgregatPlaylists}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
// read all playlist
exports.readAllPlaylists = async () => {
  try{
    const AgregatPlaylists= await modelSchemaFinalTaskMongodb.aggregate([
      {
        $match:{}
      }
    ])

    if (!AgregatPlaylists) throw new Error('Book that you wish not found')
    return {error: null, data:AgregatPlaylists}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
//create playlist finalmongodb
exports.createPlaylist = async (data) => {
  try{
    
  const newPlaylist = new modelSchemaFinalTaskMongodb(data)
  const savedPlaylist = await newPlaylist.save()
  console.log('data inputnyo: ',data);
  console.log('data inputnyo save: ',savedPlaylist);

  // data/objek dari schema harus dipindah ke sini.supaya melihat langsung hasilnya lewat console.log
  if(!savedPlaylist) throw new Error('Book could not be saved')
  return {error: null,data:savedPlaylist}
  } catch (error) {
    return {error: error.message}
  }
 }

// group
exports.groupAuthor = async (fieldDB) => {
  try{
  
    const hal= await modelSchemaFinalTaskMongodb.aggregate([
      {
        $group: { _id: fieldDB} 
    }
    ])
    console.log('fieldDB:',fieldDB)
    if (!hal) throw new Error('Book that you wish not found')
    return {error: null, data:hal}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

//facet
exports.facetplaylist = async (sortingName) => {
  try{
    // console.log(price)
    let sorting= +sortingName
    console.log(sorting)
    // const{page,price,limit,title}= req.body
    const hal= await modelSchemaFinalTaskMongodb.aggregate([
     
      {$facet: {
        'Playlist':[
           {
               $group: { _id: "$name_playlist"}
           }, {
               $sort: {name_playlist:sorting}
           }, 

          ]
      }
      }
    ])
    console.log('hal result:',hal)
    if (!hal) throw new Error('Book that you wish not found')
    return {error: null, data:hal}

  }catch(error) {
      return {error: error.message, data: null}
  }
}

// facet price
exports.facetPrice = async (priceSorting) => {
  try{
    // console.log(price)
    let sorting= +priceSorting
    console.log(sorting)
    // const{page,price,limit,title}= req.body
    const hal= await modelSchemaFinalTaskMongodbe.aggregate([
     
    {
      $facet: {
        'Category by  price':[
           {
               $sort: {price:sorting}
           },
           {
               $bucket: {
              groupBy: "$price",
              boundaries: [  4000,6000],
              default: "Other",
              output: {
                "count": { $sum: 1 },
                "titles" : { $push: "$title" }
              }
            }
               
           },
        ]
    }
          
    }
    ])
    console.log('hal result:',hal)
    if (!hal) throw new Error('Book that you wish not found')
    return {error: null, data:hal}

  }catch(error) {
      return {error: error.message, data: null}
  }
}
// pages
exports.pagesSkipLimit = async (pageSkip,limitBatas) => {
  try{
    // let page=3*2;
    //2 is skip
    //3=limit
    let page= +pageSkip;
    let limit= +limitBatas;
    const hal= await modelSchemaFinalTaskMongodb.aggregate([
      {
        $skip: page * limit
        
    },
    {
       
          $limit: limit
    }
    ])

    if (!hal) throw new Error('Book that you wish not found')
    return {error: null, data:hal, pag:page,lim:limit}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

////////////////////////////////////////////////////////
//concat agregate
exports.concatAgregate = async () => {
  try{
    const konket= await ModelbookTask4.aggregate([
      {
        $lookup: {
               from: "books",
               localField: "booktask4.63583296b5f25f2461e015b2",
               foreignField: "635b3c6c5165aa18e3b78431",
               as: "lookup_sasuke"
             }
    },
        {
            $sort:{book_ids:1}
            
        },
          {  $unwind:{path:"$lookup_sasuke"}} , 
        {
        
          $project: {itemDeskripsi:{ $concat: ["$lookup_sasuke.title","-","$name"]}}
        
        }
    ])

    if (!konket) throw new Error('Book that you wish not found')
    return {error: null, data:konket}
  }catch(error) {
      return {error: error.message, data: null}
  }
}


// sorting agregate
exports.sortAgregate = async () => {
  try{
    const sortAgregatMatch= await ModelbookTask4.aggregate([
     
      {$project: {name:1}},
      { $sort : { name : -1 } }
    ])

    if (!sortAgregatMatch) throw new Error('Book that you wish not found')
    return {error: null, data:sortAgregatMatch}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
//lookup agregat
exports.lookupagregate = async () => {
  try{
    const lookupAgregat= await modelSchemaFinalTaskMongodb.aggregate([
     
      {
        $lookup: {
               from: "songlists",
               localField: "playlist_musics.6360c5ef74404a6d37f1632f",
               foreignField: "6360869a8d4a674a3e5bc8e2",
               as: "lookup_playlist"
             }
    },
        {
            $sort:{book_ids:1}
            
        },
          {  $unwind:{path:"$lookup_playlist"}} , 
        {
          // $project:{ 
          //   book_ids:0
          $project: {playlist_genre:{ $concat: ["$lookup_playlist.artis","-","$name_playlist"]}}
          // }
        }
        // {
        //   // $project:{ 
        //   //   book_ids:0
        //   // $project: {itemDeskripsi:{ $concat: ["$lookup_sasuke.title","-","$name"]}}
        //   // }
        // }
    ])

    if (!lookupAgregat) throw new Error('Book that you wish not found')
    return {error: null, data:lookupAgregat}
  }catch(error) {
      return {error: error.message, data: null}
  }

}

//read agregate match or project
exports.readBookbymatch = async () => {
  try{
    const bookAgregatMatch= await ModelbookTask4.aggregate([
      {
        $match:{name:'mugiwara no luffy:'}
      }
      // {
      //   // $project:{name:0}
      // }
    ])

    if (!bookAgregatMatch) throw new Error('Book that you wish not found')
    return {error: null, data:bookAgregatMatch}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
// read all match
exports.readAllBookbymatch = async () => {
  try{
    const bookAgregatMatch= await ModelbookTask4.aggregate([
      {
        $match:{}
      }
    ])

    if (!bookAgregatMatch) throw new Error('Book that you wish not found')
    return {error: null, data:bookAgregatMatch}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

//addfield query agregate
exports.addFieldsAgregate = async () => {
  try{
    const bookAgregatsum= await ModelbookTask4.aggregate([
      {
        $addFields:{
          stock_total_perbooks:{$sum:'$stock_books'} 
        }
      }
    ])

    if (!bookAgregatsum) throw new Error('Book that you wish not found')
    return {error: null, data:bookAgregatsum}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

// unwind
exports.addUnwind = async () => {
  try{
    const bookAgregatsum= await ModelbookTask4.aggregate([
      {
        $match:{name:'roroan zoro:'}
      },
      {
        $unwind:{path:"$book_ids"}
      }
    ])

    if (!bookAgregatsum) throw new Error('Book that you wish not found')
    return {error: null, data:bookAgregatsum}
  }catch(error) {
      return {error: error.message, data: null}
  }
}
///////////////////////////////////////////////
//create book task4
exports.createBooktask4 = async (data) => {
  try{
    
  const newBook = new ModelbookTask4(data)
  const savedBook = await newBook.save()
  console.log('data inputnyo: ',data);
  console.log('data inputnyo save: ',savedBook);

  // data/objek dari schema harus dipindah ke sini.supaya melihat langsung hasilnya lewat console.log
  if(!savedBook) throw new Error('Book could not be saved')
  return {error: null,data:savedBook}
  } catch (error) {
    return {error: error.message}
  }
 }


//read bookstask4 by id
exports.readBookbyidtask4 = async () => {
  try{
    const bookshelfFilterByid= await BookSheft.find().elemMatch('book_ids',{$in : _id})

    if (!bookshelfFilterByid) throw new Error('Book shelf not found')
    return {error: null, data: bookshelfFilterByid}
  }catch(error) {
      return {error: error.message, data:   null}
  }
}
//update array filter
exports.updateDateArrayFilter = async (id, data) =>{
  try{
    const updatedBook = await BookSheft.findByIdAndUpdate(id, data,{new: true})
    if(!updatedBook) throw new Error('Failed to update book')
    return {error: null, data: updatedBook}
   } catch (error) {
     return {error: error.message, data: null}
  }
}


//read all booktask4
exports.readAllBookTask4 = async () => {
  try{
    const booktask4All= await ModelbookTask4.find()

    if (!booktask4All) throw new Error('Book shelf not found')
    return {error: null, data:booktask4All}
  }catch(error) {
      return {error: error.message, data: null}
  }
}


/////////////////////////////////
//read all book shelf
exports.readAllBookShelfExport = async () => {
  try{
    const bookshelfAll= await BookSheft.find()

    if (!bookshelfAll) throw new Error('Book shelf not found')
    return {error: null, data: bookshelfAll}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

exports.readBookShelfExport = async () => {
  try{
    const bookshelfFilterByid= await BookSheft.find().elemMatch(' list_book',{$in : _id})

    if (!bookshelfFilterByid) throw new Error('Book shelf not found')
    return {error: null, data: bookshelfFilterByid}
  }catch(error) {
      return {error: error.message, data: null}
  }
}

//update bookshelf
exports.updateBooksSheftExport = async (id, data) =>{
  try{
    const updatedBook = await BookSheft.findByIdAndUpdate(id, data,{new: true})
    if(!updatedBook) throw new Error('Failed to update book')
    return {error: null, data: updatedBook}
   } catch (error) {
     return {error: error.message, data: null}
  }
}
//delete book shelf by id
exports.deleteBookshelfExport = async (id) => {
  try{
    const deletBookShelf = await BookSheft.findByIdAndDelete(id,{new: true})
    if (!deletBookShelf) throw new Error('Failed to delete book')
    return { error: null}
  }catch (error) {
  return { error: error.message}
  }
}

//create book shelf
exports.createBookShelfExport = async (data) => {
  try{
  const newBookShelf = new BookSheft(data)
  const savedBookShelf = newBookShelf.save()
  if(!savedBookShelf) throw new Error('Book Sheft data could not be saved')
  return {error: null}
  } catch (error) {
    return {error: error.message}
  }
 }


 /////////////////////////////////////////////
//create book
exports.create = async (data) => {
 try{
 const newBook = new ModelBook(data)
 const savedBook = newBook.save()
 if(!savedBook) throw new Error('Book could not be saved')
 return {error: null}
 } catch (error) {
   return {error: error.message}
 }
}



//read all
exports.readAll = async () => {
    try{
      const books = await ModelBook.find({})
      if (!books) throw new Error('Book not found')
      return {error: null, data: books}
    }catch(error) {
        return {error: error.message, data: null}
    }
  }

  


  // exports.update = async (id, data) =>{
  //   try{
  //     const updatedBook = await ModelBook.findByIdAndUpdate(id, data,{new: true})
  //     if(!updatedBook) throw new Error('Failed to update book')
  //     return {error: null, data: updatedBook}
  //    } catch (error) {
  //      return {error: error.message, data: null}
  //   }
  // }
  exports.update = async (id, titleData) =>{
    try{
      // let titleData;
      const updatedBook = await ModelBook.updateOne(
        {
          _id:mongoose.Types.ObjectId(id)
        },
        {
          $set:{
            title:titleData
          }
        }
      )
      if(!updatedBook) throw new Error('Failed to update book')
      return {error: null, data: updatedBook}
     } catch (error) {
       return {error: error.message, data: null}
    }
  }
  exports.deleteOne = async (id) => {
    try{
      const isDeleted = await ModelBook.findByIdAndDelete(id)
      if (!isDeleted) throw new Error('Failed to delete book')
      return { error: null}
    }catch (error) {
    return { error: error.message}
    }
  }

  // exports.findById = async (id) => {
    
  //     const find= await Book.findByIdAndDelete(id)
     
  // }

  exports.deleteAll = async () => {
    try{
      const isDeleted = await ModelBook.deleteMany({})
      if (!isDeleted) throw new Error('Failed to delete books')
      return {error: null}
    }catch (error) {
    return { error: error.message }
    }
  }
  

