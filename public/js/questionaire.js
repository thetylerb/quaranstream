$(document).ready(function() {
  $("select").formSelect();


  $("#gameCheck").on("change", function() {
    if ($(this).is(':checked')) {
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
    if ($(this).is(':checked')) {
      $("#musicDrop1").removeClass("invis");
      $("#musicDrop2").removeClass("invis");
      $("#musicDrop3").removeClass("invis");
    } else {
      $("#musicDrop1").addClass("invis");
      $("#musicDrop2").addClass("invis");
      $("#musicDrop3").addClass("invis");
    }
  });
  
  $("#teleCheck").on("change", function() {
    if ($(this).is(':checked')) {
      $("#teleDrop1").removeClass("invis");
      $("#teleDrop2").removeClass("invis");
      $("#teleDrop3").removeClass("invis");
    } else {
      $("#teleDrop1").addClass("invis");
      $("#teleDrop2").addClass("invis");
      $("#teleDrop3").addClass("invis");
    }
  });
  
  $("#movieCheck").on("change", function() {
    if ($(this).is(':checked')) {
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

    console.log(id);
    addUserPref(
      newUser.userName,
      newUser.avatarImg,
      newUser.enjoyMovie,
      newUser.enjoyMusic,
      newUser.enjoyTV,
      newUser.enjoyGame,
      id
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
    enjoyGame,
    userId
  ) {
    $.post("/api/userprefs", {
      userName: userName,
      avatarImg: avatarImg,
      enjoyMovie: enjoyMovie,
      enjoyMusic: enjoyMusic,
      enjoyTV: enjoyTV,
      enjoyGame: enjoyGame,
      UserId: userId
    }).then(function(data) {
      // window.location.replace("/questionaire");
      console.log(data.userName, data.enjoyMovie);
      // If there's an error, handle it by throwing up a bootstrap alert
    });
    // .catch(handleLoginErr);
  }
});
