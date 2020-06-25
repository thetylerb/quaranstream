$(document).ready(function () {
  $("select").formSelect();
  $(".materialboxed").materialbox();
  $(".slider").slider();
  $(".sidenav").sidenav();
  var currentWatch = 1;
  var currentGame = 1;
  var currentMusic = 1;
  getData();

  function buildMusic(musicData, mySet) {
    if (musicGenre === "0") {
      musicGenre = "Most Popular";
    }
    console.log(mySet);
    if (mySet.listen1 !== "0") {
      $("#musicGenre")
        .html(` -  ${musicGenre} <i id= "musicIcon" class="material-icons">
      arrow_forward
      </i><span id="musicNumber"> [${currentMusic}]</span> `);
    }
    for (let i = 0; i < 5; i++) {
      $(`#artist${i + 1}`).text(musicData[i].name);
      $(`#artistLink${i + 1}`).html(`<span>Link: </span>
        <a href = "${musicData[i].url}">Artist Radio</a>`);
      $(`#artistExtra${i + 1}`).html("<p></p>");
      $(`#artistExtra${i + 1}`).hide();
      $.post("/api/music_solo", {
        artist: musicData[i].name,
      })
        .then(function (data) {
          // console.log(data);
          var closeIcon = `<i class="material-icons" id="gameClose">
          remove_circle
          </i>`;
          $(`#artistExtra${i + 1}`).html(`${closeIcon}<br>
          <p class = "biog">${data.bio.content}</p><br>
          <p><u>Similar Artists: </p></u>
          <p>${data.similar.artist[0].name}   \u00A0\u00A0\u00A0\u00A0<a href = "${data.similar.artist[0].url}">Artist Radio</a></p>
          <p>${data.similar.artist[1].name}   \u00A0\u00A0\u00A0\u00A0<a href = "${data.similar.artist[1].url}">Artist Radio</a></p>
          <p>${data.similar.artist[2].name}   \u00A0\u00A0\u00A0\u00A0<a href = "${data.similar.artist[2].url}">Artist Radio</a></p>
          <p>${data.similar.artist[3].name}   \u00A0\u00A0\u00A0\u00A0<a href = "${data.similar.artist[3].url}">Artist Radio</a></p>
          <p>${data.similar.artist[4].name}   \u00A0\u00A0\u00A0\u00A0<a href = "${data.similar.artist[4].url}">Artist Radio</a></p>`);
        })
        .catch(function (error) {
          console.log(error);
        });

      $(document).on("click", `#artist${i + 1}Add`, function () {
        $(`#artistExtra${i + 1}`).show("slow");
        $(`#artist${i + 1}Add`).hide("slow");
        $(document).on("click", "#gameClose", function () {
          $(`#artistExtra${i + 1}`).hide("slow");
          $(`#artist${i + 1}Add`).show("slow");
        });
      });
    }
  }

  function buildMovies(movieData, mySet) {
    // console.log(movieData);
    if (watchGenre === "0") {
      watchGenre = "Most Popular";
    }
    if (mySet.watch1 !== "0") {
      $("#movieGenre")
        .html(` -  ${watchGenre} <i id = "watchIcon" class="material-icons">
      arrow_forward
      </i> <span id="movieNumber"> [${currentWatch}]</span>`);
    }
    for (let i = 0; i < 5; i++) {
      $(`#movie${i + 1}`).text(
        movieData[i].movie.title + "  (" + movieData[i].movie.year + ")"
      );
      $(`#movieRating${i + 1}`).html(
        `Rating:   ${movieData[i].movie.rating.toFixed(2)}`
      );

      if (movieData[i].movie.trailer) {
        const trailer = movieData[i].movie.trailer.split("=");
        var trailerEmbed = `<iframe width="100%" height="360px" src="https://www.youtube.com/embed/${trailer[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        var trailerEmbed = "";
      }
      var closeIcon = `<i class="material-icons" id="gameClose">
      remove_circle
      </i>`;
      $(`#movieExtra${i + 1}`).html(`${closeIcon}
      <p class = "biog">${movieData[i].movie.overview}</p>
      <p>Certification: ${movieData[i].movie.certification}</p>
      <p>Runtime: ${movieData[i].movie.runtime} Minutes</p>
     ${trailerEmbed}`);

      $(`#movieExtra${i + 1}`).hide();
      $(document).on("click", `#movie${i + 1}Add`, function () {
        $(`#movieExtra${i + 1}`).show("slow");
        $(`#movie${i + 1}Add`).hide("slow");
        $(document).on("click", "#gameClose", function () {
          $(`#movieExtra${i + 1}`).hide("slow");
          $(`#movie${i + 1}Add`).show("slow");
        });
      });
    }
  }

  function buildShows(showData, mySet) {
    if (watchGenre === "0") {
      watchGenre = "Most Popular";
    }
    // console.log(showData);
    if (mySet.watch1 !== "0") {
      $("#showGenre")
        .html(` -  ${watchGenre} <i  id="watchIcon" class="material-icons">
      arrow_forward
      </i> <span id="showNumber"> [${currentWatch}]</span>`);
    }
    for (let i = 0; i < 5; i++) {
      $(`#show${i + 1}`).text(
        showData[i].show.title + "  (" + showData[i].show.year + ")"
      );

      $(`#showRating${i + 1}`).html(
        `Rating:   ${showData[i].show.rating.toFixed(2)}`
      );

      $(`#showExtra${i + 1}`).html("<p></p>");
      if (showData[i].show.trailer) {
        const trailer = showData[i].show.trailer.split("=");
        var trailerEmbed = `<iframe width="100%" height="360px" src="https://www.youtube.com/embed/${trailer[1]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        var trailerEmbed = "";
      }
      var closeIcon = `<i class="material-icons" id="gameClose">
      remove_circle
      </i>`;

      $(`#showExtra${i + 1}`)
        .html(`${closeIcon}<p class = "biog">${showData[i].show.overview}</p>
      <p>Network: ${showData[i].show.network}</p>
      <p>Certification: ${showData[i].show.certification}</p>
      <p>Runtime: ${showData[i].show.runtime} Minutes</p>
     ${trailerEmbed}`);
      $(`#showExtra${i + 1}`).hide();
      $(document).on("click", `#show${i + 1}Add`, function () {
        $(`#showExtra${i + 1}`).show("slow");
        $(`#show${i + 1}Add`).hide("slow");
        $(document).on("click", "#gameClose", function () {
          $(`#showExtra${i + 1}`).hide("slow");
          $(`#show${i + 1}Add`).show("slow");
        });
      });
    }
  }

  function buildGames(gameData, mySet) {
    console.log(mySet);
    console.log(gameData);
    if (gameGenre === "0") {
      gameGenre = "Most Popular";
    } else if (currentGame === 1) {
      gameGenre = mySet.play1;
    } else if (currentGame === 2) {
      gameGenre = mySet.play2;
    } else if (currentGame === 3) {
      gameGenre = mySet.play3;
    }
    if (mySet.play1 !== "0") {
      $("#gameGenre")
        .html(
          `Top Game Picks -  ${gameGenre}<i id="gameIcon" class="material-icons secondary">
          arrow_forward
          </i> <span id="gameNumber"> [${currentGame}]</span>`
        )
        .css("color", "white");
    } else {
      $("#gameGenre").text("Top Game Picks").css("color", "white");
    }

    for (let i = 0; i < 5; i++) {
      $(`#game${i + 1}`).html(gameData[i].name);

      $(`#gameURL${i + 1}`).html(
        `<span>Link: </span><a href = "${gameData[i].url}">Game Info</a>`
      );
      $(`#gameExtra${i + 1}`).html("<p></p>");
      $(`#gameExtra${i + 1}`).hide();

      $.post("/api/game_solo", {
        gameId: gameData[i].id,
      })
        .then(function (data) {
          console.log(data);
          if (data[0].rating) {
            var gameRating = `<p>Rating:  ${data[0].rating.toFixed(2)}</p>`;
          } else {
            var gameRating = "";
          }
          if (data[0].screenshots) {
            var screenshot = ` <p>Screenshot:</p><img src = "https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${data[0].screenshots[0].image_id}.jpg" width = "100%"></img>`;
          } else {
            screenshot = "";
          }
          var closeIcon = `<i class="material-icons" id="gameClose">
          remove_circle
          </i>`;
          $(
            `#gameExtra${i + 1}`
          ).html(`${closeIcon} <br><p class = "biog">${data[0].summary}</p>
          ${gameRating}
         ${screenshot}
         `);
        })
        .catch(function (error) {
          console.log(error);
        });
      $(`#game${i + 1}Add i`).click(function () {
        console.log(i + "clicked");
        $(`#game${i + 1}Add i`).hide("slow");
        $(`#gameExtra${i + 1}`).show("slow");
        $(document).on("click", "#gameClose", function () {
          $(`#gameExtra${i + 1}`).hide("slow");
          $(`#game${i + 1}Add i`).show("slow");
        });
      });
    }
  }

  $(".carousel").carousel({
    dist: -50,
    shift: 0,
    padding: 20,
  });

  $(".sidenav").sidenav();
  $(".collapsible").collapsible();

  let set;
  // let mySet;
  let myID;

  function getData() {
    $.get("/api/users", function () {
      // console.log(data);
    }).then((data) => {
      set = data;
    });
    $.get("/api/user_data", function () {
      // console.log(data);
    }).then((data) => {
      myID = data;
      $.get(`/api/mydata/${myID.id}`, function () {
        // console.log(data);
      }).then((data) => {
        mySet = data;
        buildSuggestions(mySet);
        genreData = {
          listenBool: mySet.enjoyMusic,
          watchBool: mySet.enjoyMovieTV,
          playBool: mySet.enjoyGame,
          listenGenre: [mySet.listen1, mySet.listen2, mySet.listen3],
          watchGenre: [mySet.watch1, mySet.watch2, mySet.watch3],
          playGenre: [mySet.play1, mySet.play2, mySet.play3],
        };
        $("#caroTitle").html(mySet.userName);
        $("#caroInfo").html(mySet.bio);
        $("#caroImg").attr("src", mySet.avatarImg);
        $("#navPic").attr("src", mySet.avatarImg);
        $("#navName").html(mySet.userName);
        $("#navEmail").html(myID.email);
        genGenre(
          "#navMusic",
          "Music",
          genreData.listenBool,
          genreData.listenGenre
        );
        genGenre(
          "#navVideo",
          "Movie and Show",
          genreData.watchBool,
          genreData.watchGenre
        );
        genGenre(
          "#navGame",
          "Video Game",
          genreData.playBool,
          genreData.playGenre
        );
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
          var newImg = $("<img>").addClass("activator").attr("src", profPic);
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
          var revI = $("<i>").addClass("material-icons right").html("close");
          var newText = $("<p>").addClass("cardText").html(info);
          var list = $("<ul>").addClass("genreInfo");
          genOthersGenre(set[i].enjoyMusic, set[i].listen1, "Music", list);
          genOthersGenre(
            set[i].enjoyMovieTV,
            set[i].watch1,
            "Movie and Show",
            list
          );
          genOthersGenre(set[i].enjoyGame, set[i].play1, "Game", list);
          revSpan.append(revI);
          newReveal.append(revSpan, newText, list);
          cardDiv.append(imgDiv, contentDiv, newReveal);
          carouselDiv.append(cardDiv);
          $(".carousel").append(carouselDiv);
          $(".carousel").removeClass("initialized");
          $(".carousel").carousel();
        }
      });
    });

    var buildSuggestions = function (mySet) {
      //game Api call
      switch (currentGame) {
        case 1:
          gameGenre = mySet.play1ID;
          break;
        case 2:
          gameGenre = mySet.play2ID;
          break;
        case 3:
          gameGenre = mySet.play3ID;
          break;
      }
      switch (currentMusic) {
        case 1:
          musicGenre = mySet.listen1;
          break;
        case 2:
          musicGenre = mySet.listen2;
          break;
        case 3:
          musicGenre = mySet.listen3;
          break;
      }
      switch (currentWatch) {
        case 1:
          watchGenre = mySet.watch1;
          break;
        case 2:
          watchGenre = mySet.watch2;
          break;
        case 3:
          watchGenre = mySet.watch3;
          break;
      }

      $.post("/api/game_genres", {
        platformId: mySet.platformID,
        genreId: gameGenre,
      })
        .then(function (data) {
          // console.log(data);
          buildGames(data, mySet);
        })
        .catch(function (error) {
          console.log(error);
        });

      //movie Api call
      $.post("/api/movie_genres", {
        videoGenre: watchGenre,
      })
        .then(function (data) {
          // console.log(data);
          buildMovies(data, mySet);
        })
        .catch(function (error) {
          console.log(error);
        });

      //TV Api call
      $.post("/api/show_genres", {
        videoGenre: watchGenre,
      })
        .then(function (data) {
          // console.log(data);
          buildShows(data, mySet);
        })
        .catch(function (error) {
          console.log(error);
        });

      //music genre Api call
      $.post("/api/music_genres", {
        musicGenre: musicGenre,
      })
        .then(function (data) {
          // console.log(data);
          buildMusic(data, mySet);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    var genGenre = function (navId, title, bool, data) {
      if (bool) {
        $(navId).html(`Favorite ${title} Genre(s):`);
        var newOl = $("<ol>");
        for (i = 0; i < 3; i++) {
          if (data[i] !== "0") {
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

    var genOthersGenre = function (bool, data, title, list) {
      newLi = $("<li>");
      if (bool && data !== "0") {
        newLi.html(`Fav ${title} Genre: ${data}`);
        // console.log(`Fav ${title} Genre: ${data}`);
      } else {
        // console.log(`no ${title}`);
        if (title === "Music") {
          newLi.html("I dont like music.");
        } else if (title === "Movie and Show") {
          newLi.html("I dont like movies or shows.");
        } else {
          newLi.html("I dont like playing games.");
        }
      }
      list.append(newLi);
    };
  }
  // setTimeout(function() {}, 300);

  const images = [
    { id: "f0heeiu-Ec0", caption: "Flower #1" },
    { id: "5lRxNLHfZOY", caption: "Flower #2" },
    { id: "aolmXcUxr7Y", caption: "Flower #3" },
    { id: "TORI6YW1fHE", caption: "Flower #4" },
    { id: "7NBO76G5JsE", caption: "Flower #5" },
  ];

  const build = () => {
    const url = "https://source.unsplash.com";
    const [width, height] = [200, 200];
    return images.reduce((html, image) => {
      image.thumb = `${url}/${image.id}/${width}x${height}`;
      image.url = `${url}/${image.id}`;
      return (html +=
        "<a href='#' class='carousel-item'>" +
        "<img " +
        `src="${image.thumb}" ` +
        "class= 'materialboxed'" +
        `width="${width}" ` +
        `data-caption="${image.caption}" ` +
        "/>" +
        "</a>");
    }, "");
  };

  const carouselOptions = {
    duration: 100,
    dist: -50,
    spacing: 2,
  };

  const materialBoxOptions = {
    inDuration: 150,
    outDuration: 150,
  };

  jQuery(document).ready(() => {
    jQuery("#the-carousel").html(build());
    jQuery("#the-carousel").carousel(carouselOptions);
    jQuery(".materialboxed").materialbox(materialBoxOptions);

    $(".carousel").carousel({
      dist: 0,
      shift: 0,
      padding: 20,
    });
    $(document).on("click", "#gameIcon", function () {
      if (currentGame === 3) {
        currentGame = 1;
      } else {
        currentGame++;
      }
      console.log(currentGame);
      $("#gameSection").clear;
      getData();
    });
    $(document).on("click", "#musicIcon", function () {
      if (currentMusic === 3) {
        currentMusic = 1;
      } else {
        currentMusic++;
      }
      console.log(currentMusic);
      $("#musicSection").clear;
      getData();
    });
    $(document).on("click", "#watchIcon", function () {
      if (currentWatch === 3) {
        currentWatch = 1;
      } else {
        currentWatch++;
      }
      console.log(currentWatch);
      $("#showSection").clear;
      $("#movieSection").clear;
      getData();
    });
  });
});
