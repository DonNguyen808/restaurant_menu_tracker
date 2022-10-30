const schemas = require('../models/schemas.js')
// Doesn't display the password in plain text
const bcrypt = require('bcrypt')

// from the routes

// simply display login page
exports.getLogin = (req, res) => {
    // EJS
    res.render('login', {title: 'login', loggedIn: false, error: null})
}

exports.getSignup = (req, res) => {
    res.render('new-acct', {title: 'New Account', loggedIn: false, error: null})
}

exports.getLogout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

// async because will talk to the db
exports.PostLogin = async (req, res) => {
    let email = req.body.emailInput
    let pass = req.body.pwdInput
    let loginSuccess = false
    let sesh = req.session
    sesh.loggedIn = false

    // tells which schemas it should be using
    let users = schemas.users
    let qry = {email: email}

    // if its not empty
    if (email !=- '' && pass !== '') {
        // find one user with that email
        let usersResult = await users.findOne(qry)
        // if we get data back from that query
        .then(async(data) => {
            if (data) {
                // bcrypt has a built in method that compares hashmap pass
                let passResult = await bcrypt.compare(pass, data.pwd) 
                .then((isMatch) => {
                    if (isMatch) {
                        sesh.loggedIn = true
                        loginSuccess = true
                    }
                })
            }
        })
    }
    if (loginSuccess === true) {
        res.redirect('/')
    } else {
        res.render('login', {title: 'Login', loggedIn: false, error: 'Invalid Login!'})
    }

}
