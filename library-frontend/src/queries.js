import { gql } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title 
      author {
        name
      }
      published 
      genres
      id
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title 
      author {
        name
      }
      published 
      genres
      id
    }
  }
`
export const GENRE_BOOKS = gql`
  query booksByGenre($genre: String!){
    allBooks(genre: $genre) {
      title 
      author {
        name
      }
      published 
      genres
      id
    }
  }
`
export const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
      }
      genres
      id
    }
  }
`
export const UPDATE_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      bookCount
      id
    }
  }
`
export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
query {
  me {
    username
    favoriteGenre
    id
  }
}
`