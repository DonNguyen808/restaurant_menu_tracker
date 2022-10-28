const { model } = require('mongoose')
const schemas = require('../models/schemas.js')

model.exports = {
    getHome: async (req, res) => {
        let menu = schemas.menu
        let sesh = req.session

        let menuResult = await menu.find({})
        .then( (menuData)  => {
            res.render('index', {title: 'Menu Tracker', data: menuData, search: '', loggedIn: sesh.loggedIn})
        }
    },

    // query
    getSearch: async(req, res) => {
        let menu = schemas.menu
        let sesh = req.session
        let q = req.body.searchInput
        let menuData = null
        // finds all with that name?
        let qry = {name:{$regex: '^' + q, $options: 'i'}}

        if (q != null) {
            // goes into the db and finds it
            let menuResult = await menu.find(qry)
            .then((data) => {
                menuData = data
            }
            )
        } else {
            q = 'Search'
            let menuResults = await menu.find({})
            .then((data) => {
                menuData = data
            })

        }
        res.render('index', {title: 'Menu Tracker', data: menuData, search: q, loggedIn: sesh.loggedIn})

    }
}