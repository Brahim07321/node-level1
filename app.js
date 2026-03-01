const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/CustomerSchema"); // schema dyalek
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
// bach n9ra data mn form
app.use(express.urlencoded({ extended: true }));
//public fulder
app.use(express.static("public"));

// Get reqeust
app.get("/", (req, res) => {
  res.render("index", {});
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});
app.get("/user/view.html", (req, res) => {
  res.render("user/view", {});
});
app.get("/user/edit.html", (req, res) => {
  res.render("user/edit", {});
});

app.get("/index.html", (req, res) => {
  res.send("<h3>  send okey </h3>");
});

//post reqeust

app.post("/user/add", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      res.redirect("/user/add");
      console.log(req.body);

    })
    .catch((err) => {
      console.log(err);
    });
});

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
