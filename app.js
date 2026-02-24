const express = require("express");
const mongoose = require("mongoose");
const Mydata = require("./models/mydataSchema"); // schema dyalek
const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
// bach n9ra data mn form
app.use(express.urlencoded({ extended: true }));
//public fulder
app.use(express.static("public"));



// الصفحة الرئيسية
app.get("/", (req, res) => {
  Mydata.find()
  .then((result) =>{
    res.render("home", {mytitle: "home page", arr: result});
  })
  .catch((err) =>{
    console.log(err);
  });



});

app.get("/index.html", (req, res) => {
  res.send("<h3>  send okey </h3>")
});

// POST request
app.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const mydata = new Mydata({
      UserNameee: req.body.usersNameee
    });

    console.log("Before Save:", mydata);

    await mydata.save();

    console.log("After Save:", mydata);

    res.redirect("/index.html");
  } catch (err) {
    console.log("ERROR:", err);
  }
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


  //auto refrisch 
  const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});