$(document).ready(function() {
  $("select").formSelect();

  $("#submitBtn").on("click", function() {
    event.preventDefault();
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
      userName: "username",
      avatarImg: "photo",
      enjoyMovie: true,
      enjoyMusic: true,
      enjoyTV: true,
      enjoyGame: true
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
    $.post("/api/userprefs", {
      userName: userName,
      avatarImg: avatarImg,
      enjoyMovie: enjoyMovie,
      enjoyMusic: enjoyMusic,
      enjoyTV: enjoyTV,
      enjoyGame: enjoyGame
    }).then(function(data) {
      // window.location.replace("/questionaire");
      console.log(data.userName, data.enjoyMovie);
      // If there's an error, handle it by throwing up a bootstrap alert
    });
    // .catch(handleLoginErr);
  }
});
