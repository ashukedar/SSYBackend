const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const registrationRouter = express.Router();

function router() {
    
    registrationRouter.route('/')
    .get((req,res) => {
        res.send("registartion router");
    });

    return registrationRouter;
}

module.exports = router;