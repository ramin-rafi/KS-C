"use strict";
window.jQuery = window.$ = require('jquery');
// var element = document.getElementByClass("teaser-text");
// element.scrollIntoView(
// 	$(".card-text").removeClass("animate")
// );

// $(window).scroll(function (event) {
// 	$(".card-text").addClass("animate");
// });

// $(window).scroll(function() {
//     $(this).find(".card-text").addClass("animate");
// }); //missing );

function isScrolledIntoView(elem) {
   var docViewTop = $(window).scrollTop();
   var docViewBottom = docViewTop + $(window).height();

   var elemTop = $(elem).offset().top;
   var elemBottom = elemTop + $(elem).height();

   return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

$(window).on('scroll', function() {
   $(".teaser-text").each(function() {
     if (isScrolledIntoView($(this))) {
       $(this).find(".card-text").addClass("animate");
     }
     else {
      $(this).find(".card-text").removeClass("animate");
     }
   });
 });

// $(".graph").each(function() {
//    if (isScrolledIntoView($(this))) {
//      $(this).find(".graph-line").addClass("graph-75");
//      $(this).find(".graph-line-2").addClass("opacity");
//    }
//  });

// $(window).scroll(function(){
//     if ($(this).scrollTop() > 120) {
//        $('.card-text').addClass('animate');
//     } else {
//        $('.card-text').removeClass('animate');
//     }
// });