const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
})

bookSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

bookSchema.set('toJSON', {
    virtuals: true,
})

exports.Book = mongoose.model('Book', bookSchema)
//These needed if we want to change something in the schema this is the reason we separate
exports.bookSchema = bookSchema