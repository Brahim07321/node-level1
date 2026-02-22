const express = require("express");
const mongoose = require("mongoose");
const Mydata = require("./models/mydataSchema"); // schema dyalek

const app = express();
const port = process.env.PORT || 3000;

// bach n9ra data mn form
app.use(express.urlencoded({ extended: true }));

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
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
