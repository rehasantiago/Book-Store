const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList,GraphQLNonNull} = graphql;

//dummy data
var books = [
    {name:'reha',genre:'santiago',id:"1",authorId:"1"},
    {name:'praju',genre:'ugal',id:"2",authorId:"2"},
    {name:'sangi',genre:'rath',id:"3",authorId:"3"},
    {name:"ram",genre:"hello",id:"4",authorId:"1"},
    {name:"gloria",genre:"menezes",id:"5",authorId:"2"},
    {name:"ruchi",genre:"wagh",id:"6",authorId:"3"}
];

var authors = [
    {name:"nitin",age:20,id:"1"},
    {name:"ragesh",age:30,id:"2"},
    {name:"rahul",age:40,id:"3"}
]

//made an obj which has the name book and the following fields
const BookType = new GraphQLObjectType({
    name : 'Book',//name is book
    fields : () => ({//is a fn cause we are not executing the fn till whole file is run...if it was an obj then it'll give an error that AuthorType is not defined as its defined afterwards
        id : {type : GraphQLID},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){//parent contains all the info the parent
                //return _.find(authors,{id:parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',//name is book
    fields : () => ({
        id : {type : GraphQLID},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return _.filter(books,{authorId:parent.id});
                return Book.find({authorId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{ 
        book:{//the user will send requests in this manner eg books(id:){the fields that it wants}
            type:BookType,
            args:{id:{type:GraphQLID}},// a necessary property from the user
            resolve(parent,args){
                //code to get data from the db
                //console.log(typeof(args.id)); //its a string
                //return _.find(books,{id:args.id});
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id});
                return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return books;
                return Book.find({})//to recieve all the books pass an empty obj
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors;
                return Author.find({})
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
                
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})