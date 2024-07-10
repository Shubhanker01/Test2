const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.send("Hello world")
})

// api for user registration
app.post('/registration', function (req, res) {
    try {
        const data = req.body
        console.log(data)
        res.send("Your data is sent successfully")
    } catch (error) {
        console.log(error)
    }
})

async function main(){
    await mongoose.connect(process.env.URI)
}
main().catch(err => console.log(err))
app.listen(port, function () {
    console.log(`app is listening on the port:${port}`)
})
