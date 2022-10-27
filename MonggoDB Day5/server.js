const express = require('express')
// Initialize express
const app = express()
// parse url encoded objects- data sent through the url
app.use(express.urlencoded({ extended: true})) 
const db = require('./db')
app.listen(8000);
////////bookshelfs//////////////////




// creat book task4
const { createBooktask4 } = require('./dbHelpers')
app.post('/booktask4', async (req, res) => {
  //check if req.body is empty
  if (!Object.keys(req.body).length) {
    res.status(400).json({
    message: 'Request body cannot be empty'
  })
  }
  // const {nameBook,book_ids, added, stock,date_time, time, created_at,updated_at} = (req.body) 
  // console.log('hasil req.body:',req.body)
  const {name,book_ids,added,stock,date_time,time}=req.body
  console.log(name)

  //book_ids undefine
  let newbook=book_ids.split( ' ');
  let objectBook=[];
  for (const book of newbook){
    objectBook.push(mongoose.Types.ObjectId(book))
    console.log('result of array:',objectBook);
  }
  const book_shelves={
    name:name,
     book_ids:[{objectBook ,
     added:added,
      stock:stock}],
    date:[{
      date_time:date_time,
      time:time
    }]
    
  }

  console.log('your name:',name);
  console.log('datenya:',date_time);
  console.log('addednya:',added);

  console.log('result of book_shelves: ',book_shelves);
  // // create a record in db
  const book = await createBooktask4({book_shelves});
  console.log('buku',book);


  if (book.error) {
    res.status(500).json({
      message: book.error
    })
  }
  res.status(201).json({
    message: 'New book record created'
  })

})

// find elememantch
const { readBookbyidtask4  } = require('./dbHelpers')
app.get('/booktask4', async (req, res) => {

  const books = await readBookbyidtask4 ()
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
    }) 
})



//read all bookstask4
const { readAllBookTask4  } = require('./dbHelpers')
app.get('/allbooktask4', async (req, res) => {
  const books = await  readAllBookTask4()
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
    }) 
})
/////////////////////////////////////////////

// bookshelfs create
const { createBookShelfExport } = require('./dbHelpers')

app.post('/bookShelfs', async (req, res) => {
  //check if req.body is empty
  if (!Object.keys(req.body).length) {
    res.status(400).json({
    message: 'Request body cannot be empty'
  })
  }
  const {book_shelve} = (req.body)
  
  book_shelve.list_book=book_shelve.list_book.split(' ')
  // create a record in db
  const book = await createBookShelfExport({book_shelve})
  if (book.error) {
    res.status(500).json({
      message: book.error
    })
  }
  res.status(201).json({
    message: 'New book record created'
  })

})

//update bookshelfs
const {  updateBooksSheftExport } = require('./dbHelpers')

app.put('/bookShelfs', async (req, res) => {
   if (!Object.keys(req.body).length) {
       res.status(400).json({
       message: 'Request body cannot be empty',
       book: null
     })
  }
  // const {_id}= req.body
  let {book_shelve} = req.body
  book_shelve.list_book= book_shelve.list_book.split('')
  const book = await updateBooksSheftExport(req.params.bookID, req.body)
  if (book.error) {
    res.status(500).json({
      message: book.error,
      book: book.data
    })
  }
  res.status(200).json({
      message: 'success',
      book: book.data
    }) 
})
// delete booksheft
const {   deleteBookshelfExport } = require('./dbHelpers')

app.delete('/bookShelfse', async (req, res) => {
  const isDeleted = await deleteBookshelfExport(req.params.bookID)
  if (isDeleted.error) {
    res.status(500).json({
      message: isDeleted.error,
    })
  }
  res.status(200).json({
      message: 'Deleted Successfully'
    }) 
})

//read all bookshef
const { readAllBookShelfExport  } = require('./dbHelpers')
app.get('/allbookShelfse', async (req, res) => {
  const books = await readAllBookShelfExport()
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
    }) 
})

//read byid
const { readBookShelfExport  } = require('./dbHelpers')
app.get('/bookShelfse', async (req, res) => {

  const books = await readBookShelfExport()
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
    }) 
})

///////////////////////normal data///////////
const { create } = require('./dbHelpers')

app.post('/create', async (req, res) => {
  //check if req.body is empty
  if (!Object.keys(req.body).length) {
    res.status(400).json({
    message: 'Request body cannot be empty'
  })
  }
  const {title,author,publisher, price,created, updated} = (req.body)
  // create a record in db
  const book = await create({title,author,publisher, price,created, updated})
  if (book.error) {
    res.status(500).json({
      message: book.error
    })
  }
  res.status(201).json({
    message: 'New book record created'
  })

})


app.get('/')

const { readAll } = require('./dbHelpers')
app.get('/read_all', async (req, res) => {
  const books = await readAll()
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
    }) 
})




const {  update } = require('./dbHelpers')

app.put('/bookID', async (req, res) => {
   if (!Object.keys(req.body).length) {
       res.status(400).json({
       message: 'Request body cannot be empty',
       book: null
     })
  }

  const book = await update(req.params.bookID, req.body)
  if (book.error) {
    res.status(500).json({
      message: book.error,
      book: book.data
    })
  }
  res.status(200).json({
      message: 'success',
      book: book.data
    }) 
})

const {   deleteOne } = require('./dbHelpers')

app.delete('/delete', async (req, res) => {
  const isDeleted = await deleteOne(req.params.bookID)
  if (isDeleted.error) {
    res.status(500).json({
      message: isDeleted.error,
    })
  }
  res.status(200).json({
      message: 'Deleted Successfully'
    }) 
})

const {  deleteAll } = require('./dbHelpers');
const { default: mongoose } = require('mongoose');

app.delete('/delete_all', async (req, res) => {
  const isDeleted = await deleteAll(req)
  if (isDeleted.error) {
    res.status(500).json({
      message: isDeleted.error,
    })
  }
  res.status(200).json({
      message: 'Deleted Successfully'
    }) 
})
