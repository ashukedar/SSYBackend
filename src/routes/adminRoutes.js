const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const adminRouter = express.Router();

function router() {
    
    adminRouter.route('/')
    .get((req,res) => {
        res.send("admin router");
    });

    return adminRouter;
}

module.exports = router;