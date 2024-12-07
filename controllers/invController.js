const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")


const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* **********************
* Build inventory item detail view
* **********************/
invCont.buildByItemId = async function (req, res, next) {
  //get inventory from the request
  const inv_id = req.params.itemId
  //use inventory id to get inventory based on id
  const data = await invModel.getItemById(inv_id)
  //build view with the vehicles/inventory results
  const grid = await utilities.buildItemGrid(data)
  //get nav
  let nav = await utilities.getNav()
  //create a title for the page
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model
  //render page
  res.render("./inventory/detail", {
    title:`${itemName} ${itemModel}`,
    nav,
    grid,
    errors: null,
  })
}

/* **********************
* Build vehicle Management view 
* **********************/
invCont.buildVehicleMngmt = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationDropdown= await utilities.buildClassificationList();
  res.render("inventory/management", {
    title:"Vehicle Management",
    nav,
    errors: null,
    classificationDropdown,
  })
}

/* **********************
* Build ADD CLASSIFICATION form view
* **********************/
invCont.buildAddClassification = async function (req, res, next){
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title:"Add Classification",
    nav,
    errors: null,
  })
}

/* ******************
Process ADD CLASSIFICATION data
******************** */
invCont.addClassificationName = async function (req, res, next) {
  
  const { classification_name } = req.body

  const addClassResult = await invModel.addClassificationName(classification_name);
  let nav = await utilities.getNav()
  if (addClassResult) {
    req.flash(
      "notice",
      `Classification ${classification_name} was successfully added.`
    );
    res.render("inventory/management",{
      title: "Vehicle Management",
      errors: null,
      nav,
      classification_name, 
    });
  } else {
    req.flash("notice", "Sorry, new classification couldn't be added.")
    res.status(501).render("inventory/add-classification", {
      title: "Add Classification",
      errors: null,
      nav,
      classification_name,
    })
  }
}

/* **********************
* Build ADD INVENTORY view
* **********************/
invCont.buildAddInv = async function (req,res,next){
  let nav = await utilities.getNav()
  let classificationDropdown = await utilities.buildClassificationList();

  res.render("inventory/add-inventory", {
    title:"Add New Vehicle",
    nav,
    errors: null,
    classificationDropdown,
  });
};

/* ******************
Process ADD NEW INVENTORY data
******************** */
invCont.addInvData = async function (req, res) {
  const nav = await utilities.getNav();
 
  const { 
    classification_id, 
    inv_make,
    inv_model, 
    inv_description, 
    inv_image, 
    inv_thumbnail, 
    inv_price, 
    inv_year, 
    inv_miles, 
    inv_color 
  } = req.body
  
  const addInvResult = await invModel.addInvData(
    classification_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color
  );

  if (addInvResult) {
    req.flash (
      "notice",
      `Congratulations! New vehicle was added.`
    );
    const classificationDropdown = await utilities.buildClassificationList(classification_id); 
    res.render("inventory/management", {
      title: "Vehicle Management",
      nav,
      errors: null,
      classificationDropdown,
    });
  } else {
    req.flash("notice", "Sorry, the vehicle was not added.");
    res.render("inventory/add-inventory", {
      title: "Add New Vehicle",
      nav,
      errors: null,
    });
  }
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build vehicle edit form view
 * ************************** */
invCont.editVehicleForm = async function (req, res, next) {
  const inv_id = parseInt(req.params.itemId)
  let nav = await utilities.getNav()
  const itemData = await invModel.getItemById(inv_id)
  const itemMake = itemData[0].inv_make
  const itemModel = itemData[0].inv_model
  let classificationDropdown = await utilities.buildClassificationList(
    itemData[0].classification_id)
  res.render("inventory/edit-inventory", {
    title: `Edit ${itemMake} ${itemModel}`,
    nav,
    classificationDropdown: classificationDropdown,
    errors: null,
    inv_id: itemData[0].inv_id,
    inv_make: itemData[0].inv_make,
    inv_model: itemData[0].inv_model,
    inv_year: itemData[0].inv_year,
    inv_description: itemData[0].inv_description,
    inv_image: itemData[0].inv_image,
    inv_thumbnail: itemData[0].inv_thumbnail,
    inv_price: itemData[0].inv_price,
    inv_miles: itemData[0].inv_miles,
    inv_color: itemData[0].inv_color,
    classification_id: itemData[0].classification_id
  })
}

/* ******************
EDIT/UPDATE INVENTORY data
******************** */
invCont.updateInventory = async function (req, res) {
  let nav = await utilities.getNav();
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
    classification_id  
  } = req.body
  
  const updateResult = await invModel.updateInventory(
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
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash (
      "notice",
      `${itemName} was successfully updated.`)
      res.redirect("/inv/")
  } else {
    let classificationDropdown = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice","Sorry, the insert failed.")
    return res.status(501).render("inventory/edit-inventory", {
      title: "Edit" + itemName,
      nav,
      classificationDropdown,
      errors: null,
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
      classification_id
    });
  }
}

/* **********************
* Build Inventory deletion confirmation view
* **********************/
invCont.deleteInvConfirmation = async function (req, res, next) {
  const inv_id = req.params.itemId
  let nav = await utilities.getNav()
  const data = await invModel.getItemById(inv_id)
  const itemName = data[0].inv_make
  const itemModel = data[0].inv_model

  res.render("inventory/delete-confirm", {
    title:` Delete ${itemName} ${itemModel}`,
    nav,
    errors: null,
    inv_id: data[0].inv_id,
    inv_make: data[0].iv_make,
    inv_model: data[0].inv_model,
    inv_year: data[0].inv_year,
    inv_price: data[0].inv_price
  })
}

/* ******************
Post request DELETE INVENTORY data
******************** */
invCont.deleteInventory = async function (req, res, next) {
  let nav = await utilities.getNav();

  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price,
  } = req.body

  const deleteResult = await invModel.deleteInvItems(
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_price
  )

  if (deleteResult) {
    req.flash (
      "notice",
      `Vehicle was successfully deleted.`)
      res.redirect("/inv/")
  } else {
    req.flash("notice","Sorry, the vehicle was not deleted.")
    return res.redirect("/inv/delete/" + inv_id)
  } 
}

module.exports = invCont