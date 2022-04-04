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
    breakpoint: 1024,
    settings: {
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
  }]
});

$(document).ready(function () {
  if ($('.banner-slider .slick-active .caption').hasClass('white')) {
      $('.banner-slider').addClass('white-caption');
  } else {
      $('.banner-slider').removeClass('white-caption');
  }
  $('.slick-dots li').on('click', function () {
      var vidID = $(this).find('button').attr('id');
      $('iframe').map(function () {
          if (
              vidID &&
              vidID ===
                  $(this)
                      .parents('.slick-slide:not(".slick-cloned")')
                      .attr('aria-describedby')
          ) {
              return false;
          } else { // eslint-disable-line no-else-return
              $f(this).api('pause');
              return true;
          }
      });
  });

  $('.slick-arrow').on('click', function (e) {
      $('iframe').map(function () {
          $f(this).api('pause');
          return true;
      });
      e.preventDefault();
  });

  if (('#banVideo').length > 0) {
      var video1 = $('#banVideo');
      video1.currentTime = 0;

      $('.mute-bt').click(function () {
          $('.unmute-bt').show();
          $('.mute-bt').hide();
          $('#banVideo').prop('muted', false);
      });

      $('.unmute-bt').click(function () {
          $('.mute-bt').show();
          $('.unmute-bt').hide();
          $('#banVideo').prop('muted', true);
      });

      $('.pause-bt').click(function () {
          $('.play-bt').show();
          $('.pause-bt').hide();
          $('.pause-bt').addClass('active');
          var banVideo = document.getElementById('banVideo');
          banVideo.pause();
      });

      $('.play-bt').click(function () {
          $('.play-bt').hide();
          $('.pause-bt').show();
          var banVideo = document.getElementById('banVideo');
          banVideo.play();
      });

      $('.editorial-teaser-slide').on('afterChange', function () {
          if ($('.slick-current .slide-item video').hasClass('bs-video')) {
              $('.slick-current video')[0].play();
          }
      });

      $('.editorial-teaser-slide').on('beforeChange', function () {
          if ($('.slide-item video').hasClass('bs-video')) {
              $('video')[0].pause();
          }
      });
  }
});