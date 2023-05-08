const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

require('dotenv/config')

const api = process.env.API_URL

//Middleware
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Say hello')
}) 

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'swap-book'
}).then(() => {
    console.log('Ready');
}).catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log(api);
    console.log('The server is running')
})
