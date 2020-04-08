var axios = require("axios");
require("dotenv").config();
//2-point and click,4-fighting,5-shooter,7-music,8-platform,9-puzzle,10-racing,11-real time strategy,12-role playing game,13-simulator,14-sport,15-strategy,16-turn based strategy,24-tactical,25-hack and slash/beat em up,26-quiz/trivia,30-pinball,31-adventure,32-indie,33-arcade,34-visual novel

var gameGenreId = "";
// var gameGenreId = 14;
getPopularGames(gameGenreId);

function getPopularGames(genreId) {
  criteria =
    "fields aggregated_rating,aggregated_rating_count,category,collection,first_release_date,genres,name,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,summary,total_rating,total_rating_count; limit 5; sort popularity desc; where rating > 75 & rating_count > 0 & first_release_date > 1436883200";
  if (genreId) {
    criteria += " & genres = " + genreId + ";";
  } else {
    criteria += ";";
  }

  axios({
    url: "https://api-v3.igdb.com/games",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.gameApiKey
    },
    data: criteria
  })
    .then(function(response) {
      res = response.data;
      // console.log(res);
      for (var i = 0; i < res.length; i++) {
        console.log("Name: " + res[i].name);
        console.log("summary: " + res[i].summary);
        console.log("********************************************************");
      }
    })
    .catch(function(err) {
      console.error(err);
    });

  //other relevant outputs = genre, platform, rating, similar games id
}

//search for users input and then output options
var gameName = "grand theft auto";
gameName = gameName.split(" ").join("_");
findGameId(gameName);

function findGameId(gameName) {
  var gameUrl = "https://api-v3.igdb.com/games/?search=";
  gameUrl += gameName + "&fields=id,name";

  axios({
    url: gameUrl,
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.gameApiKey
    }
  })
    .then(function(response) {
      // console.log(response.data);

      console.log(response.data);
      var gameObject = response.data;
      console.log(gameObject[0].name);
    })
    .catch(function(err) {
      console.error(err);
    });
}

//have user confirm which game they want and search its id
var gameId = 19459;
getGameById(gameId);

function getGameById(gameId) {
  var criteria =
    "fields aggregated_rating,aggregated_rating_count,category,collection,first_release_date,genres,name,platforms,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates,screenshots,similar_games,slug,summary,total_rating,total_rating_count; limit 1; where id = 19459;";
  criteria += " where id = " + gameId + ";";

  axios({
    url: "https://api-v3.igdb.com/games/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.gameApiKey
    },
    data: criteria
  })
    .then(function(response) {
      var res = response.data;
      // console.log(res);
      console.log("Name: " + res[0].name);
      console.log("Rating: " + res[0].rating);
      console.log("Genre Id's: " + res[0].genres);
      console.log("Platform Id's: " + res[0].platforms);
      console.log("summary: " + res[0].summary);
      console.log("Similar Games: " + res[0].similar_games);
      console.log("************************************");
    })
    .catch(function(err) {
      console.error(err);
    });
}
