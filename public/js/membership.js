$(document).ready(function() {
  var dataObj = JSON.parse(localStorage.getItem("dataObj"));
  console.log(dataObj);
  var gameGen = localStorage.getItem("gameGenre1");
  var gameGenre1 = localStorage.getItem("gameObj");
  buildGames(JSON.parse(gameGenre1))
  var musicGenre1 = localStorage.getItem("musicObj");
  buildMusic(JSON.parse(musicGenre1))
  var showGenre1 = localStorage.getItem("showObj");
  buildShows(JSON.parse(showGenre1))
  var movieGenre1 = localStorage.getItem("movieObj");
  buildMovies(JSON.parse(movieGenre1))


  function buildMusic(musicData) {
    if (dataObj.listen1 !== "0") {
      $("#musicGenre").text(" - " + dataObj.listen1);
    }
    for (let i = 0; i < 5; i++) {
      $(`#artist${i + 1}`).text(":  " + musicData[i].name);
      $(`#artistLink${i + 1}`).html(
        `<a href = "${musicData[i].url}">:  Artist Radio Link</a>`
      );
    }
    console.log(musicData);
  }

  function buildMovies(movieData) {
    console.log(dataObj.watch1);
    console.log(movieData);
    if (dataObj.watch1 !== "0") {
      $("#movieGenre").text(" - " + dataObj.watch1);
    }
    for (let i = 0; i < 5; i++) {
      $(`#movie${i + 1}`).text(":  " + movieData[i].movie.title);
      $(`#movieTag${i + 1}`).text(":  " + movieData[i].movie.overview);
      $(`#movieYear${i + 1}`).text(":  " + movieData[i].movie.year);
      $(`#movieRating${i + 1}`).text(
        ":  " + movieData[i].movie.rating.toFixed(2)
      );
      $(`#movieTrailer${i + 1}`).html(
        `<a href = "${movieData[i].movie.trailer}">:  Movie Trailer Link</a>`
      );
    }
  }

  function buildShows(showData) {
    console.log(showData);
    if (dataObj.watch1 !== "0") {
      $("#showGenre").text(" - " + dataObj.watch1);
    }
    for (let i = 0; i < 5; i++) {
      $(`#show${i + 1}`).text(":  " + showData[i].show.title);
      $(`#showTag${i + 1}`).text(":  " + showData[i].show.overview);
      $(`#showYear${i + 1}`).text(":  " + showData[i].show.year);
      $(`#showRating${i + 1}`).text(":  " + showData[i].show.rating.toFixed(2));
      $(`#showTrailer${i + 1}`).html(
        `<a href = "${showData[i].show.trailer}">:  TV Show Trailer Link</a>`
      );
    }
  }

  function buildGames(gameData) {
    console.log(gameData);
    if (gameGen !== "0") {
      $("#gameGenre")
        .text("Top Game Picks - " + dataObj.play1)
        .css("color", "black");
    } else {
      $("#gameGenre").text("Top Game Picks").css("color", "black");
    }
    for (let i = 0; i < 5; i++) {
      $(`#game${i + 1}`).text(gameData[i].name);
      if(gameData[i].rating) {
      $(`#gameRating${i + 1}`).text(":  " + gameData[i].rating.toFixed(2));
      }
      $(`#gameSummary${i + 1}`).text(":  " + gameData[i].summary);
      $();
    }
  }

  
  $(".carousel").carousel({
    dist: -50,
    shift: 0,
    padding: 20
  });

  $(".sidenav").sidenav();
  $(".collapsible").collapsible();

  let set;
  let mySet;
  let myID;

  $.get("/api/users", function(data) {
    console.log(data);
  }).then(data => {
    set = data;
  });
  $.get("/api/user_data", function(data) {
    console.log(data);
  }).then(data => {
    myID = data;
  });
  setTimeout(function() {
    $.get(`/api/mydata/${myID.id}`, function(data) {
      console.log(data);
    }).then(data => {
      mySet = data;
    });
  }, 150);

  var genGenre = function(navId, title, bool, data) {
    if (bool) {
      $(navId).html(`Favorite ${title} Genre(s):`);
      var newOl = $("<ol>");
      for (i = 0; i < 3; i++) {
        if (data[i]) {
          var newLi = $("<li>").html(data[i]);
          newOl.append(newLi);
        }
      }
      $(navId).append(newOl);
    } else {
      if (title === "Music") {
        $(navId).html("I dont like music.");
      } else if (title === "Movie and Show") {
        $(navId).html("I dont like movies or shows.");
      } else {
        $(navId).html("I dont like playing games.");
      }
    }
  };
  setTimeout(function() {
    genreData = {
      listenBool: mySet.enjoyMusic,
      watchBool: mySet.enjoyMovieTV,
      playBool: mySet.enjoyGame,
      listenGenre: [mySet.listen1, mySet.listen2, mySet.listen3],
      watchGenre: [mySet.watch1, mySet.watch2, mySet.watch3],
      playGenre: [mySet.play1, mySet.play2, mySet.play3]
    };
    $("#caroTitle").html(mySet.userName);
    $("#caroInfo").html(mySet.bio);
    $("#caroImg").attr("src", mySet.avatarImg);
    $("#navPic").attr("src", mySet.avatarImg);
    $("#navName").html(mySet.userName);
    $("#navEmail").html(myID.email);
    genGenre("#navMusic", "Music", genreData.listenBool, genreData.listenGenre);
    genGenre(
      "#navVideo",
      "Movie and Show",
      genreData.watchBool,
      genreData.watchGenre
    );
    genGenre("#navGame", "Video Game", genreData.playBool, genreData.playGenre);
    $("#navInfo").html(mySet.bio);
    for (var i = 0; i < 5; i++) {
      var alias = set[i].userName;
      var profPic = set[i].avatarImg;
      var info = set[i].bio;
      // console.log(alias);
      // console.log(info);
      var carouselDiv = $("<div>").addClass("carousel-item");
      var cardDiv = $("<div>").addClass("card");
      var imgDiv = $("<div>").addClass(
        "card-image waves-effect waves-block waves-light"
      );
      var newImg = $("<img>")
        .addClass("activator")
        .attr("src", profPic);
      imgDiv.append(newImg);
      var contentDiv = $("<div>").addClass("card-content");
      var newSpan = $("<span>")
        .addClass("card-title activator grey-text text-darken-4")
        .html(alias);
      var newI = $("<i>")
        .addClass("material-icons right")
        .html("more_vert");
      var newP = $("<p>");
      // var newLink = $("<a>")
      //   .attr("href", "#")
      //   .html("this is a link");
      newSpan.append(newI);
      // newP.append(newLink);
      contentDiv.append(newSpan, newP);
      var newReveal = $("<div>").addClass("card-reveal");
      var revSpan = $("<span>")
        .addClass("card-title grey-text text-darken-4")
        .html("About Me");
      var revI = $("<i>")
        .addClass("material-icons right")
        .html("close");
      var newText = $("<p>")
        .addClass("cardText")
        .html(info);
      revSpan.append(revI);
      newReveal.append(revSpan, newText);
      cardDiv.append(imgDiv, contentDiv, newReveal);
      carouselDiv.append(cardDiv);
      $(".carousel").append(carouselDiv);
      $(".carousel").removeClass("initialized");
      $(".carousel").carousel();
    }
  }, 300);

  const images = [
    { id: "f0heeiu-Ec0", caption: "Flower #1" },
    { id: "5lRxNLHfZOY", caption: "Flower #2" },
    { id: "aolmXcUxr7Y", caption: "Flower #3" },
    { id: "TORI6YW1fHE", caption: "Flower #4" },
    { id: "7NBO76G5JsE", caption: "Flower #5" }
  ];

  const build = () => {
    const url = "https://source.unsplash.com";
    const [width, height] = [200, 200];
    return images.reduce((html, image) => {
      image.thumb = `${url}/${image.id}/${width}x${height}`;
      image.url = `${url}/${image.id}`;
      return (html +=
        '<a href="#" class="carousel-item">' +
        "<img " +
        `src="${image.thumb}" ` +
        'class="materialboxed" ' +
        `width="${width}" ` +
        `data-caption="${image.caption}" ` +
        "/>" +
        "</a>");
    }, "");
  };

  const carouselOptions = {
    duration: 100,
    dist: -50,
    spacing: 2
  };

  const materialBoxOptions = {
    inDuration: 150,
    outDuration: 150
  };

  jQuery(document).ready(() => {
    jQuery("#the-carousel").html(build());
    jQuery("#the-carousel").carousel(carouselOptions);
    jQuery(".materialboxed").materialbox(materialBoxOptions);

    $(".carousel").carousel({
      dist: 0,
      shift: 0,
      padding: 20
    });
  });
});
