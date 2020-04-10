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
// $(document).ready(function() {
$("select").formSelect();
var id;
$.get("/api/user_data", function(data) {
  id = data.id;
});

$("#submitBtn").on("click", function() {
  // event.preventDefault();
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

  var newUser = {
    userName: "Ralph",
    avatarImg: "https://djsjfn.com",
    enjoyMovie: true,
    enjoyMusic: false,
    enjoyTV: false,
    enjoyGame: true,
    userId: id
  };
  console.log(newUser);

  if (!newUser.userName || !newUser.avatarImg) {
    return;
  }

  addUserPref(
    newUser.userName,
    newUser.avatarImg,
    newUser.enjoyMovie,
    newUser.enjoyMusic,
    newUser.enjoyTV,
    newUser.enjoyGame
  );
  // Send the POST request.
  // $.ajax("/api/userInfo", {
  //   type: "POST",
  //   data: newUser
  // }).then(() => {
  //   location.reload();
  // });
});

function addUserPref(
  userName,
  avatarImg,
  enjoyMovie,
  enjoyMusic,
  enjoyTV,
  enjoyGame
) {
  $.post("/api/userPreferences", {
    userName: userName,
    avatarImg: avatarImg,
    enjoyMovie: enjoyMovie,
    enjoyMusic: enjoyMusic,
    enjoyTV: enjoyTV,
    enjoyGame: enjoyGame,
    UserId: id
  }).then(function(data) {
    // window.location.replace("/questionaire");
    console.log(data);
    // If there's an error, handle it by throwing up a bootstrap alert
  });
}
