const graphql = require('graphql');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

//made an obj which has the name book and the following fields
const BookType = new GraphQLObjectType({
    name : 'Book',//name is book
    fields : () => ({
        id : {type : GraphQLString},//each field has a type which is to be imported from graphql
        name : {type:GraphQLString},
        genre:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{ 
        book:{//the user will send requests in this manner eg books(id:){the fields that it wants}
            type:BookType,
            args:{id:{type:GraphQLString}},// a necessary property from the user
            resolve(parent,args){
                //code to get data from the db
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})