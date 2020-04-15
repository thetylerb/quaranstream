// const conn = require("./config.js");
const db = require("../models");

module.exports = {
  sendUserPrefs: function(req, res) {
    db.UserPref.create(req.body)
      .then(function(data) {
        // res.redirect(307, "/api/login");
        console.log("Success!");
        res.json(data);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  },
  getUsers: function(req, res) {
    db.UserPref.findAll({ raw: true }).then(users => {
      res.json(users);
    });
  },
  getMyData: function(req, res) {
    // console.log(req.params.id);
    db.UserPref.findOne({ where: { UserId: req.params.id } }).then(data => {
      res.json(data);
    });
  },
  signUp: function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  },
  updateUserPrefs: function(req, res) {
    console.log("it hit the ORM");
    db.UserPref.update(req.body, { where: { UserId: req.params.id } })
      .then(data => {
        res.json(data);
        console.log("update Success");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  }
};
