// var axios = require("axios");
// require("dotenv").config();
// var genre = "";
// genre = "indie";
// getPopularArtists($("#musicGenre").val(), function(result) {
//   const musicData = result;
//   console.log(musicData);
// });

//top artists
function getPopularArtists(genre, cb) {
  var queryURL =
    "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=" +
    "" +
    "&format=json";
  if (genre !== "0") {
    queryURL = "http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists";
    queryURL += "&tag=" + genre;
    queryURL += "&api_key=" + "" + "&format=json";
  }

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    if (genre !== "0") {
      var res = response.topartists.artist;
    } else {
      var res = response.artists.artist;
    }
    // console.log(res);
    cb(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i].name);
    //   console.log(res[i].url);
    // }
  });
}

//
//get artist info
// var artist = "the postal service";
// artistInfo(artist);

function artistInfo(artist) {
  var queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo";
  queryURL += "&artist=" + artist;
  queryURL += "&api_key=" + "" + "&format=json";

  axios({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var res = response.data.artist;
    // console.log(res);
    return res;
    // console.log(res.url);
    // console.log(res.bio.summary);
    // console.log(res.similar.artist);
  });
}
