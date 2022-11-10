const {ApolloServer,gpl} = require('apollo-server');

const restaurantTypeDefs= `#graphql
enum status{
    active
    deleted
}
type users{
    id: ID
    first_name: String
    last_name: String
    password: String
    email: String
    status: status
}

type Book {
    title: String
    author: String
  }

  type userInfo{
  
    id: ID
    username: String
    password: String
    phone_number: String
    email: String
    role: String
}

type login{
  id: ID
  username: String
  password: String
  status: String
}


type songList{
  _id: ID
  artis:String
  albumSong: String
  nameSong: String
  genre: String
  rilis: String
  timePlaying: Int
  priceSong: Int
}

type songDetail{
  song_id:songList
  added: String
}
type playList{
  id: ID
  name_playlist:String
  playlist_list:[songDetail]
}

type updateSong{
  updatedataSong:playList
}

type deleteSong{
  dataSong: playList
}

type Book {
  id: ID
  title: String
  author: String
  publisher:String
  price: Int

}

type listBook{
  idBook:Book


}

type BookSheft{
  id: ID
  names:String
  list_book: [listBook]

}

type bookRead{
  readBOOK:Book
}

type updateBook{
  updateData:Book
}

type deleteBook{
  delete_book:Book
}

type page_user{
  userFind: users
 
}

type createUser{
  createId=users
}
  type Query {
    userPage(email:String):page_user
    books: [Book]
    bookshefts: [BookSheft]
    bookByid(
      id: ID,
      title: String,
      author: String):bookRead
    songPlaylists:[playList]
    login(username: String, password: String, secret: String): login
  }

  input CreateInput {
    id: ID
    title: String
    author: String
    publisher:String
    price: Int

  }
  input inputUser {
    first_name: String,
    last_name: String,
    password: String,
    email: String
 
  }

  type Mutation {
    addBook(data:CreateInput):Book
    updateBooks(id: ID,
      title: String,
      author: String,
      publisher:String,
      price: Int): updateBook
    deleteBooks(
      id:ID
    ):deleteBook

    updatePlaylists(
      id: ID,
      name_playlist: String
      ): updateSong

    deletePlaylists(
      id: ID,
      name_playlist: String
    ):deleteSong

    registrationInput(dataUser:inputUser): users

  }

`;

module.exports = {restaurantTypeDefs};


