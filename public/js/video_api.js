// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// require("dotenv").config();

//can replace 'trending' with 'popular'
//trending = Returns all shows being watched right now. Shows with the most users are returned first.
//popular - Returns the most popular shows. Popularity is calculated using the rating percentage and the number of ratings.
// var MovieUrl = 'https://api.trakt.tv/movies/popular?limit=25&genres=drama';

//necessary passed in values
// var genreId = "";
// type = "movie";
// getPopularVideos(genreId, type);

// genreId = "comedy";
// type = "show";
// getPopularVideos(genreId, type, cb);

//Gets a list of popular movies or tv shows by genre if a genreId value was passed
function getPopularVideos(genreId, type, cb) {
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
    ""
  );

  request.onreadystatechange = function() {
    if (this.readyState === 4) {
      // console.log("Status:", this.status);
      // console.log("Headers:", this.getAllResponseHeaders());
      // console.log("Body:", this.responseText);
      var res = JSON.parse(this.responseText);
      // console.log(res);
      cb(res);
      // for (var i = 0; i < res.length; i++) {
      //   if (type === "movie") {
      //     console.log(
      //       i +
      //         1 +
      //         ") " +
      //         res[i].movie.title +
      //         " " +
      //         res[i].movie.year
      //     );
      //   } else if (type === "show") {
      //     console.log(
      //       i + 1 + ") " + res[i].show.title + " " + res[i].show.year
      //     );
      //   }
      // }
    }
  };
  request.send();
}

//necessary passed in values
// type = "show";
// name = "the OfFicE";
// videoInfo(name, type);

// type = "movie";
// name = "the lobster";
// videoInfo(name, type);

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
  request.setRequestHeader("trakt-api-key", "");

  request.onreadystatechange = function() {
    tvGenreArray = [];
    if (this.readyState === 4) {
      // console.log("Status:", this.status);
      // console.log("Headers:", this.getAllResponseHeaders());
      // console.log("Body:", this.responseText);
      var response = JSON.parse(this.responseText);
      if (type === "show") {
        var res = response[0].show;
      } else if (type === "movie") {
        var res = response[0].movie;
      }
      console.log(res);
      return res;
      // console.log("Title: " + re.title);
      // console.log("Year: " + re.year);
      // console.log("Summary: " + re.overview);
      // console.log(" Rating: " + re.rating);
      // console.log(" Trailer: " + re.trailer);
    }
  };

  request.send();
}
