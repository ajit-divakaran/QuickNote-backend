const jwt =  require('jsonwebtoken')
const users = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10; 

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username, email, password)
//  console.log("Full Request Body:", req.body); /
//  console.log("Request Headers:", req.headers['content-type']);
    
    try {
        //  Check if user exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json('User already exists');
        }

        //  Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        //  Create new user with hashed password
        const newUser = new users({
            username,
            email,
            password: hashedPassword
        });

        //  Save to database
        await newUser.save();
        res.status(200).json('New user created successfully');
        
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json('Internal server error');
    }
}

exports.login = async(req,res) => {
    const {email,pasword} = req.body;
    console.log(email,pasword)
    console.log("inside login")
    try {
         const existingUser = await users.findOne({email})

        console.log("Hello",existingUser)
        if(existingUser){

        // Compare hashed password with input
        const isMatch = await bcrypt.compare(pasword, existingUser.password);

        
        if (!isMatch) {
            return res.status(401).json('Invalid credentials');
        }

            const { password, email, ...userWithoutSensitiveInfo } = existingUser.toObject()
            console.log(userWithoutSensitiveInfo)
            const token = jwt.sign({userId:existingUser._id},'secretkey')
            res.status(200).json({userWithoutSensitiveInfo,token})
        }
        else{
         res.status(406).json("Incorrect email id or password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

