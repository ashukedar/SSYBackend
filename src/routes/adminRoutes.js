const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validateData = require("../util/validations");
const databaseOperations = require("../json/databaseOperations");

const adminRouter = express.Router();

function router() {
  adminRouter.route("/").get((req, res) => {
    sadhakData = databaseOperations.getSadhakData();
    res.render("admin/admin", { sadhakData: sadhakData, title: "Sadhak Data" });
  });

  adminRouter.route("/:id").put((req, res) => {
    data = {
      ...req.body,
    };
    if (databaseOperations.doesExists(req.params.id)) {
      validationResult = validateData.validateData(data);
      if (validationResult.status == 200) {
        res.status(200).send(databaseOperations.editData(data));
      } else {
        res.status(validationResult.status).send(validationResult);
      }
    } else {
      res
        .status(validationResult.status)
        .send({ status: 400, message: "No such id exists" });
    }
  });

  return adminRouter;
}

module.exports = router;
