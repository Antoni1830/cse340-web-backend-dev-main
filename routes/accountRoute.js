//Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

  
  //Deliver login view
  router.get("/login", utilities.handleErrors(accountController.buildLogin))

   //Deliver registration view
   router.get("/register", utilities.handleErrors(accountController.buildRegister))

   //POST router registration view
   router.post(
    '/register',
    regValidate.registationRules(),
    regValidate.checkRegData, 
    utilities.handleErrors(accountController.registerAccount)
  )
// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);

//default route to admin/management account
router.get("/", 
utilities.checkLogin, 
utilities.handleErrors(accountController.buildAccountMgmt))



module.exports = router;