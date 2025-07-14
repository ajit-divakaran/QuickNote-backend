const express = require('express')

const cors = require('cors')

const router = require('./router')
require('dotenv').config()
require('./connection')




const noteServer = express()
noteServer.use(cors())
noteServer.use(express.json())




// noteServer.use('/upload',express.static('./uploads'))
noteServer.use(router)

const PORT = 4002 || process.env.PORT

noteServer.listen(PORT,()=>{
    console.log(`Server successfully running on PORT ${PORT}`)
})
