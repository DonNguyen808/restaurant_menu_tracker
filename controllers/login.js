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
                // whatever comes back from the bcrypt compare maybe true or false is put into the isMatch
                .then((isMatch) => {  // hover over isMatch says its boolean
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


    exports.PostSignup = async (req, res) => {
        let email = req.body.emailInput
        let pass = req.body.pwdInput

        if (email !=- '' && pass !== '') {
            let users = schemas.users
            let qry = {email: email}

            let userSearch = await users.findOne(qry)
            .then(async(data) => {
                if (!data) {
                    let saltRounds = 10
                    let passSalt = await bcrypt.genSalt(saltRounds, async(err, salt) => {
                        let passHash = await bcrypt.hash(pass, salt, async(err, hash) => {
                            let acct = {email: email, pwd: hash, level: 'admin'}
                            let newUser = new schemas.users(acct)
                            let saveUser = await newUser.save()
                        }
                    })
                }
            })

            res.render('login', {title: 'Login', loggedIn: false, error: 'Please login with your new account'})
        }else {
            res.render('new-actt', {title: 'New Account', loggedIn: false, error: 'All fields are required. Please check and try again.'})
        }
        }
}
