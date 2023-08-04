const { User } = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get(`/`, async (req, res) => {
    const usersList = await User.find()

    if (!usersList) {
        res.status(500).json({ success: false })
    }
    res.send(usersList)
})

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHash')

    if (!user) {
        res.status(500).json({ message: 'The user ID not found' })
    }
    res.status(200).send({ user })
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
    })

    user = await user
        .save()
        .then((createUser) => {
            res.status(201).json(createUser)
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
                success: false,
            })
        })

    res.send(user)
})

router.post(`/register`, async (req, res) => {
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
    })

    user = await user
        .save()
        .then((createUser) => {
            res.status(201).json(createUser)
        })
        .catch((err) => {
            res.status(400).json({
                error: err,
                success: false,
            })
        })

    res.send(user)
})

router.put(`/:id`, async (req, res) => {
    const userExist = await User.findById(req.params.id)
    let newPassword
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street,
            zip: req.body.zip,
            isAdmin: req.body.isAdmin,
        },
        { new: true }
    )

    if (!user) {
        return res.status(400).json({ message: 'The user ID not found' })
    }

    res.status(200).send(user)
})

router.post(`/login`, async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin,
            },
            secret
            // { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.id, token: token })
    } else if (
        !user ||
        !bcrypt.compareSync(req.body.password, user.passwordHash)
    ) {
        res.status(400).send('Email or password are wrong')
    }
})

router.get(`/session`, async (req, res) => {
    // Assuming the session token is sent as a bearer token in the Authorization header
    const token = req.headers.authorization
    const secret = process.env.secret

    // Verify the session token and extract the user ID from it
    let userId
    try {
        const decodedToken = jwt.verify(token, secret)
        userId = decodedToken.userId
    } catch (err) {
        // If the token is invalid, return an error response
        return res.status(401).json({ message: 'Invalid session token' })
    }

    // Fetch the user based on the extracted user ID
    const user = await User.findById(userId)

    // If the user is not found, return an error response
    if (!user) {
        return res.status(404).json({ message: 'User not found' })
    }

    // Return the relevant session data
    const sessionData = {
        user: user.id,
        token: token,
    }

    res.status(200).json(sessionData)
})

module.exports = router
