const mongoose = require('mongoose')
const {Schema} = mongoose

const nesgamesSchema = new Schema({
    title: String,
    description: String,
    picture: String,
    price: String,
    stock: String,
})
//Export du module via methode webpacks
module.exports = mongoose.model('nesgames', nesgamesSchema, 'nesgames')
