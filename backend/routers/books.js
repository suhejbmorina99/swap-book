const { Book } = require('../models/book')
const express = require('express')
const router = express.Router()
const { io } = require('../socket.service')

router.get(`/`, async (req, res) => {
    const booksList = await Book.find()

    if (!booksList) {
        res.status(500).json({ success: false })
    }
    res.send(booksList)
})

router.post(`/`, async (req, res) => {
    try {
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            isbn: req.body.isbn,
            language: req.body.language,
            condition: req.body.condition,
            numberOfPages: req.body.numberOfPages,
            category: req.body.category,
            publisher: req.body.publisher,
            user: req.body.user.id,
        })

        const createdBook = await book.save()
        res.status(201).json(createdBook)

        req.io.emit('userBooksUpdated', createdBook) // Emit the saved book
    } catch (err) {
        res.status(500).json({
            error: err,
            success: false,
        })
    }
})

router.get('/categories', async (req, res) => {
    try {
        // Check if specific categories are provided in the query parameters
        const { categories } = req.query
        let query = {}

        if (categories) {
            // If categories are provided, create a query to filter by those categories
            const categoriesArray = categories.split(',')
            query = { category: { $in: categoriesArray } }
            // $in: This is a MongoDB operator that selects the documents where the value of the category field
            // equals any value in the specified array.
        }

        // Query the database to get distinct categories based on the provided filter
        const resultCategories = await Book.distinct('category', query)

        if (!resultCategories || resultCategories.length === 0) {
            return res
                .status(404)
                .json({ message: 'No matching book categories found' })
        }

        res.status(200).json(resultCategories)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err.message,
        })
    }
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
        bookToUpdate.category = req.body.category || bookToUpdate.category
        bookToUpdate.publisher = req.body.publisher || bookToUpdate.publisher

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

// This route get all books that are not owned by the logged-in user
router.get(`/not-owned/:userId`, async (req, res) => {
    const userId = req.params.userId

    try {
        const userBooks = await Book.find({ user: { $ne: userId } })

        if (!userBooks || userBooks.length === 0) {
            return res
                .status(404)
                .json({ message: 'No books found for other users' })
        }

        res.status(200).json(userBooks)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err.message,
        })
    }
})

router.get(`/authors-except-me/:userId`, async (req, res) => {
    const userId = req.params.userId

    try {
        // Find all books that are not owned by the specified user
        const authorsExceptMe = await Book.distinct('author', {
            user: { $ne: userId },
        })

        if (!authorsExceptMe || authorsExceptMe.length === 0) {
            return res
                .status(404)
                .json({ message: 'No authors found except the current user' })
        }

        res.status(200).json(authorsExceptMe)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err.message,
        })
    }
})

// This route returns all books by the specific author
router.get('/specific-author/:authorName', async (req, res) => {
    const authorName = req.params.authorName

    try {
        if (!authorName) {
            return res.status(404).json({ message: 'Author not found' })
        }

        // Query the database to find all books by the specified author
        const booksByAuthor = await Book.find({ author: authorName })

        if (booksByAuthor.length === 0) {
            return res
                .status(404)
                .json({ message: 'No books found by this author' })
        }

        res.status(200).json(booksByAuthor)
    } catch (err) {
        res.status(500).json({
            message: 'An error occurred',
            error: err.message,
        })
    }
})

module.exports = router
