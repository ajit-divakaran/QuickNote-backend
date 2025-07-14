const notes = require('../models/noteModel')

exports.addnote = async(req,res)=>{
    // createdAt,updatedAt,
    const {title,content,tags,userId} = req.body
    const today = new Date();
    // const formattedDate = today.toLocaleDateString('en-GB'); // British format (DD/MM/YYYY)
    // console.log(formattedDate);
    try {
        const notedata = new notes({title,content,tags,createdAt:today,updatedAt:today,userId})
        await notedata.save()
        res.status(200).json({title,content,tags,today})
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.editnote = async(req,res)=>{
// 
    const {noteid,title,content,tags} = req.body
    try {
        let existingNote = await notes.findById(noteid)
        if(existingNote){
            existingNote = await notes.findByIdAndUpdate(noteid,{title,content,tags,updatedAt:new Date()})
            res.status(200).json(existingNote)
        }
        else{

            res.status(406).json("Note doesn't exist")
        }
    } catch (error) {
        res.status(400).json("server error")
    } 
}

exports.deletenote = async(req,res) =>{
     const {noteid} = req.params
    try {
        let existingNote = await notes.findById(noteid)
        if(existingNote){
            existingNote = await notes.findByIdAndDelete(noteid)
            res.status(200).json(existingNote)
        }
        else{

            res.status(406).json("Note doesn't exist")
        }
    } catch (error) {
        res.status(400).json("server error")
    } 
}