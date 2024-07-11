const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const user = require('./schema')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.send("Hello world")
})

// api for user registration
app.post('/registration', async function (req, res) {
    try {
        await user.create({
            'username': req.body.username,
            'email': req.body.email,
            'password': req.body.password
        })
        res.send("Your data is sent successfully")
    } catch (error) {
        console.log(error)
    }
})

// api for user login
app.post('/login', async function (req, res) {
    try {
        let data = await user.findOne({
            'username': req.body.username
        }).exec()
        // check if data is null invalid user
        if (data == null) {
            res.send("invalid user")
        }
        // validate password
        else if (data.password === req.body.password) {
            res.send("<h1>Successfully logged in</h1>")
        }
        else {
            res.send("<h1>Password is invalid</h1>")
        }
    } catch (error) {
        console.log(error)
    }
})

// api for forgot password
app.post('/forgotpassword', async function (req, res) {
    try {
        let data = await user.findOne({ 'username': req.body.username }).exec()
        if (data == null) {
            res.send('Invalid username cannot change password')
        }
        else {
            await user.findOneAndUpdate({ 'username': req.body.username }, { 'password': req.body.password })
            res.send('successfully updated')
        }
    }
    catch (error) {
        console.log(error)
    }
})

async function main() {
    await mongoose.connect(process.env.URI)
}
main().catch(err => console.log(err))
app.listen(port, function () {
    console.log(`app is listening on the port:${port}`)
})
