const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')


// الاتصال بـ MongoDB localhost
mongoose
  .connect("mongodb://127.0.0.1:27017/all-data") // "all-data" hiya database
  .then(() => {
    console.log("✅ MongoDB Connected (localhost)");
    app.listen(port, () => {
      console.log(`Server running: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });


  app.use(allRoutes)
  app.use("/user", addUserRoute)