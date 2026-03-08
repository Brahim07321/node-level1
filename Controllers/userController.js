const User = require("../models/CustomerSchema"); // schema dyalek
var moment = require("moment");

const user_index_get = (req, res) => {
  User.find()
    .then((result) => {
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_edit_get = (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/edit", { obj: result, moment: moment });
    })

    .catch((err) => {
      console.error(err);
    });
};
// route باش تشوف تفاصيل المستخدم

const user_view_get = async (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.render("user/view", { obj: result, moment: moment });
    })

    .catch((err) => {
      console.error(err);
    });
};

//for delet
const user_delet = (req, res) => {
  User.findByIdAndDelete(req.params.id)

    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

///search
const user_search_post = (req, res) => {
  console.log("****************************");
  const saerchText = req.body.saerchText.trim();
  User.find({ $or: [{ firstName: saerchText }, { lastName: saerchText }] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};
//update data

const user_put = (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      console.log(result);
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

///ger add
const user_add_get = (req, res) => {
  res.render("user/add", {});
};

//post reqeust
const user_add_post = (req, res) => {
  User.create(req.body)
    .then(() => {
      res.redirect("/");
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_delet,
  user_search_post,
  user_put,
  user_view_get,
  user_add_get,
  user_add_post,
};
