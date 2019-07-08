const graphql = require('graphql');
const _ = require('lodash');


const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID} = graphql;

//dummy data
var books = [
    {name:'reha',genre:'santiago',id:"1"},
    {name:'praju',genre:'ugal',id:"2"},
    {name:'sangi',genre:'rath',id:"3"}
];

//made an obj which has the name book and the following fields
const BookType = new GraphQLObjectType({
    name : 'Book',//name is book
    fields : () => ({
        id : {type : GraphQLID},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        genre:{type:GraphQLString}
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
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})