$(document).ready(function () {
  $.get("/api/user_data", function () {
    // console.log(data);
  }).then((data) => {
    myID = data;
    $.get(`/api/mydata/${myID.id}`, function () {
      // console.log(data);
    }).then((data) => {
      mySet = data;
      console.log(mySet);
      $("#alias").val(mySet.userName);
      $("#bio").val(mySet.bio);
      photoPath = mySet.avatarImg;

      genreData = {
        listenBool: mySet.enjoyMusic,
        watchBool: mySet.enjoyMovieTV,
        playBool: mySet.enjoyGame,
        listenGenre: [mySet.listen1, mySet.listen2, mySet.listen3],
        watchGenre: [mySet.watch1, mySet.watch2, mySet.watch3],
        playGenre: [mySet.play1, mySet.play2, mySet.play3],
      };
    });
  });

  $("select").formSelect();

  $(".carousel").carousel({
    dist: -50,
    shift: 0,
    padding: 20,
  });

  $("#gameCheck").on("change", function () {
    if ($(this).is(":checked")) {
      $("#gameDrop1").removeClass("invis");
      $("#gameGenre1").val(mySet.play1ID);
      $("#gameDrop2").removeClass("invis");
      $("#gameGenre2").val(mySet.play2ID);
      $("#gameDrop3").removeClass("invis");
      $("#gameGenre3").val(mySet.play3ID);
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
      $("#musicGenre1").val(mySet.listen1);
      $("#musicDrop2").removeClass("invis");
      $("#musicGenre2").val(mySet.listen2);
      $("#musicDrop3").removeClass("invis");
      $("#musicGenre3").val(mySet.listen3);
    } else {
      $("#musicDrop1").addClass("invis");
      $("#musicDrop2").addClass("invis");
      $("#musicDrop3").addClass("invis");
    }
  });

  $("#movieCheck").on("change", function () {
    if ($(this).is(":checked")) {
      $("#teleDrop1").removeClass("invis");
      $("#videoGenre1").val(mySet.watch1);
      $("#teleDrop2").removeClass("invis");
      $("#videoGenre2").val(mySet.watch2);
      $("#teleDrop3").removeClass("invis");
      $("#videoGenre3").val(mySet.watch3);
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

  $(".material-icons").on("click", function () {
    photoPath = $(this).data("path");
    $(this).html("check_box");
    // console.log("Clicked!");
    // console.log(photoPath);
  });

  $("#submitBtn").on("click", function () {
    event.preventDefault();

    console.log($("#gameGenre1").find(":selected").data("name"));

    if ($("#gameGenre1").find(":selected").data("name")) {
      play1 = $("#gameGenre1").find(":selected").data("name");
    } else {
      play1 = "0";
    }
    if ($("#gameGenre2").find(":selected").data("name")) {
      play2 = $("#gameGenre2").find(":selected").data("name");
    } else {
      play2 = "0";
    }
    if ($("#gameGenre3").find(":selected").data("name")) {
      play3 = $("#gameGenre3").find(":selected").data("name");
    } else {
      play3 = "0";
    }

    var newUser = {
      userName: $("#alias").val().trim(),
      avatarImg: photoPath,
      bio: $("#bio").val().trim(),
      enjoyMovieTV: $("#movieCheck").is(":checked"),
      enjoyMusic: $("#musicCheck").is(":checked"),
      enjoyGame: $("#gameCheck").is(":checked"),
      play1: play1,
      play1ID: $("#gameGenre1").val(),
      play2: play2,
      play2ID: $("#gameGenre2").val(),
      play3: play3,
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
        window.location = "/membership";
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
});
