const mongoose = require('mongoose')

// create menu and user schema

let menuSchema = new mongoose.Schema({
    name: {type:String, require: true},
    icon: {type:String, require: true},
    menuUrl: {type:String, require: true},
    entryDate: {type:Date, default:Date.now},
})

let usersSchema = new mongoose.Schema({
    email: {type:String, require: true},
    pwd: {type:String, require: true},
    entryDate: {type:Date, default:Date.now},
})

// name of model, optional name of collection
let menu = mongoose.model('menu', menuSchema, 'menu');
let users = mongoose.model('users', usersSchema, 'users');
// group both models together inside of a single object 
// export it into one singular
let mySchemas = {
    'menu' : menu,
    'users' : users,
}

module.exports = mySchemas