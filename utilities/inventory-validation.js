const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  /* **************
  ADD CLASSIFICATION server validation rules
  *************** */
 validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim()
        .escape()
        .notEmpty()
        .isAlpha()
        .withMessage("A valid name is required. Use only alphabetical characters withtout space."),
    ]
 }

  /* ************
 Check data and return errors or continue adding new classification
 ************* */
 validate.checkClassData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors, 
            title: "Add Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

 /* *********************
 ADD NEW INVENTORY server validation rules
 ******************** */
 validate.inventoryRules = () => {
    return [
        body("classification_id")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1 })
        .isInt()
        .withMessage("Please select a classification."),
       

        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Make value is missing")
        .isLength({min:1})
        .withMessage("Please add a valid make."),
        

        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Model value is missing")
        .isLength({min: 1})
        .withMessage("Please add a valid model."),

        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please write a description."),

        body("inv_image")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please add an image."),
        

        body("inv_thumbnail")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please add a thumbnail."),
        

        body("inv_price")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Price value is missing.")
        .isNumeric()
        .withMessage("Price must be a number."),

        body("inv_year")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Year value missing.")
        .isNumeric()
        .withMessage("Year must be a number."),

        body("inv_miles")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Price value is missing.")
        .isNumeric()
        .withMessage("Miles must be a number."),

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .isLength({min: 1})
        .withMessage("Please add a color."),
    ]
}

/* ***********************
Check data and return errors or continue adding inventory items
************************ */
validate.checkInvData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Vehicle",
            nav,
            classification_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
        })
        return
    }
    next()
}

/* ***********************
Check data and return errors or continue UPDATING/EDITING inventory/vehicles
************************ */
validate.checkUpdateData = async (req, res, next) => {
    const {
        inv_id, 
        inv_make,
        inv_model, 
        inv_description, 
        inv_image, 
        inv_thumbnail, 
        inv_price, 
        inv_year, 
        inv_miles, 
        inv_color,
        classification_id, 
    } = req.body

    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        const classificationDropdown = await utilities.buildClassificationList(classification_id)
    const title = inv_make + " " + inv_model
        res.render("inventory/edit-inventory", {
            errors,
            title: "Edit" + title,
            nav,
            classificationDropdown,
            inv_id,
            inv_make,
            inv_model,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_year,
            inv_miles,
            inv_color,
        })
        return
    }
    next()
}

module.exports = validate 