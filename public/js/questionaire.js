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
    // getPopularArtists($("#musicGenre").val());
    // getPopularGames($("#gameGenre").val());
    // getPopularVideos($("#videoGenre").val(), "movie");
    // getPopularVideos($("#videoGenre").val(), "show");
  });
});
