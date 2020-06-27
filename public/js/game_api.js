// const axios = require("axios");
// $.get("/api/gameGenreInfo", function(req, res) {
//   console.log(JSON.parse(req.body));
// });
// & first_release_date > 1436883200
// var gameGenreId = "";

function getPopularGames(genreId, platformId, cb) {
  criteria =
    "fields aggregated_rating,genres,name,platforms,rating,similar_games,summary; limit 5; sort popularity desc; where rating > 50;";
  if (genreId !== "0") {
    criteria += " & genres = " + genreId;
  }
  if (platformId !== "0") {
    criteria += " & platforms = " + platformId;
  }
  criteria += ";";

  // console.log(criteria);

  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": "",
    },
    data: criteria,
  })
    .then(function (response) {
      res = response;
      // console.log(res);
      cb(res);

      // for (var i = 0; i < res.length; i++) {
      //   // popularGamesObject[i].name = res[i].name;
      //   // popularGamesObject[i].summary = res[i].summary;
      //   console.log("Name: " + res[i].name);
      //   console.log("summary: " + res[i].summary);
      //   console.log("********************************************************");
      //other relevant outputs = genre, platform, rating, similar games id
      // }
    })
    .catch(function (err) {
      console.error(err);
    });
}

//search for users input and then output options
// var gameName = "grand theft auto";
// findGameId(gameName);

function findGameId(gameName) {
  gameName = gameName.split(" ").join("_");
  var gameUrl = "https://api-v3.igdb.com/games/?search=";
  gameUrl += gameName + "&fields=id,name";

  axios({
    url: gameUrl,
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": "",
    },
  })
    .then(function (response) {
      // console.log(response.data);
      var gameObject = response.data;
      return gameObject;
      // console.log(gameObject[0].name);
    })
    .catch(function (err) {
      console.error(err);
    });
}

//have user confirm which game they want and search its id
// var gameId = 19459;
// getGameById(gameId);

function getGameById(gameId) {
  var criteria =
    "fields screenshots.*,aggregated_rating,genres,name,platforms,rating,screenshots,similar_games,slug,summary,total_rating,total_rating_count; limit 1;";
  criteria += " where id = " + gameId + ";";
  // console.log(criteria);

  axios({
    url: "https://api-v3.igdb.com/games/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": "",
    },
    data: criteria,
  })
    .then(function (response) {
      var res = response.data;
      // console.log(res);
      // console.log(
      //   "https://images.igdb.com/igdb/image/upload/t_screenshot_huge/" +
      //     res[0].screenshots[0].image_id +
      //     ".jpg"
      // );
      return res;
      //   console.log("Name: " + res[0].name);
      //   console.log("Rating: " + res[0].rating);
      //   console.log("Genre Id's: " + res[0].genres);
      //   console.log("Platform Id's: " + res[0].platforms);
      //   console.log("summary: " + res[0].summary);
      //   console.log("Similar Games: " + res[0].similar_games);
      //   console.log("************************************");
    })
    .catch(function (err) {
      console.error(err);
    });
}
