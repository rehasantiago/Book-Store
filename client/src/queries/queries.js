import {gql} from 'apollo-boost';

const getBooksQuery = gql`
  {
    books{
      name,
      id
    }
  }
`

const getAuthorsQuery = gql`
  {
    authors{
      name,
      id
    }
  }
`

const addBookMutation = gql`
mutation($name:String!,$genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        name,
        id
    }
}
`//query variables ! implies it should not be null 

export {getAuthorsQuery,getBooksQuery,addBookMutation};