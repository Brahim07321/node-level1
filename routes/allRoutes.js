const express = require("express");
const router = express.Router()
const User = require("../models/CustomerSchema"); // schema dyalek

var moment = require("moment");
const userController = require("../Controllers/userController")

// Get reqeust
router.get("/", userController.user_index_get );
  
 
  //get reqeust
  
  router.get("/index.html", (req, res) => {
    res.send("<h3>  send okey </h3>");
  });
  
  router.get("/edit/:id", userController.user_edit_get );
  // route باش تشوف تفاصيل المستخدم
  router.get("/view/:id", userController.user_view_get);
  
 
  
  //for search
  router.post("/search", userController.user_search_post );
  
  //Delete request
  router.delete("/edit/:id",userController.user_delet );
  
  //update data
  router.put("/edit/:id", userController.user_put );
  

module.exports = router