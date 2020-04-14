$(document).ready(function() {
  $("select").formSelect();

  $(".carousel").carousel({
    dist: -50,
    shift: 0,
    padding: 20
  });

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

  let photoPath;

  $(".material-icons").on("click", function() {
    photoPath = $(this).data("path");
    // console.log("Clicked!");
    // console.log(photoPath);
  });

  $("#submitBtn").on("click", function() {
    event.preventDefault();
    var newUser = {
      userName: $("#alias")
        .val()
        .trim(),
      avatarImg: photoPath,
      bio: $("#bio")
        .val()
        .trim(),
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
    console.log(id);
    localStorage.setItem("gameGenre1", $("#gameGenre1").val());
    localStorage.setItem("gameGenre2", $("#gameGenre2").val());
    localStorage.setItem("gameGenre3", $("#gameGenre3").val());
    console.log($("#console").val());
    localStorage.setItem("platform", $("#console").val());

    updateUserPref(
      newUser.userName,
      newUser.avatarImg,
      newUser.bio,
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
  });

  function updateUserPref(
    userName,
    avatarImg,
    bio,
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
    $.post(`/api/updateuserprefs/${id}`, {
      userName: userName,
      avatarImg: avatarImg,
      bio: bio,
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
    })
      .then(function(data) {
        console.log("the then part works");
        window.location = "/membership";
        localStorage.setItem("dataObj", JSON.stringify(data));
        console.log(data.userName, data.enjoyMovieTV);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
