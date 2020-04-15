// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/membership");
    // }
    res.sendFile(path.join(__dirname, "../public/landing.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/membership");
    // }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/membership", function(req, res) {
    if (!req.user) {
      res.redirect("/login.html");
    }
    res.sendFile(path.join(__dirname, "../public/membership.html"));
  });

  app.get("/questionaire", isAuthenticated, function(req, res) {
    if (!req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/questionaire.html"));
  });

  app.get("/update", isAuthenticated, function(req, res) {
    if (!req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/update.html"));
  });
};
