const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({

firstName: String,
lastName: String,
email: String,
phoneNumer: String,
age: String,
country: String,
gender: String,
}, 
{timestamps: true}
);

const User = mongoose.model("customer", userSchema);

module.exports = User;
