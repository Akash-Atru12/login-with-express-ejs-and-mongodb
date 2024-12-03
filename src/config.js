const mongoose =require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login") 

connect.then(() =>{
    console.log("connected to database")
})

.catch(() =>{
    console.log("database cannot be connected")
})

const Login = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true

    }
})

const collection = new mongoose.model("users",Login);

module.exports = collection;