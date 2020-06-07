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
      title: "Sadhak Data",
    });
  });

  adminRouter.route("/:id").post((req, res) => {
    id = req.params.id;
    data = { ...req.body, id: parseInt(req.params.id) };
    if (databaseOperations.doesExists(id)) {
      validationResult = validateData.validateData(data);
      if (validationResult.status == 200) {
        databaseOperations.editData(data);
        return res.redirect("/admin");
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
