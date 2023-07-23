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

router.get(`/:userId`, async (req, res) => {
    const userId = req.params.userId
    const userBooks = await Book.find({ user: userId })

    if (!userBooks) {
        res.status(500).json({ success: false })
    }
    res.send(userBooks)
})

router.post(`/`, async (req, res) => {
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        language: req.body.language,
        condition: req.body.condition,
        numberOfPages: req.body.numberOfPages,
        user: req.body.user.id,
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
