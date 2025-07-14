exports.register = async(req,res) =>{
    // const {username,email,password} = req.body
    try {

        console.log("Inside Registration")
        res.status(200).json('New User-1 Added')
   
    } catch (error) {
        res.status(401).json(error)
    }
}