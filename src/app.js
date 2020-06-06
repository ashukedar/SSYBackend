const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const validateData = require("./util/validations");
const databaseOperations = require("./json/database");
//--------------------------------------------------------------------------
const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/register", function(req, res) {
  data = {
    ...req.body
  };
  validationResult = validateData.validateData(data);
  if (validationResult.status == 200) {
    databaseOperations.addData(data);
    res.status(200).send(data);
  } else {
    res.status(validationResult.status).send(validationResult);
  }
});

app.get("/admin", function(req, res) {
  response = databaseOperations.getAllData();
  res.end(JSON.stringify(response));
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
