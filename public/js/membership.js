document.addEventListener("DOMContentLoaded", function() {
  var elems = document.querySelectorAll(".slider");
  var instances = M.Slider.init(elems, options);
});

$(document).ready(function() {
  $(".slider").slider();

  $(".carousel.carousel-slider").carousel({
    fullWidth: true,
    indicators: true
  });
  
  for (var i = 0; i < 5; i++) {
    var carouselDiv = $("<div>").addClass("carousel-item");
    var cardDiv = $("<div>").addClass("card");
    var imgDiv = $("<div>").addClass("card-image waves-effect waves-block waves-light");
    var newImg = $("<img>").addClass("activator").attr('src', 'https://images.pexels.com/photos/160699/girl-dandelion-yellow-flowers-160699.jpeg?h=350&auto=compress&cs=tinysrgb');
    imgDiv.append(newImg);
    var contentDiv = $("<div>").addClass("card-content");
    var  newSpan = $("<span>").addClass("card-title activator grey-text text-darken-4").html("INSERT NAME");
    var newI = $("<i>").addClass("material-icons right").html("more_vert");
    var newP = $("<p>");
    var newLink = $("<a>").attr("href", "#").html("this is a link");
    newSpan.append(newI);
    newP.append(newLink);
    contentDiv.append(newSpan, newP);
    var newReveal = $("<div>").addClass("card-reveal");
    var revSpan = $("<span>").addClass("card-title grey-text text-darken-4").html("CARD TITLE");
    var revI = $("<i>").addClass("material-icons right").html("close");
    var newText = $("<p>").html("Here is some more informationabout this product that is only revealed once clicked on");
    revSpan.append(revI);
    newReveal.append(revSpan, newText);
    cardDiv.append(imgDiv, contentDiv, newReveal);
    carouselDiv.append(cardDiv);
    $(".carousel").append(carouselDiv);
  }


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
