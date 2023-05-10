const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    isAdmin: Boolean,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        default: '',
    },
    zip: {
        type: String,
        default: '',
    },
})

userSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

userSchema.set('toJSON', {
    virtuals: true,
})

exports.User = mongoose.model('User', userSchema)
//These needed if we want to change something in the schema this is the reason we separate
exports.userSchema = userSchema
