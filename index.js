const express = require('express')

const cors = require('cors')

const router = require('./router')
require('dotenv').config()
require('./connection')


// Configure CORS for specific origins
const allowedOrigins = [
  'https://quick-note-frontend.vercel.app',

];

const corsOptions = {
  origin: function (origin, callback) {

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests (if needed for sessions/auth)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers from client
};

 

const noteServer = express()
noteServer.use(cors(corsOptions))
noteServer.use(express.json())





noteServer.use(router)

const PORT = 4002 || process.env.PORT

noteServer.listen(PORT,()=>{
    console.log(`Server successfully running on PORT ${PORT}`)
})
