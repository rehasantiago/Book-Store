const express = require('express');
const graphqlHTTP = require('express-graphql');//graphqlHTTP is the fucking convention
const schema = require('./schema/schema');

const app = express();

//the fn will handle any request made to /graphql
app.use('/graphql',graphqlHTTP({
    schema, //this is schema:schema but we are using es6
    graphiql:true
}))
//takes in some options

app.listen(3000,() => {
    console.log('now listening for requests on port 3000')
})