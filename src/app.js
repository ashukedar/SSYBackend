const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views/"));
app.set("view engine", "ejs");

const registrationRoute = require(path.join(
  __dirname,
  "/routes/registrationRoutes"
))();
const adminRoute = require(path.join(__dirname, "/routes/adminRoutes"))();
app.use("/registration", registrationRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.render("index");
});

var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
