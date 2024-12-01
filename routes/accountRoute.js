// Needed Resources
const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Route to build Login View
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// Process the login attempt
router.post('/login', (req, res) => {
    regValidate.loginRulesRules(),
    regValidate.checkLoginData,
    res.status(200).send('login process')
})

// Route to build Registration View
router.get('/registration', utilities.handleErrors(accountController.buildRegistration))

// Route to handle Registration
router.post(
    '/registration',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

module.exports = router
