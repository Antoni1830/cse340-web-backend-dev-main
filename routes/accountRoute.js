// Needed Resources
const express = require('express')
const router = new express.Router()
const utilities = require('../utilities/')
const accountController = require('../controllers/accountController')
const regValidate = require('../utilities/account-validation')

// Route to build Login View
router.get('/login', utilities.handleErrors(accountController.buildLogin))
//Deliver registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )

  // Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);
// Route to build Registration View
router.get('/registration', utilities.handleErrors(accountController.buildRegistration))

// Route to handle Registration
router.post(
    '/registration',
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
)

//default route to admin/management account
router.get("/", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildAccountMgmt))
  
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

module.exports = router
