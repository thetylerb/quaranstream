var axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function gameApi(platformId, genreId, callback) {
  // do your api call here using axios
  // console.log(platformId, genreId);
  criteria =
    "fields aggregated_rating,genres,name,platforms,rating,screenshots,similar_games,summary,url; limit 5; sort popularity desc; where rating > 50;";

  if (genreId !== "0") {
    gameUrl = `https://api-v3.igdb.com/games?fields=name,platforms,popularity,rating,genres,summary,url&filter[genres][eq]=${genreId}&order=popularity:desc'`;
  } else {
    gameUrl =
      "https://api-v3.igdb.com/games?fields=name,platforms,popularity,rating,genres,summary,url&order=popularity:desc'";
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

function musicApi(genre, callback) {
  console.log(genre);
  var queryURL =
    "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
    process.env.musicApiKey +
    "&format=json";
  if (genre !== "0") {
    queryURL = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists";
    queryURL += "&tag=" + genre;
    queryURL += "&api_key=" + process.env.musicApiKey + "&format=json";
  }
  console.log(queryURL);

  axios({
    url: queryURL,
    method: "GET",
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
  request.setRequestHeader("trakt-api-key", process.env.videoApiKey);

  request.onreadystatechange = function () {
    if (this.readyState === 4) {
      // console.log("Status:", this.status);
      // console.log("Headers:", this.getAllResponseHeaders());
      // console.log("Body:", this.responseText);
      // console.log(this.responseText);
      var res = JSON.parse(this.responseText);
      // console.log(res);
      callback(res);
    }
  };
  request.send();
}

function gameApiSolo(gameId, callback) {
  var criteria =
    "fields screenshots.*,aggregated_rating,genres,name,platforms,rating,screenshots,similar_games,slug,summary,total_rating,total_rating_count; limit 1;";
  criteria += " where id = " + gameId + ";";
  console.log(criteria);

  axios({
    url: "https://api-v3.igdb.com/games/",
    method: "POST",
    headers: {
      Accept: "application/json",
      "user-key": process.env.gameApiKey,
    },
    data: criteria,
  })
    .then(function (response) {
      var res = response.data;
      console.log(res);
      // console.log(
      //   "https://images.igdb.com/igdb/image/upload/t_screenshot_huge/" +
      //     res[0].screenshots[0].image_id +
      //     ".jpg"
      // );
      callback(res);
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

function musicApiSolo(artist, callback) {
  var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo";
  queryURL += "&artist=" + artist;
  queryURL += "&api_key=" + process.env.musicApiKey + "&format=json";

  axios({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var res = response.data.artist;
    console.log(res);
    callback(res);
    // console.log(res.url);
    // console.log(res.bio.summary);
    // console.log(res.similar.artist);
  });
}

module.exports = { gameApi, gameApiSolo, musicApi, musicApiSolo, videoApi };
