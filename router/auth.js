const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate')
require('../db/conn')
const User = require('../models/userSchema')
const cookieParser = require("cookie-parser");
router.use(cookieParser());


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the required fields!" })
    }

    try {
        const userExists = await User.findOne({ email: email })

        if (userExists) {

            return res.status(500).json({ error: "User already exists!" })

        } else if (password != cpassword) {

            return res.status(422).json({ error: "Passwords not matching" })

        } else {

            const user = new User({ name, email, phone, work, password, cpassword })

            await user.save();

            res.status(201).json({ message: "Registration Successful!" })
        }


    } catch (error) {
        console.log(error);
    }


})

router.post('/signin', async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill the required fields!" })
    }

    try {
        const userLogin = await User.findOne({ email: email })

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            let token = await userLogin.generateAuthToken()
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1000 * 60 * 5),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Login Credentials" })

            } else {
                res.status(201).json({ message: "Signin Successful!" })

            }
        } else {
            res.status(400).json({ error: "Invalid Login Credentials" })

        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/about', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser)
})

router.post('/contact', authenticate, async (req, res) => {

    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone || !message) {
            return res.json({ error: "Please fill the contact form" })
        }

        const userContact = await User.findOne({ _id: req.userID });

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save()

            res.status(201).json({ message: "Message sent successfully" })
        }
    } catch (error) {
        console.log(error);
    }
})


router.get('/logout', (req, res) => {

    res.clearCookie('jwtoken', { path: '/ ' })
    res.status(200).send("Logout Successfully!")
})

module.exports = router