var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("dotenv").config();

//can replace 'trending' with 'popular'
//trending = Returns all shows being watched right now. Shows with the most users are returned first.
//popular - Returns the most popular shows. Popularity is calculated using the rating percentage and the number of ratings.
// var MovieUrl = 'https://api.trakt.tv/movies/popular?limit=25&genres=drama';

//necessary passed in values
var genreId = "";
type = "movie";
getPopularVideos(genreId, type);

genreId = "comedy";
type = "show";
getPopularVideos(genreId, type);

//Gets a list of popular movies or tv shows by genre if a genreId value was passed
function getPopularVideos(genreId, type) {
  var url =
    "https://api.trakt.tv/" + type + "s/trending?limit=25&extended=full";
  if (genreId) {
    url += "&genres=" + genreId;
  }

  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("trakt-api-version", "2");
  request.setRequestHeader("trakt-api-key", process.env.videoApiKey);

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      console.log(type.toUpperCase());
      console.log("--------------------------------");
      // console.log('Status:', this.status);
      // console.log('Headers:', this.getAllResponseHeaders());
      // console.log('Body:', this.responseText);
      response = JSON.parse(this.responseText);
      for (var i = 0; i < response.length; i++) {
        if (type === "movie") {
          console.log(
            i +
              1 +
              ") " +
              response[i].movie.title +
              " " +
              response[i].movie.year
          );
        } else if (type === "show") {
          console.log(
            i + 1 + ") " + response[i].show.title + " " + response[i].show.year
          );
        }
      }
    }
  };
  request.send();
}

//necessary passed in values
type = "show";
name = "the OfFicE";
videoInfo(name, type);

type = "movie";
name = "the lobster";
videoInfo(name, type);

//Get detailed info for 1 movie or show
function videoInfo(name, type) {
  name.split(" ").join("-");
  url =
    "https://api.trakt.tv/search/type/" +
    type +
    "?query=" +
    name +
    "&extended=full&limit=1";

  var request = new XMLHttpRequest();

  request.open("GET", url);

  request.setRequestHeader("Content-Type", "application/json");
  request.setRequestHeader("trakt-api-version", "2");
  request.setRequestHeader("trakt-api-key", process.env.videoApiKey);

  request.onreadystatechange = function() {
    tvGenreArray = [];
    if (this.readyState === 4) {
      // console.log("Status:", this.status);
      // console.log("Headers:", this.getAllResponseHeaders());
      // console.log("Body:", this.responseText);
      var response = JSON.parse(this.responseText);
      if (type === "show") {
        var re = response[0].show;
      } else if (type === "movie") {
        var re = response[0].movie;
      }
      console.log("Title: " + re.title);
      console.log("Year: " + re.year);
      console.log("Summary: " + re.overview);
      console.log(" Rating: " + re.rating);
      console.log(" Trailer: " + re.trailer);
    }
  };

  request.send();
}
