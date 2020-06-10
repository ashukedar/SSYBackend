const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validateData = require("../util/validations");
const databaseOperations = require("../json/databaseOperations");
const registrationRouter = express.Router();

function router() {
  registrationRouter.route("/").get((req, res) => {
    res.render("register/register", {});
  });

  registrationRouter.route("/").post((req, res) => {
    message = "";
    data = { ...req.body };
    validationResult = validateData.validateData(data);
    if (validationResult.status !== 200) message = validationResult.message;
    else {
      databaseOperations.addData(data);
      message = "Registered Successfully";
    }
    return res.render("admin/result", {
      title: "Sadhak Data",
      redirectTo: "/",
      message: message
    });
  });

  return registrationRouter;
}

module.exports = router;
