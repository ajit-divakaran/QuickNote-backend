const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique: true
    },
    password:{
        required:true,
        type:String
    },
})
const users = mongoose.model('users',userSchema)

module.exports = users