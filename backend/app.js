const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const authJwt = require('./helpers/jwt')

const socketIo = require('socket.io')
const http = require('http')
const server = http.createServer(app) // Create an HTTP server
const io = socketIo(server)
// const errorHandler = require('./helpers/error-handler')

require('dotenv/config')

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(authJwt())
// app.use(errorHandler())
app.options('*', cors())

//Routes
const userRouter = require('./routers/users')
const bookRouter = require('./routers/books')

const api = process.env.API_URL

app.use(`${api}/user`, userRouter)
app.use(`${api}/book`, bookRouter)

io.on('connection', (socket) => {
    console.log('A user connected')

    // You can add socket.io event handlers here
    // For example, to handle a book created event:
    socket.on('book created', (book) => {
        console.log('Book Created:', book)
        io.emit('book created', book)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

//Database connection
mongoose
    .connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'swap-book',
    })
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log(err)
    })

//Server
server.listen(3000, () => {
    console.log('The server is running')
})
