const express = require('express')

const cors = require('cors')

const router = require('./router')
require('dotenv').config()
require('./connection')


// Configure CORS for specific origins
const allowedOrigins = [
  'https://quick-note-frontend.vercel.app',
  // Add other allowed origins here if you have them (e.g., your local development URL)
  // 'http://localhost:3000', // For local development
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or if the origin is in our allowedOrigins list
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




// noteServer.use('/upload',express.static('./uploads'))
noteServer.use(router)

const PORT = 4002 || process.env.PORT

noteServer.listen(PORT,()=>{
    console.log(`Server successfully running on PORT ${PORT}`)
})
