$(document).ready(function() {
  $("select").formSelect();

  $("#gameCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#gameDrop").removeClass("invis");
      $("#prefDrop").removeClass("invis");
    } else {
      $("#gameDrop").addClass("invis");
      $("#prefDrop").addClass("invis");
    }
  });

  $("#musicCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#musicDrop").removeClass("invis");
    } else {
      $("#musicDrop").addClass("invis");
    }
  });

  $("#teleCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#teleDrop").removeClass("invis");
    } else {
      $("#teleDrop").addClass("invis");
    }
  });

  $("#movieCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#teleDrop").removeClass("invis");
    } else {
      $("#teleDrop").addClass("invis");
    }
  });

  var id;

  $.get("/api/user_data", function(info) {
    console.log(info);
    id = info.id;
  });

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
      enjoyMovieTV: 1,
      enjoyMusic: 1,
      enjoyGame: 1,
      platform: "playStation",
      play1: "Arcade",
      play2: "Adventure",
      play3: "Platform",
      watch1: "Arcade",
      watch2: "Adventure",
      watch3: "Platform",
      listen1: "Country",
      listen2: "Rock",
      listen3: "Wubstep",
      UserId: id
    };

    console.log(newUser);
    if (!newUser.userName || !newUser.avatarImg) {
      return;
    }

    console.log(id);
    addUserPref(
      newUser.userName,
      newUser.avatarImg,
      newUser.enjoyMovieTV,
      newUser.enjoyMusic,
      newUser.enjoyGame,
      newUser.platform,
      newUser.play1,
      newUser.play2,
      newUser.play3,
      newUser.watch1,
      newUser.watch2,
      newUser.watch3,
      newUser.listen1,
      newUser.listen2,
      newUser.listen3,
      newUser.UserId
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
