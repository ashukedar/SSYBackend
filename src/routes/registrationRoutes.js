const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validateData = require("../util/validations");
const databaseOperations = require("../json/databaseOperations");

const registrationRouter = express.Router();

function router() {
  registrationRouter.route("/").get((req, res) => {
    res.send("registartion router");
  });

  registrationRouter.route("/").post((req, res) => {
    data = {
      ...req.body
    };
    validationResult = validateData.validateData(data);
    if (validationResult.status == 200) {
      res.status(200).send(databaseOperations.addData(data));
    } else {
      res.status(validationResult.status).send(validationResult);
    }
  });

  return registrationRouter;
}

module.exports = router;
