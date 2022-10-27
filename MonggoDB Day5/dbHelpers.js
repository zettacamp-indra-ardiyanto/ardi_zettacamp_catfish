
const {ModelBook,BookSheft,ModelbookTask4} = require('./bookSchema')

//create book task4
exports.createBooktask4 = async (data) => {
  try{
  const newBook = new ModelbookTask4(data)
  const savedBook = await newBook.save()
  console.log('data inputnyo: ',data);
  console.log('data inputnyo save: ',savedBook);

  // data/objek dari schema harus dipindah ke sini.supaya melihat langsung hasilnya lewat console.log
  if(!savedBook) throw new Error('Book could not be saved')
  return {error: null}
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
      return {error: error.message, data: null}
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

  


  exports.update = async (id, data) =>{
    try{
      const updatedBook = await ModelBook.findByIdAndUpdate(id, data,{new: true})
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
  

