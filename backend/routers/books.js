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

//This route return all books of specific user
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

router.patch('/:bookId', async (req, res) => {
    const bookId = req.params.bookId

    try {
        const bookToUpdate = await Book.findById(bookId)

        if (!bookToUpdate) {
            return res
                .status(404)
                .json({ success: false, message: 'Book not found' })
        }

        bookToUpdate.title = req.body.title || bookToUpdate.title
        bookToUpdate.author = req.body.author || bookToUpdate.author
        bookToUpdate.isbn = req.body.isbn || bookToUpdate.isbn
        bookToUpdate.language = req.body.language || bookToUpdate.language
        bookToUpdate.condition = req.body.condition || bookToUpdate.condition
        bookToUpdate.numberOfPages =
            req.body.numberOfPages || bookToUpdate.numberOfPages

        const updatedBook = await bookToUpdate.save()
        res.status(200).json({ success: true, updatedBook })
    } catch (err) {
        res.status(500).json({ success: false, error: err.message })
    }
})

router.get(`/bookId/:id`, async (req, res) => {
    const book = await Book.findById(req.params.id)

    if (!book) {
        res.status(500).json({ message: 'The book ID not found' })
    }
    res.status(200).send({ book })
})

router.delete(`/:id`, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(404).json({ message: 'The book ID not found' })
        }

        await book.deleteOne()

        res.status(200).json({ message: 'Book deleted successfully' })
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err.message,
        })
    }
})

module.exports = router
