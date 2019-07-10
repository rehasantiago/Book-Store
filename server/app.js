const express = require('express');
const graphqlHTTP = require('express-graphql');//graphqlHTTP is the fucking convention
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

//connecting to the db
mongoose.connect('mongodb+srv://Reha:Rehasantiago24@bookstore-p5lwo.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser: true});
mongoose.connection.once('open',() => {
    console.log('connected to db');
});//once the connection is open log the following to the console

//the fn will handle any request made to /graphql
app.use('/graphql',graphqlHTTP({
    schema, //this is schema:schema but we are using es6
    graphiql:true
}))
//takes in some options

app.listen(4000,() => {
    console.log('now listening for requests on port 4000')
})