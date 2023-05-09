const express = require('express')
const router = express.Router()
const { User } = require('../models/user')

router.post(`/`, (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    user.save()
        .then((createUser) => {
            res.status(201).json(createUser)
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
                success: false,
            })
        })
})

module.exports = router
