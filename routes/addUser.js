const express = require("express");
const router = express.Router()
const User = require("../models/CustomerSchema"); // schema dyalek

var moment = require("moment");
const userController = require("../Controllers/userController")



 router.get("/add.html", userController.user_add_get);
  
 //post reqeust
  
  router.post("/add", userController.user_add_post);

  module.exports = router