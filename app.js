const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/CustomerSchema"); // schema dyalek
const app = express();
const port = process.env.PORT || 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
var moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Get reqeust
app.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  res.render("user/add", {});
});

//get reqeust

app.get("/index.html", (req, res) => {
  res.send("<h3>  send okey </h3>");
});

app.get("/edit/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })

    .catch((err) => {
      console.error(err);
    });
});
// route باش تشوف تفاصيل المستخدم
app.get("/view/:id", async (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })

    .catch((err) => {
      console.error(err);
    });
});

//post reqeust

app.post("/user/add", (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete request
app.delete("/edit/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)

    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

//update data
app.put("/edit/:id", (req, res) => {

  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
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
