const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({//define the name and the datatypes in the collection
    name:String,
    genre:String,
    authorId:String
});

module.exports = mongoose.model('Book',bookSchema);//name of the collection is  book and follows bookSchema