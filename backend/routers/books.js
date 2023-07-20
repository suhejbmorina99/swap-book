const { Book } = require('../models/book')
const express = require('express')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const booksList = await Book.find()

    if (!booksList) {
        res.status(500).json({ success: false })
    }
    res.send(booksList)
})

router.post(`/`, async (req, res) => {
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        language: req.body.language,
        condition: req.body.condition,
        numerOfPages: req.body.numerOfPages,
        user: req.body.user,
    })

    book = await book
        .save()
        .then((createBook) => {
            res.status(201).json(createBook)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })

    res.send(book)
})

module.exports = router
