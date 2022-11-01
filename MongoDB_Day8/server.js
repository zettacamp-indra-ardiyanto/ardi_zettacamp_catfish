const express = require('express')
// Initialize express
const app = express()
// parse url encoded objects- data sent through the url
app.use(express.urlencoded({ extended: true})) 
const db = require('./Database/db')
app.listen(8000);


// facet playlist
const { readOnePlaylists } = require('./DBHelper/dbHelpers')
app.get('/playlist', async (req, res) => {
// console.log(req.body.playlistSorting)
  const books = await readOnePlaylists (req.body.readName)

  // console.log('result facet:',books)
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
// facet playlist
const { facetplaylist } = require('./DBHelper/dbHelpers')
app.get('/facetplaylist', async (req, res) => {
console.log(req.body.playlistSorting)
  const books = await facetplaylist (req.body.playlistSorting)

  console.log('result facet:',books)
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
// match all readallsongs
const { readAllSongs } = require('./DBHelper/dbHelpers')
app.get('/readallsongs', async (req, res) => {

  const books = await readAllSongs ()
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
// read all
const { readAllPlaylists } = require('./DBHelper/dbHelpers')
app.get('/readall', async (req, res) => {

  const books = await readAllPlaylists ()
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

// update all playlists
const { updateAllPlaylist } = require('./DBHelper/dbHelpers')
app.put('/updateallplaylists', async (req, res) => {

  const books = await updateAllPlaylist (req.body.update_name)
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
const { deleteAllPlaylist } = require('./DBHelper/dbHelpers')
app.delete('/delete_all_playlist', async (req, res) => {
  const isDeleted = await deleteAllPlaylist(req)
  if (isDeleted.error) {
    res.status(500).json({
      message: isDeleted.error,
    })
  }
  res.status(200).json({
      message: 'Deleted Successfully'
    }) 
})

const {   deleteOnePlaylist } = require('./DBHelper/dbHelpers')

app.delete('/playlist', async (req, res) => {
  const isDeleted = await deleteOnePlaylist(req.body.id)
  if (isDeleted.error) {
    res.status(500).json({
      message: isDeleted.error,
      book: isDeleted.data
    })
  }
  res.status(200).json({
      message: 'delete success',
      book: isDeleted.data
    }) 
})

const {  updatePlaylist } = require('./DBHelper/dbHelpers')

app.put('/playlist', async (req, res) => {
   if (!Object.keys(req.body).length) {
       res.status(400).json({
       message: 'Request body cannot be empty',
       book: null
     })
  }

  const book = await updatePlaylist(req.body.id,req.body.name_playlist )
  console.log('update data:',book)
  if (book.error) {
    res.status(500).json({
      message: book.error,
      book: book.data
    })
  }
  res.status(200).json({
      message: 'update success',
      book: book.data
    }) 
})
// create playlist
const { createPlaylist } = require('./DBHelper/dbHelpers')
app.post('/playlist', async (req, res) => {
    //check if req.body is empty
    if (!Object.keys(req.body).length) {
      res.status(400).json({
      message: 'Request body cannot be empty'
    })
    }
    
    const {name_playlist,playlist_list,object_id,added}=req.body
    
    let objectBook=[];
    let newbook=[];
    let newAdded= [];
    // let newStock= [];

    newbook= playlist_list.split( ' ');
    newAdded= added.split(' ');
    // newStock= stock.split(' ');

      for( const[i,n] of newbook.entries()){
      objectBook.push({object_id:n,added:newAdded[i]});
      }

    const playlist_lists= {
      name_playlist:name_playlist,
      playlist_list:objectBook,
    
    }

    console.log('unkown data detected:',objectBook);

    console.log('result of book_shelves: ',playlist_lists);
    // // create a record in db
    const musicSave = await createPlaylist(playlist_lists) ;
    console.log('buku: ',musicSave);


    if (musicSave.error) {
      res.status(500).json({
        message: musicSave.error
      })
    }
    res.status(200).json({
      message: 'New playlist record created'
    })
  })
// group
const { groupAuthor } = require('./DBHelper/dbHelpers')
app.get('/group', async (req, res) => {

  const books = await groupAuthor (req.query.fieldDB)
  console.log('buku:',books);
  if (books.error) {
    res.status(500).json({
      message: error.message,
      books: books.data

    })
  }
  res.status(200).json({
      message: 'process success',
      books: books.data
    }) 
})
// facet price
const { facetPrice } = require('./DBHelper/dbHelpers')
app.get('/facetprice', async (req, res) => {
console.log(req.body.priceSorting)
  const books = await facetPrice (req.body.priceSorting)

  console.log('result facet:',books)
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

const { pagesSkipLimit } = require('./DBHelper/dbHelpers')
app.get('/pagelimit', async (req, res) => {

  const books = await pagesSkipLimit (req.body.pagesNumber,req.body.limitNumber )
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
const { concatAgregate } = require('./DBHelper/dbHelpers')
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
const { lookupagregate } = require('./DBHelper/dbHelpers')
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
const { sortAgregate } = require('./DBHelper/dbHelpers')
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
const { readAllBookbymatch } = require('./DBHelper/dbHelpers')
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
const { readBookbymatch } = require('./DBHelper/dbHelpers')
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
const { addFieldsAgregate} = require('./DBHelper/dbHelpers')
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
const { addUnwind} = require('./DBHelper/dbHelpers')
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
const { createBooktask4 } = require('./DBHelper/dbHelpers')
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
const { readBookbyidtask4  } = require('./DBHelper/dbHelpers')
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
const { readAllBookTask4  } = require('./DBHelper/dbHelpers')
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
const { createBookShelfExport } = require('./DBHelper/dbHelpers')

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
const {  updateBooksSheftExport } = require('./DBHelper/dbHelpers')

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
const {   deleteBookshelfExport } = require('./DBHelper/dbHelpers')

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
const { readAllBookShelfExport  } = require('./DBHelper/dbHelpers')
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
const { readBookShelfExport  } = require('./DBHelper/dbHelpers')
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
const { create } = require('./DBHelper/dbHelpers')

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

const { readAll } = require('./DBHelper/dbHelpers')
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

const {  update } = require('./DBHelper/dbHelpers')

app.put('/bookupdate', async (req, res) => {
   if (!Object.keys(req.body).length) {
       res.status(400).json({
       message: 'Request body cannot be empty',
       book: null
     })
  }

  const book = await update(req.body.id,req.body.titleData )
  console.log('update data:',book)
  if (book.error) {
    res.status(500).json({
      message: book.error,
      book: book.data
    })
  }
  res.status(200).json({
      message: 'update success',
      book: book.data
    }) 
})

const {   deleteOne } = require('./DBHelper/dbHelpers')

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

const {  deleteAll } = require('./DBHelper/dbHelpers');
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
