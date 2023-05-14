const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
// const authJwt = require('./helpers/jwt')
// const errorHandler = require('./helpers/error-handler')

require('dotenv/config')

//Middleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
// app.use(authJwt())
// app.use(errorHandler())
app.options('*', cors())

//Routes
const userRouter = require('./routers/users')
const bookRouter = require('./routers/books')

const api = process.env.API_URL

app.use(`${api}/user`, userRouter)
app.use(`${api}/book`, bookRouter)

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
app.listen(3000, () => {
    console.log('The server is running')
})
