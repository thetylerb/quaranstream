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
});
