const express = require('express')
// Initialize express
const app = express()

// parse json objects
app.use(express) 

// parse url encoded objects- data sent through the url
// app.use(urlencoded({ extended: true})) 

// create a server
// const PORT = 8080
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT  }`)
// }
const db = require('./db')
const { create } = require('./dbHelpers')
app.listen(5000);

app.post('/create', async (req, res) => {
    //check if req.body is empty
    console.log(req);
    if (!Object.keys(req.body).length) {
      res.status(400).json({
      message: 'Request body cannot be empty'
    })
    }
    const {title, author, publisher,price,created,updated} = req.body
    // create a record in db
    const book = await create({title, author, publisher,price,created,updated})
    if (book.error) {
      res.status(500).json({
        message: book.error
      })
    }
    res.status(201).json({
      message: 'New book record created'
    })
  })



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


const {  readOne, update } = require('./dbHelpers')

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

const {  deleteAll } = require('./dbHelpers')

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
