const jwt = require("jsonwebtoken")
const jwtMiddleware = (req,res,next)=>{
    console.log('inside jwt middleware');
    const token = req.headers['authorization'].split(" ")[1]
    console.log(req.headers.authorization)
    console.log(token);
    try {
        const jwtResponse = jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(jwtResponse);
        req.payload = jwtResponse.userId
        next()
    } catch (error) {
        res.status(401).json('authorization failed due to', error)

    }
    
}

module.exports = jwtMiddleware