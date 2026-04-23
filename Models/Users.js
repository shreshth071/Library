const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamps')
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email : { type : String , required : true },
    FirstName : {type : String , required : true },
    LastName : {type : String , required : true },
    MobileNo : {type : Number },
    PassWord : {type : String , require : true},
    userType : {type : Number , default : 2 , enum:[1,2]},//1 for admin , 2 for user
    lastLogin : {type : Date},
    createdAt : Date,
    updatedAt : Date
})
UserSchema.plugin(timeStamp,{index:true});
module.exports = mongoose.model('Users', UserSchema)