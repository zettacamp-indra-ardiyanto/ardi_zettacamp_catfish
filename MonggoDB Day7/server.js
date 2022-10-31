const express = require('express')
// Initialize express
const app = express()
// parse url encoded objects- data sent through the url
app.use(express.urlencoded({ extended: true})) 
const db = require('./db')
app.listen(8000);

// group
const { groupAuthor } = require('./dbHelpers')
app.get('/group', async (req, res) => {

  const books = await groupAuthor (req.query.price)
  console.log(books);
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
// facet price
const { facetPrice } = require('./dbHelpers')
app.get('/facetprice', async (req, res) => {
console.log(req.body.price)
  const books = await facetPrice (req.body.price)

  console.log(books)
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

const { pagesSkipLimit } = require('./dbHelpers')
app.get('/pages', async (req, res) => {

  const books = await pagesSkipLimit ()
  // const {pages,limit}=req.body
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data
      // books: books.pages,
      // books: books.limit
    })
  }
  res.status(200).json({
      message: 'success',
      books: books.data
      // books: books.pages,
      // books: books.limit
    }) 
})
////////bookshelfs//////////////////
// concate agregat
const { concatAgregate } = require('./dbHelpers')
app.get('/konkett', async (req, res) => {

  const books = await concatAgregate   ()
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
// // lookup agregat
const { lookupagregate } = require('./dbHelpers')
app.get('/lookupagregat', async (req, res) => {

  const books = await lookupagregate  ()
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
// // sorting agregate
const { sortAgregate } = require('./dbHelpers')
app.get('/sortingagregat', async (req, res) => {

  const books = await sortAgregate ()
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

// find all readbymatch
const { readAllBookbymatch } = require('./dbHelpers')
app.get('/readallbymatch', async (req, res) => {

  const books = await readAllBookbymatch ()
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

// find readbymatch
const { readBookbymatch } = require('./dbHelpers')
app.get('/readbymatch', async (req, res) => {

  const books = await readBookbymatch ()
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

// addfield query agregate
const { addFieldsAgregate} = require('./dbHelpers')
app.get('/addfields', async (req, res) => {

  const books = await addFieldsAgregate ()
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

// addfield query agregate
const { addUnwind} = require('./dbHelpers')
app.get('/addunwind', async (req, res) => {

  const books = await addUnwind ()
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



// creat book task4
const { createBooktask4 } = require('./dbHelpers')
app.post('/booktask4', async (req, res) => {
    //check if req.body is empty
    if (!Object.keys(req.body).length) {
      res.status(400).json({
      message: 'Request body cannot be empty'
    })
    }
    
    const {name,book_ids,object_id,added,stock,date,date_time,time}=req.body
    
    let objectBook=[];
    let newbook=[];
    let newAdded= [];
    let newStock= [];

    newbook= book_ids.split( ' ');
    newAdded= added.split(' ');
    newStock= stock.split(' ');

      for( const[i,n] of newbook.entries()){
      objectBook.push({object_id:n,added:newAdded[i],stock:newStock[i]});
      }

    const book_shelves= {
      name:name,
      book_ids:objectBook,
        date:[{
        date_time:date_time,
        time:time
      }]
      
    }

    console.log('unkown data detected:',objectBook);

    console.log('result of book_shelves: ',book_shelves);
    // // create a record in db
    const book = await createBooktask4(book_shelves) ;
    console.log('buku',book);


    if (book.error) {
      res.status(500).json({
        message: book.error
      })
    }
    res.status(200).json({
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

app.put('/bookupdate', async (req, res) => {
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
