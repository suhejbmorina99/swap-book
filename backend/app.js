const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')
const api = process.env.API_URL

const userRouter = require('./routers/users')

//Middleware
app.use(express.json())
app.use(morgan('tiny'))

//routers
app.use(`${api}/user`, userRouter)

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

app.listen(3000, () => {
    console.log('The server is running')
})
