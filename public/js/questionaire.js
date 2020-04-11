$(document).ready(function() {
  $("select").formSelect();

  $("#gameCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#gameDrop1").removeClass("invis");
      $("#gameDrop2").removeClass("invis");
      $("#gameDrop3").removeClass("invis");
      $("#prefDrop").removeClass("invis");
    } else {
      $("#gameDrop1").addClass("invis");
      $("#gameDrop2").addClass("invis");
      $("#gameDrop3").addClass("invis");
      $("#prefDrop").addClass("invis");
    }
  });

  $("#musicCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#musicDrop1").removeClass("invis");
      $("#musicDrop2").removeClass("invis");
      $("#musicDrop3").removeClass("invis");
    } else {
      $("#musicDrop1").addClass("invis");
      $("#musicDrop2").addClass("invis");
      $("#musicDrop3").addClass("invis");
    }
  });

  $("#movieCheck").on("change", function() {
    if ($(this).is(":checked")) {
      $("#teleDrop1").removeClass("invis");
      $("#teleDrop2").removeClass("invis");
      $("#teleDrop3").removeClass("invis");
    } else {
      $("#teleDrop1").addClass("invis");
      $("#teleDrop2").addClass("invis");
      $("#teleDrop3").addClass("invis");
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
      userName: $("#alias")
        .val()
        .trim(),
      avatarImg: "photo",
      enjoyMovieTV: $("#movieCheck").is(":checked"),
      enjoyMusic: $("#musicCheck").is(":checked"),
      enjoyGame: $("#gameCheck").is(":checked"),
      platform: $("#console")
        .find(":selected")
        .data("name"),
      play1: $("#gameGenre1")
        .find(":selected")
        .data("name"),
      play2: $("#gameGenre2")
        .find(":selected")
        .data("name"),
      play3: $("#gameGenre3")
        .find(":selected")
        .data("name"),
      watch1: $("#videoGenre1").val(),
      watch2: $("#videoGenre2").val(),
      watch3: $("#videoGenre3").val(),
      listen1: $("#musicGenre1").val(),
      listen2: $("#musicGenre2").val(),
      listen3: $("#musicGenre3").val(),
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
