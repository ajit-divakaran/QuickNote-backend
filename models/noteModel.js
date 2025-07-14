const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    content:{
        required:true,
        type:String
    },
    tags:{
        
        type:Array
    },
    createdAt:{
        required:true,
        type:Date
    },
    updatedAt:{
        required:true,
        type:Date
    },
    userId:{
        required:true,
        type:String
    },
})
const notes = mongoose.model('notes',noteSchema)

module.exports = notes