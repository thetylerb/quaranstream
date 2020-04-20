$(document).ready(function () {
  $("select").formSelect();

  $(".carousel").carousel({
    dist: -50,
    shift: 0,
    padding: 20,
  });

  $("#gameCheck").on("change", function () {
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

  $("#musicCheck").on("change", function () {
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

  $("#movieCheck").on("change", function () {
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

  $.get("/api/user_data", function (info) {
    console.log(info);
    id = info.id;
  });

  let photoPath;

  $(".material-icons").on("click", function () {
    photoPath = $(this).data("path");
    $(this).html("check_box");
    // console.log("Clicked!");
    // console.log(photoPath);
  });

  $("#submitBtn").on("click", function () {
    event.preventDefault();
    var newUser = {
      userName: $("#alias").val().trim(),
      avatarImg: photoPath,
      bio: $("#bio").val().trim(),
      enjoyMovieTV: $("#movieCheck").is(":checked"),
      enjoyMusic: $("#musicCheck").is(":checked"),
      enjoyGame: $("#gameCheck").is(":checked"),
      platform: $("#platform").find(":selected").data("name"),
      platformID: $("#platform").val(),
      play1: $("#gameGenre1").find(":selected").data("name"),
      play1ID: $("#gameGenre1").val(),
      play2: $("#gameGenre2").find(":selected").data("name"),
      play2ID: $("#gameGenre2").val(),
      play3: $("#gameGenre3").find(":selected").data("name"),
      play3ID: $("#gameGenre3").val(),
      watch1: $("#videoGenre1").val(),
      watch2: $("#videoGenre2").val(),
      watch3: $("#videoGenre3").val(),
      listen1: $("#musicGenre1").val(),
      listen2: $("#musicGenre2").val(),
      listen3: $("#musicGenre3").val(),
      UserId: id,
    };

    console.log(newUser);
    console.log(id);

    $.ajax({
      method: "PUT",
      url: "/api/userprefs/" + id,
      data: newUser,
    })
      .then(function (data) {
        console.log("update then");
        window.location = "/membership";
        console.log(data.userName, data.enjoyMovieTV);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
