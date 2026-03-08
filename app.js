const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require('./routes/allRoutes')
const addUserRoute = require('./routes/addUser')


// الاتصال بـ MongoDB localhost
mongoose
  .connect("mongodb://brahimzarid7_db_user:5vowGR9ZfqyVGy0m@ac-39uzab0-shard-00-00.k8bd7sb.mongodb.net:27017,ac-39uzab0-shard-00-01.k8bd7sb.mongodb.net:27017,ac-39uzab0-shard-00-02.k8bd7sb.mongodb.net:27017/all-data?ssl=true&replicaSet=atlas-2oz14f-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(port, () => {
      console.log(`Server running: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection Error:", err.message);
  });
  //5vowGR9ZfqyVGy0m


  app.use(allRoutes)
  app.use("/user", addUserRoute)