// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
const orm = require("../config/orm.js");
var axios = require("axios");;
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// var gameApi = require("../public/js/game_api");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    orm.signUp(req, res);
  });

  app.post("/api/userprefs", function(req, res) {
    orm.sendUserPrefs(req, res);
  });

  app.post("/api/updateuserprefs/:id", function(req, res) {
    orm.updateUserPrefs(req, res);
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/users", function(req, res) {
    orm.getUsers(req, res);
  });

  app.get("/api/mydata/:id", function(req, res) {
    orm.getMyData(req, res);
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
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
    gameApi(platformId, genreId, data => {
      console.log(data);
      res.json(data);
    });
  });

  function gameApi(platformId, genreId, callback) {
    // do your api call here using axios
    // console.log(platformId, genreId);
    criteria =
      "fields aggregated_rating,genres,name,platforms,rating,similar_games,summary; limit 5; sort popularity desc; where rating > 50;";
    
    if (genreId !== "0") {
      gameUrl = `https://api-v3.igdb.com/games?fields=name,platforms,popularity,rating,genres&filter[genres][eq]=${genreId}&order=popularity:desc'`
    }
    else {
      gameUrl = `https://api-v3.igdb.com/games?fields=name,platforms,popularity,rating,genres&order=popularity:desc'`
    }
  
  

    axios({
      url: gameUrl,
      method: "GET",
      headers: {
        Accept: "application/json",
        "user-key": process.env.gameApiKey,
      },
      // data: criteria,
    })
      .then(function (response) {
        // console.log(response);
        callback(response.data);
      })
      .catch(function (err) {
        console.error(err);
      });
  }


  //music Route / Api call
  app.post("/api/music_genres", function (req, res) {
    console.log(req.body.musicGenre);
    var musicGenre = req.body.musicGenre;
    musicApi(musicGenre, data => {
      data.slice(0, 5);
      console.log(data);
      res.json(data);
    });
  });

  function musicApi(genre, callback) {
    console.log(genre);
    var queryURL =
      "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
      process.env.musicApiKey +
      "&format=json";
    if (genre !== "0") {
      queryURL = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists";
      queryURL += "&tag=" + genre;
      queryURL +=
        "&api_key=" + process.env.musicApiKey + "&format=json";
    }
    console.log(queryURL);

    axios({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // console.log(response);
      if (genre !== "0") {
        var res = response.data.topartists.artist;
      } else {
        var res = response.data.artists.artist;
      }
      // console.log(res);
      callback(res);
     
    });
  }

  //Movie Route / Api call
  app.post("/api/movie_genres", function (req, res) {
    var videoGenre = req.body.videoGenre;
    videoApi(videoGenre.toLowerCase(), "movie", data => {
      // console.log(data);
      res.json(data);
    });
  });

  //TV Show Route / Api call
  app.post("/api/show_genres", function (req, res) {
    var videoGenre = req.body.videoGenre;
    console.log(req.body);
    videoApi(videoGenre.toLowerCase(), "show", data => {
      // console.log(data);
      res.json(data);
    });
  });

  function videoApi(genreId, type, callback) {
    console.log(genreId);
    var url = `https://api.trakt.tv/${type}s/trending?limit=5&extended=full`;
    if (genreId !== "0") {
      url += "&genres=" + genreId;
    }
    console.log(url);
  
    var request = new XMLHttpRequest();
  
    request.open("GET", url);
  
    request.setRequestHeader("Content-Type", "application/json");
    request.setRequestHeader("trakt-api-version", "2");
    request.setRequestHeader(
      "trakt-api-key",
      process.env.videoApiKey
    );
  
    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        // console.log("Status:", this.status);
        // console.log("Headers:", this.getAllResponseHeaders());
        // console.log("Body:", this.responseText);
        var res = JSON.parse(this.responseText);
        // console.log(res);
        callback(res);
    
      }
    };
    request.send();
  }
};

