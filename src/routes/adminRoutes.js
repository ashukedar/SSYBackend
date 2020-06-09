const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validateData = require("../util/validations");
const databaseOperations = require("../json/databaseOperations");

const adminRouter = express.Router();

function router() {
  adminRouter.route("/").get((req, res) => {
    sadhakData = databaseOperations.getSadhakData();
    res.render("admin/admin", {
      sadhakData: sadhakData,
      title: "Sadhak Data"
    });
  });

  adminRouter.route("/save/:id").post((req, res) => {
    id = parseInt(req.params.id);
    message = "";
    data = { ...req.body, id: id };
    if (!databaseOperations.doesExists(id)) message = "No such id exists";
    else {
      validationResult = validateData.validateData(data);
      if (validationResult.status != 200) message = validationResult.message;
      else {
        databaseOperations.editData(data);
        message = "Data updated successfully";
      }
    }
    return res.render("admin/result", {
      title: "Sadhak Data",
      message: message,
    });
  });

  adminRouter.route("/remove/:id").post((req, res) => {
    id = parseInt(req.params.id);
    message = "";
    if (!databaseOperations.doesExists(id)) message = "No such id exists";
    else {
      databaseOperations.removeData(id);
      message = "Data removed successfully";
    }
    return res.render("admin/result", {
      title: "Sadhak Data",
      message: message,
    });
  });

  return adminRouter;
}

module.exports = router;
