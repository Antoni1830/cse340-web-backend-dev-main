// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const dataValidate = require('../utilities/inventory-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//Route to build inventory item detail view
router.get("/detail/:itemId", utilities.handleErrors(invController.buildByItemId));

//Route to build vevhicle management view
router.get("/", utilities.handleErrors(invController.buildVehicleMngmt));

//Route to build add-classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassification));

//Process the add-classification data
router.post(
    "/add-classification",
dataValidate.classificationRules(),
dataValidate.checkClassData,
utilities.handleErrors(invController.addClassificationName));

//Route to build add-inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInv));

//Process ADD NEW INVENTORY data
router.post(
    "/add-inventory",
dataValidate.inventoryRules(),    
dataValidate.checkInvData,
utilities.handleErrors(invController.addInvData)
);

//Router to get vehicles/cars for management view to update and delete
router.get("/getInventory/:classification_id", utilities.handleErrors
(invController.getInventoryJSON));

//Route to edit vehicle/inventory 
router.get("/edit/:itemId", utilities.handleErrors(invController.editVehicleForm));

//Route to handle incoming request to edit vehicle/inventory form
router.post("/update/", 
dataValidate.inventoryRules(),
dataValidate.checkUpdateData,
utilities.handleErrors(invController.updateInventory));

//Route to delete vehicle/inventory form
router.get("/delete/:itemId", utilities.handleErrors(invController.deleteInvConfirmation));
router.post("/delete/", 
utilities.handleErrors(invController.deleteInventory));

module.exports = router;











