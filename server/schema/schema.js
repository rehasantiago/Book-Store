const graphql = require('graphql');
const _ = require('lodash');


const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt} = graphql;

//dummy data
var books = [
    {name:'reha',genre:'santiago',id:"1"},
    {name:'praju',genre:'ugal',id:"2"},
    {name:'sangi',genre:'rath',id:"3"}
];

var authors = [
    {name:"nitin",age:20,id:"1"},
    {name:"ragesh",age:30,id:"2"},
    {name:"rahul",age:40,id:"3"}
]

//made an obj which has the name book and the following fields
const BookType = new GraphQLObjectType({
    name : 'Book',//name is book
    fields : () => ({
        id : {type : GraphQLID},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name : 'Author',//name is book
    fields : () => ({
        id : {type : GraphQLID},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        age:{type:GraphQLInt}
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
                return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})