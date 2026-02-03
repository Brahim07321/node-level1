const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.sendFile("./views/home.html", { root: __dirname });
});



mongoose
  .connect(
    "mongodb+srv://dev_brahim:awSsotu73hNPZ5DS@cluster0.j16nknd.mongodb.net/myDB?retryWrites=true&w=majority"

  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:3000/`);
    });
    
  })
  .catch((err) => {
    console.log(err);
  });
