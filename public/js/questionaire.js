$(document).ready(function() {
  $("select").formSelect();

  $("#submitBtn").on("click", function() {
    console.log($("#alias").val());
    console.log($("#videoGenre").val());
    console.log($("#musicGenre").val());
    console.log($("#gameGenre").val());
    console.log(
      $("#gameGenre")
        .find(":selected")
        .data("name")
    );

    console.log($("#console").val());
    console.log(
      $("#console")
        .find(":selected")
        .data("name")
    );

    var newUser = {
      Username: $("#alias").val(),
      MusicGenres: $("#videoGenre").val(),
      MovieGenres: $("#videoGenre").val(),
      tVGenres: $("#musicGenre").val(),
      gameGenres: $("#gameGenre").val()
    };

    // Send the POST request.
    // $.ajax("/api/userInfo", {
    //   type: "POST",
    //   data: newUser
    // }).then(() => {
    //   location.reload();
    // });
  });
<<<<<<< Updated upstream
});
=======

  function addUserPref(
    userName,
    avatarImg,
    enjoyMovieTV,
    enjoyMusic,
    enjoyGame,
    platform,
    play1,
    play2,
    play3,
    watch1,
    watch2,
    watch3,
    listen1,
    listen2,
    listen3,
    UserId
  ) {
    $.post("/api/userprefs", {
      userName: userName,
      avatarImg: avatarImg,
      enjoyMovieTV: enjoyMovieTV,
      enjoyMusic: enjoyMusic,
      enjoyGame: enjoyGame,
      platform: platform,
      play1: play1,
      play2: play2,
      play3: play3,
      watch1: watch1,
      watch2: watch2,
      watch3: watch3,
      listen1: listen1,
      listen2: listen2,
      listen3: listen3,
      UserId: UserId
    }).then(function(data) {
      // window.location.replace("/questionaire");
      console.log(data.userName, data.enjoyMovieTV);
      // If there's an error, handle it by throwing up a bootstrap alert
    });
    // .catch(handleLoginErr);
  }
});
>>>>>>> Stashed changes
