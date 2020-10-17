const mongoose = require('mongoose')
const {Schema} = mongoose

const usersSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
})
//Export du module via methode webpacks
module.exports = mongoose.model('users', usersSchema, 'users')
