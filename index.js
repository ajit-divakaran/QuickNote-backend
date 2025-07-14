const express = require('express')

const cors = require('cors')

const router = require('./router')
require('dotenv').config()
// require('./connection')
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// const apikey = process.env.API_KEY
// parse json data received

const noteServer = express()
noteServer.use(express.json())
noteServer.use(cors())




// noteServer.use('/upload',express.static('./uploads'))
noteServer.use(router)

const PORT = 4002 || process.env.PORT

noteServer.listen(PORT,()=>{
    console.log(`Server successfully running on PORT ${PORT}`)
})
