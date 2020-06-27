// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const orm = require("../config/orm.js");
var axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var apiCalls = require("../public/js/apiCalls");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    orm.signUp(req, res);
  });

  app.post("/api/userprefs", function (req, res) {
    orm.sendUserPrefs(req, res);
  });

  app.put("/api/userprefs/:id", function (req, res) {
    orm.updateUserPrefs(req, res);
  });

  app.post("/api/updateuserprefs/:id", function (req, res) {
    orm.updateUserPrefs(req, res);
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users", function (req, res) {
    orm.getUsers(req, res);
  });

  app.get("/api/mydata/:id", function (req, res) {
    orm.getMyData(req, res);
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  //game Route / Api call
  app.post("/api/game_genres", function (req, res) {
    console.log("in api-routes");
    var platformId = req.body.platformId;
    var genreId = req.body.genreId;
    // res.json(req.body);
    // console.log(req.body);
    apiCalls.gameApi(platformId, genreId, (data) => {
      // console.log(data);
      res.json(data);
    });
  });

  app.post("/api/game_solo", function (req, res) {
    console.log("in api-routes");
    var gameId = req.body.gameId;
    // res.json(req.body);
    // console.log(req.body);
    apiCalls.gameApiSolo(gameId, (data) => {
      // console.log(data);
      res.json(data);
    });
  });

  //music Route / Api call
  app.post("/api/music_genres", function (req, res) {
    // console.log(req.body.musicGenre);
    var musicGenre = req.body.musicGenre;
    apiCalls.musicApi(musicGenre, (data) => {
      data.slice(0, 5);
      // console.log(data);
      res.json(data);
    });
  });

  app.post("/api/music_solo", function (req, res) {
    console.log("in api-routes");
    var artist = req.body.artist;
    // res.json(req.body);
    // console.log(req.body);
    apiCalls.musicApiSolo(artist, (data) => {
      // console.log(data);
      res.json(data);
    });
  });

  //Movie Route / Api call
  app.post("/api/movie_genres", function (req, res) {
    var videoGenre = req.body.videoGenre;
    apiCalls.videoApi(videoGenre.toLowerCase(), "movie", (data) => {
      // console.log(data);
      res.json(data);
    });
  });

  //TV Show Route / Api call
  app.post("/api/show_genres", function (req, res) {
    var videoGenre = req.body.videoGenre;
    // console.log(req.body);
    apiCalls.videoApi(videoGenre.toLowerCase(), "show", (data) => {
      // console.log(data);
      res.json(data);
    });
  });
};
