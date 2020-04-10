//   getPopularGames($("#gameGenre").val(), $("#console").val(), function(result) {
//     const gameData = result;
//     // console.log(gameData);
//   });
//   getPopularArtists($("#musicGenre").val(), function(result) {
//     const musicData = result;
//     // console.log(musicData);
//   });
//   getPopularVideos($("#videoGenre").val(), "movie", function(result) {
//     const movieData = result;
//     // console.log(movieData);
//   });
//   getPopularVideos($("#videoGenre").val(), "show", function(result) {
//     const tvData = result;
//     // console.log(tvData);
//   });

// console.log($("#alias").val());
// console.log($("#videoGenre").val());
// console.log($("#musicGenre").val());
// console.log($("#gameGenre").val());
// console.log(
//   $("#gameGenre")
//     .find(":selected")
//     .data("name")
// );

// console.log($("#console").val());
// console.log(
//   $("#console")
//     .find(":selected")
//     .data("name")
// );
$(document).ready(function() {
  $("select").formSelect();

  $("#submitBtn").on("click", function() {
    var newUser = {
      userName: "dude",
      avatarImg: "https:/kdnlsknf",
      enjoyMovie: true,
      enjoyMusic: true,
      enjoyTV: false,
      enjoyGame: true,
      UserId: 1
    };
    console.log(newUser);

    $.post("/api/userPrefs", newUser).then(function(data) {
      console.log(data);
      // window.location.replace("/members");at
    });
  });
});
