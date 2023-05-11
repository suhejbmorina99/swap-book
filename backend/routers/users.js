const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get(`/`, async (req, res) => {
    const usersList = await User.find().populate('book')

    if (!usersList) {
        res.status(500).json({ success: false })
    }
    res.send(usersList)
})

router.post(`/`, async (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        city: req.body.city,
        country: req.body.country,
        street: req.body.street,
        zip: req.body.zip,
        isAdmin: req.body.isAdmin,
        book: req.body.book
    })

    user = await user
        .save()
        .then((createUser) => {
            res.status(201).json(createUser)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })

    res.send(user)
})

module.exports = router
