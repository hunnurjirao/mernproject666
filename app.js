const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express()

dotenv.config({ path: './config.env' })

const port = process.env.PORT || 5000;
app.use(express.json())
require('./db/conn')
const User = require('./models/userSchema')

app.use(require('./router/auth'))
app.use(cookieParser());


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})

