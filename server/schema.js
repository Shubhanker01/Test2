const mongoose = require('mongoose')
const {Schema} = mongoose

const user = new Schema({
    "username":String,
    "email":String,
    "password":String
})

module.exports = mongoose.model('user',user)
