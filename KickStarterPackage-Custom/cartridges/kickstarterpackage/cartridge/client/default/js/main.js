"use strict";
window.jQuery = window.$ = require('jquery');
require('slick-carousel');

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function () {
  $(".teaser-text").each(function () {
    if (isScrolledIntoView($(this))) {
      $(this).find(".card-text").addClass("animate");
    } else {
      $(this).find(".card-text").removeClass("animate");
    }
  });
});

$('.slider').slick({
  prevArrow: false,
  nextArrow: false,
  autoplay: true,
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
});

$('.card-slider').slick({
  centerMode: true,
  slidesToShow: 2,
  slidesToScroll: 2,

  responsive: [{
    breakpoint: 768,
    settings: {
      arrows: false,
      centerMode: true,
      slidesToShow: 1
    }
  }, {
    breakpoint: 480,
    settings: {
      arrows: false,
      centerMode: true,
      slidesToShow: 1
    }
  }]
});
