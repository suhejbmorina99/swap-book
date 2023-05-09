const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    isAdmin: Boolean,
    name: String,
    email: String,
    password: String,
    passwordHash: String,
    phone: String,
    city: String,
    country: String,
    street: String,
    zip: Number,
})

exports.User = mongoose.model('User', userSchema)
