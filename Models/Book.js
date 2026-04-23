const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookSchema = new Schema({
    bookTitle : {type : String , required : true},
    publisher : {type : String , required : true},
    price : {type : String , required : true},
    language : {type : String , required : true},
    edition : {type : String , require : true},
    noOfPages : {type : String , require : true},
    isbn : {type : String , require : true},
    country : {type : String , require : true},
    bookImage : {type : String},
    authorImage : {type : String}
    
})
module.exports = mongoose.model('Book',BookSchema)