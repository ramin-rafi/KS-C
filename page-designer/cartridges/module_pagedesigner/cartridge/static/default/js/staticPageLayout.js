$(document).ready(function () {
    var div = $(".text-block[data-limit='true']");
    var text = '';
    for (var i = 0; i < $(".text-block[data-limit='true']").length; i++) {
        text = text + $(".text-block[data-limit='true']")[i].innerText;
    }

    text += '<a href="javascript:void(0);" class="js-text-toggle">Weniger</a>';

    var lesserT = text.substr(0, 375);
    lesserT += '<a href="javascript:void(0);" class="js-text-toggle">Mehr erfahren</a>';

    var width = $(window).width();
    if (width < 767) {
        div.html('');

        div.append("<div class='js-short-text d-none'>" + lesserT + "</div>");
        div.append("<div class='js-long-text d-none'>" + text + "</div>");

        if ($('.js-short-text').hasClass('d-none')) {
            $('.js-short-text').removeClass('d-none')
        }
    }

    $('.js-text-toggle').on('click', function () {
        if ($('.js-short-text').hasClass('d-none')) {
            $('.js-short-text').removeClass('d-none');

            if (!$('.js-long-text').hasClass('d-none')) {
                $('.js-long-text').addClass('d-none');
            }
        } else if ($('.js-long-text').hasClass('d-none')) {
            $('.js-long-text').removeClass('d-none');

            if (!$('.js-short-text').hasClass('d-none')) {
                $('.js-short-text').addClass('d-none');
            }
        }
    });
/**
 * Sets Data attributes of current element to parent element's class
 */
    function addClassesToParent() {
        if ($('.prassen-card').length > 1) {
            var cardP = $('.prassen-card');

            cardP.each(function(){
                var filters = $(this).data('prassen-filters');
                $(this).parent().addClass(filters);
            })
        }
    }

    /**
     * takes a string and convert it to a string with no language specific special characters
     * @param {string} val string of characters
     * @returns {string} string with no language specific special characters
     */
    function processSpecialChars(val) {
        var charArray = val.split("");
        var chars = [
            "é",
            "è",
            "ê",
            "ä",
            "ü",
            "ö",
            "Ä",
            "Ü",
            "Ö",
            "ç",
            "Ç",
            "ô",
            "È",
            "É",
            "Ê",
            "Ú",
            "Û",
            "²",
        ];
        var vals = [
            "e",
            "e",
            "e",
            "a",
            "u",
            "o",
            "a",
            "u",
            "o",
            "c",
            "c",
            "o",
            "e",
            "e",
            "e",
            "u",
            "u",
            "2",
        ];

        for (var i = 0; i < charArray.length; i++) {
            var index = chars.indexOf(charArray[i]);
            if (index != -1) {
                charArray[i] = vals[index];
            }
        }

        return charArray.join("");
    }

    /**
     * Function to make accordions tile
     */
    function makeBuilderTiles() {
        var accordions = $(".js-accordion-service");
        var accordTextArr = [];

        accordions.each(function () {
            accordTextArr.push($(this).text().trim().toLowerCase());
        });

        //adding nodes to container div
        for (var i = 0; i < accordTextArr.length; i++) {
            $(".js-accordion-nav").append(
                '<li id ="' + processSpecialChars(accordTextArr[i]).replace(/\s+/g, "-").toLowerCase() + '" class="js-nav-item nav-item"><a class="nav-link" href="#' +
                processSpecialChars(accordTextArr[i]).replace(/\s+/g, "-").toLowerCase() + '-service' +
                '" title="' +
                accordTextArr[i] +
                '">' +
                accordTextArr[i] +
                "</a></li>"
            );
        }
    }

    /**
     * Search function Beauty Services Page
     */
    function beautySearch() {
        var input = $(".js-detail-search-input").val().trim().toLowerCase();
        var infoDiv = $(".services-search .js-alert-detail");
        var counter = 0;

        if (input.length > 0) {
            // if (!$("body").hasClass("has-search")){
            //     $("body").addClass("has-search");
            // }
            if (!infoDiv.hasClass("d-none")) {
                infoDiv.addClass("d-none");
            }

            $(".service-card").each(function () {
                var heading = $(this)
                    .find(".service-title")
                    .text()
                    .trim()
                    .toLowerCase();
                var body = $(this).find(".service-detail").text().trim().toLowerCase();

                if (!(heading.includes(input) || body.includes(input))) {
                    if (!$(this).parent().hasClass("d-none")) {
                        $(this).parent().addClass("d-none");
                    }
                } else {
                    if ($(this).parent().hasClass("d-none")) {
                        $(this).parent().removeClass("d-none");
                    }
                    counter++;
                }
            });

            if (counter === 0) {
                if (infoDiv.hasClass("d-none")) {
                    infoDiv.removeClass("d-none");
                    infoDiv.text(
                        $(".services-search .js-alert-detail").attr("data-errorMsg") +
                        " " +
                        "'" +
                        $(".js-detail-search-input").val() +
                        "'"
                    );
                    $(".service-card").each(function () {
                        $(this).parent().removeClass("d-none");
                    });
                }
            } else {
                if (!infoDiv.hasClass("d-none")) {
                    infoDiv.addClass("d-none");
                }
            }
        }
    }

    /**
     * Search function Accordion/Services Page
     */
    function searchAction() {
        var infoDiv = $(".services-search .js-alert");
        var sValue = $(".js-search-input").val();
        if (sValue && sValue.length > 0) {
            sValue = processSpecialChars(sValue);
            sValue = sValue.replace(/\s+/g, "-").toLowerCase();

            if ($('div[id*="' + sValue + '"][id$="-service"]:first').length > 0) {
                var compId =
                    "#" + $('div[id*="' + sValue + '"][id$="-service"]').attr("id");
                $("html, body").animate({
                        scrollTop: $(compId).offset().top,
                    },
                    1000
                );
                setTimeout(function () {
                    if ($(compId + " button").attr("aria-expanded") === "false") {
                        $(compId + " button").click();
                    }
                }, 1000);
                if (!infoDiv.hasClass("d-none")) {
                    infoDiv.addClass("d-none");
                }
            } else {
                if (infoDiv.hasClass("d-none")) {
                    infoDiv.removeClass("d-none");
                }
            }
        }
    }

    /**
     * Function for FAQ's search functionality
     */
    function searchFAQs() {
        var infoDiv = $(".js-faq_search-container .js-alert");
        var sValue = $(".js-faq_search-input").val().trim().toLowerCase();
        if (sValue && sValue.length > 0) {
            if (!infoDiv.hasClass("d-none")) {
                infoDiv.addClass("d-none");
            }
            var faqDivs = $("#js-faq-content-container .js-faq-content");
            var count = 0;

            faqDivs.each(function () {
                if (!$(this).text().toLowerCase().includes(sValue)) {
                    if (!$(this).hasClass("d-none")) {
                        $(this).addClass("d-none");
                    }
                } else {
                    if ($(this).hasClass("d-none")) {
                        $(this).removeClass("d-none");
                    }
                    count++;
                }
            });
                if (count === 0) {
                    if (infoDiv.hasClass("d-none")) {
                      infoDiv.removeClass("d-none");
                      infoDiv.text(
                        $(".js-faq_search-container .js-alert").attr("data-errorMsg") +
                        " " +
                        "'" +
                          $(".js-faq_search-input").val() +
                          "'"
                      );
                      $(".js-faq-content").each(function () {
                        $(this).removeClass("d-none");
                      });
                    }
                  }
                  else {
                    if (!infoDiv.hasClass("d-none")) {
                        infoDiv.addClass("d-none");
                    }
                }
            }else {
            // if (infoDiv.hasClass("d-none")) {
            //     infoDiv.removeClass("d-none");
            // }
        }

    }

    /**
     * Reset Search for beauty page
     */
    function undoSearch() {
        $(".service-card").each(function () {
            if ($(this).parent().hasClass("d-none")) {
                $(this).parent().removeClass("d-none");
            }
        });
    }

    /**
     * Function makes every element of array lowercase and trim()
     * @param {Array} filters String Array
     */
    function generalizeStringArray(filters) {
        if (filters) {
            for (let index = 0; index < filters.length; index++) {
                filters[index] = filters[index].trim();
            }
        }

        return filters ? filters : null;
    }

    /**
     * Reset Search for faqs
     */
    function undoFAQSearch() {
        $("#js-faq-content-container .js-faq-content").each(function () {
            if ($(this).hasClass("d-none")) {
                $(this).removeClass("d-none");
            }
        });
    }

    /**
     * Set Listeners for faq tiles/pills
     */
    function setFAQListeners() {

        $(".js-faq-clear-all").on("click", function (){
            undoFAQSearch();
        });

        $(".js-pills-container .js-faq_pill").on("click", function () {
            var filterVal = $(this).attr("filter-id").trim();

            $("#js-faq-content-container .js-faq-content").each(function () {
                var filters = $(this).attr("data-filters").toString().split(",");

                filters = generalizeStringArray(filters);

                if (filters) {
                    if (jQuery.inArray(filterVal, filters) != -1) {
                        if ($(this).hasClass("d-none")) {
                            $(this).removeClass("d-none");
                        }
                    } else {
                        if (!$(this).hasClass("d-none")) {
                            $(this).addClass("d-none");
                        }
                    }
                }
            });
        });
    }

    makeBuilderTiles();
    setFAQListeners();

    /**
     * Show More Show less text fixation & listeners
     */
    $(".service-card").each(function () {
        var originDiv = $(this).find(".js-service-content");
        var minDiv = $(this).find(".js-service-content-min");
        var maxChars = parseInt(
            originDiv.attr("data-maxchars") ? originDiv.attr("data-maxchars") : 220
        );
        var originalText = originDiv.text();
        var showLess = $(this).find(".js-service-content .js-beauty-show-more");
        var charCount = originalText.length;

        if (charCount > maxChars) {
            if (showLess.hasClass("d-none")) {
                showLess.removeClass("d-none");
            }

            if (!originDiv.hasClass("d-none")) {
                originDiv.addClass("d-none");
            }
            if (minDiv.hasClass("d-none")) {
                minDiv.removeClass("d-none");
            }
        } else {
            if (!minDiv.hasClass("d-none")) {
                minDiv.addClass("d-none");
            }
            if (originDiv.hasClass("d-none")) {
                originDiv.removeClass("d-none");
            }
        }

        $(this)
            .find(".js-beauty-show-more")
            .on("click", function () {
                if ($(this).text().toLowerCase().trim() === "mehr") {
                    if (!minDiv.hasClass("d-none")) {
                        minDiv.addClass("d-none");
                    }
                    if (originDiv.hasClass("d-none")) {
                        originDiv.removeClass("d-none");
                    }
                } else if ($(this).text().toLowerCase().trim() === "weniger") {
                    if (!originDiv.hasClass("d-none")) {
                        originDiv.addClass("d-none");
                    }
                    if (minDiv.hasClass("d-none")) {
                        minDiv.removeClass("d-none");
                    }
                }
            });
    });

    /**
     * Beauty lounges search on button click
     */
    $(".js-detail-search-container .js-btn-search").on("click", function () {
        beautySearch();
    });

    /**
     * Beauty lounges search on enter
     */
    $(".js-detail-search-input").keyup(function (event) {
        if (event.keyCode === 13) {
            beautySearch();
        }

        var input=$(".js-detail-search-input").val();

        if(input.length > 0) {
            if(!$('.input-group-append').hasClass('d-none')) {
                $('.input-group-append').addClass('d-none');
            }
            if($('.close-button').hasClass('d-none')){
                $('.close-button').removeClass('d-none');
            }
        }

        else {
            if($('.input-group-append').hasClass('d-none')) {
                $('.input-group-append').removeClass('d-none');
            }
            if(!$('.close-button').hasClass('d-none')){
                $('.close-button').addClass('d-none');
            }
        }

    });

    $(".close-button").on("click", function () {
        $(".js-detail-search-input").val('');

        if($('.input-group-append').hasClass('d-none')) {
            $('.input-group-append').removeClass('d-none');
        }
        if(!$('.close-button').hasClass('d-none')){
            $('.close-button').addClass('d-none');
        }
    });


    $(".magazine-cta").on("click", function () {

        if($("div.teaser-layout").hasClass("active")) {
            $('.teaser-layout.active .iframe').addClass('d-none');
            $("div.teaser-layout").removeClass("active");
        }

        $(this).closest("div.teaser-layout").addClass("active");

        if($('.teaser-layout.active .iframe').hasClass('d-none')) {
            $('.teaser-layout.active .iframe').removeClass('d-none');
        }

        var magTarget = document.querySelector(".teaser-layout.active .iframe");
        magTarget.scrollIntoView();
    });

    $(".img-cta").on("click", function () {

        if($("div.teaser-layout").hasClass("active")) {
            $('.teaser-layout.active .iframe').addClass('d-none');
            $("div.teaser-layout").removeClass("active");
        }

        $(this).closest("div.teaser-layout").addClass("active");

        if($('.teaser-layout.active .iframe').hasClass('d-none')) {
            $('.teaser-layout.active .iframe').removeClass('d-none');
        }

        var magTarget = document.querySelector(".teaser-layout.active .iframe");
        magTarget.scrollIntoView();
    });

    /**
     * Beauty lounges search on button click
     */
    $(".js-faq_search-container .js-btn-faq_search").on("click", function () {
        searchFAQs();
    });

    /**
     * Beauty lounges search on enter
     */
    $(".js-faq_search-input").keyup(function (event) {
        if (event.keyCode === 13) {
            searchFAQs();
        }
        var input=$(".js-faq_search-input").val();

        if(input.length > 0) {
            if(!$('.input-group-append').hasClass('d-none')) {
                $('.input-group-append').addClass('d-none');
            }
            if($('.close-button').hasClass('d-none')){
                $('.close-button').removeClass('d-none');
            }
        }

        else {
            if($('.input-group-append').hasClass('d-none')) {
                $('.input-group-append').removeClass('d-none');
            }
            if(!$('.close-button').hasClass('d-none')){
                $('.close-button').addClass('d-none');
            }
        }
    });

    $(".close-button").on("click", function () {
        $(".js-faq_search-input").val('');

        if($('.input-group-append').hasClass('d-none')) {
            $('.input-group-append').removeClass('d-none');
        }
        if(!$('.close-button').hasClass('d-none')){
            $('.close-button').addClass('d-none');
        }
    });

    /**
     * Beauty lounges search input functionality
     */
    $(".js-detail-search-input").on("input", function () {
        if ($(this).val().toString().length === 0) {
            var infoDiv = $(".services-search .js-alert-detail");
            undoSearch();
            // if ($("body").hasClass("has-search")) {
            //     $("body").removeClass("has-search");
            // }
            if (!infoDiv.hasClass("d-none")) {
                infoDiv.addClass("d-none");
            }
        }
    });

    /**
     * FAQs search input functionality
     */
    $(".js-faq_search-input").on("input", function () {
        if ($(this).val().toString().length === 0) {
            var infoDiv = $(".js-faq_search-container .js-alert");
            undoFAQSearch();

            if (!infoDiv.hasClass("d-none")) {
                infoDiv.addClass("d-none");
            }
        }
    });



    /**
     * Beauty Lounges Button functionality
     */
    $(".js-meet-event").on("click", function () {
        $(".SBW-button").click();
    });

    $(".js-btn-cross .icon-cross").on("click", function () {
        var infoDiv = $(".services-search .js-alert-detail");

        $(".js-detail-search-input").val("");
        undoSearch();

        // if ($("body").hasClass("has-search")) {
        //     $("body").removeClass("has-search");
        // }
        if (!infoDiv.hasClass("d-none")) {
            infoDiv.addClass("d-none");
        }
    });

    $(".js-nav-item").on("click", function () {
        var val = $(this).text().trim();
        val = processSpecialChars(val);
        val = val.replace(/\s+/g, "-").toLowerCase();
        val = "#" + val + "-service";

        // changed this to const variable and non object var
        var horizontalNav = $('.horizonral-nav');
        var topOffset = horizontalNav.outerHeight() * 1.3;

        if($(val).length > 0) {
            $("html, body").animate({
                    scrollTop: $(val).offset().top - topOffset,
                },
                500
            );
        }

        setTimeout(function () {
            if ($(val + " button").attr("aria-expanded") === "false") {
                $(val + " button").click();
            }
        }, 500);
    });

    // List Toggle Show More/Less
    $(".list-toggle .btn").on("click", function () {
        var listToggle = $(".list-toggle");
        var btnToggle = $(".list-toggle .btn");
        if (!listToggle.hasClass("expand")) {
            listToggle.addClass("expand");
            btnToggle.text("Weniger");
        } else {
            listToggle.removeClass("expand");
            btnToggle.text("Mehr");
        }
    });

    // To Make Click & Meet CTA Fixed at Bottom
    if ($(".js-meet-event").length) {
        $(window).scroll(function (event) {
            var scroll = $(window).scrollTop();
            if (scroll > 500) {
                $(".js-meet-event").addClass("animate");
            } else {
                $(".js-meet-event").removeClass("animate");
            }
        });
    }

    // Go To Top/Back Scroll Button
    if ($(".btn-goTop").length) {
        var btn = $(".btn-goTop");
        $(window).scroll(function () {
            if ($(window).scrollTop() > 500) {
                btn.addClass("show");
            } else {
                btn.removeClass("show");
            }
        });

        btn.on("click", function (e) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, "300");
        });
    }

    // To Make Horizontal Nav Sticy at Top
    if ($(".horizonral-nav").length) {
        var navpos = $(".horizonral-nav").offset();

        $(window).bind("scroll", function () {
            if ($(window).scrollTop() > navpos.top) {
                $(".horizonral-nav").addClass("fixed");

                if ($(window).scrollTop() >= navpos.top + 150) {
                    $(".horizonral-nav").addClass("animate");
                }
            } else {
                $(".horizonral-nav").removeClass("fixed");
                $(".horizonral-nav").removeClass("animate");
            }
        });
    }

    // Sly Slider For Horizontal Nav
    var slyHorizontal= null;
    if($(".horizonral-nav").length > 0) {
        (function() {
                slyHorizontal = new Sly($(".horizonral-nav"), {
                activateMiddle: true,
                horizontal: 1,
                itemNav: "basic",
                // itemNav: "center",
                // itemNav: "forceCentered",
                smart: 1,
                activateOn: "click",
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                // scrollBar: $wrap.find('.scrollbar'),
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: "easeOutExpo",
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
            });
            slyHorizontal.init();
        }());

        // Open and Scroll Via URL Clicked
        var hNavLink = $('.horizonral-nav .nav-link');
        if (hNavLink.length > 0) {
            var navUrl = document.location.toString();
            // console.log(navUrl + "URL");

            if ( navUrl.match('#') ) {
                var urlHash = $(navUrl.split('#'));
                var urlHashKey = '#' + urlHash[1];
                // console.log($('a[href="'+urlHashKey+'"]'));
                $('a[href="'+urlHashKey+'"]')[0].click();

                setTimeout(
                    function() {
                        $('a[href="'+urlHashKey+'"]')[0].click();
                    },
                    600
                );
            }
        }
    }

    // Sly Slider For Slick Nav GoTo - Department
    if($("#slick-dis").length > 0) {
        (function() {
            var slyDis = new Sly($("#slick-dis"), {
                activateMiddle: true,
                horizontal: 1,
                itemNav: "basic",
                smart: 1,
                activateOn: "click",
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: "easeOutExpo",
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
            });
            slyDis.init();

        }());
    }

    // Sly Slider For Slick Nav GoTo - Head Office
    if($("#slick-ho").length > 0) {
        (function() {
            var slyHo = new Sly($("#slick-ho"), {
                activateMiddle: true,
                horizontal: 1,
                itemNav: "basic",
                smart: 1,
                activateOn: "click",
                mouseDragging: 1,
                touchDragging: 1,
                releaseSwing: 1,
                startAt: 0,
                scrollBy: 1,
                speed: 300,
                elasticBounds: 1,
                easing: "easeOutExpo",
                dragHandle: 1,
                dynamicHandle: 1,
                clickBar: 1,
            });
            slyHo.init();
        }());
    }

    // Custom SpyScroll Funtion for Sticky Horizontal Nav
    if ($(".horizonral-nav").length > 0) {
        // Sly Spy Scrolling
        function moveToPos(id) {
            if(slyHorizontal) {
                var pos = slyHorizontal.getPos($('#' + id));
                slyHorizontal.slideTo(pos.center, true);
            }
        }

        // Functions
        function getSections($links) {
            return $(
                $links
                .map((i, el) => $(el).attr('href'))
                .toArray()
                .filter(href => href.charAt(0) === '#')
                .join(','),
            );
        }

        function activateLink($sections, $links) {
            const yPosition = $window.scrollTop();

            for (let i = $sections.length - 1; i >= 0; i -= 1) {
                const $section = $sections.eq(i);

                if (yPosition >= $section.offset().top - 2) {

                    moveToPos($links.filter(`[href="#${$section.attr('id')}"]`).parent().attr('id'));

                    return $links
                        .removeClass('focus')
                        .filter(`[href="#${$section.attr('id')}"]`)
                        .addClass('focus');
                }
            }
        }

        function onScrollHandler() {
            activateLink($sections, $links);
        }

        function onClickHandler(e) {
            const href = $.attr(e.target, 'href');

            e.preventDefault();
            $root.animate({
                    scrollTop: $(href).offset().top - 90
                },
                500
            );

            setTimeout(function () {
                if ($(href + " button").attr("aria-expanded") === "false") {
                    $(href + " button").click();
                }
            }, 1000);

            return false;
        }

        // Variables
        const $window = $(window);
        const $links = $('.horizonral-nav ul.nav a');
        const $sections = getSections($links);
        const $root = $('html, body');
        const $hashLinks = $('a[href^="#"]:not([href="#"])');

        // Events
        $window.on('scroll', onScrollHandler);
        // $hashLinks.on('click', onClickHandler);

        // Body
        activateLink($sections, $links);
    }

// external js: isotope.pkgd.js

// store filter for each group
var buttonFilters = {};
var buttonFilter;
// quick search regex
var qsRegex;

var $grid = $('.cards-grid').isotope({
    itemSelector: 'div[class*="-prassenCard"]',
    layoutMode: "fitRows",
    fitRows: {
      gutter: 0
    },
    filter: function() {
        var $this = $(this);
        var searchResult = qsRegex ? $this.text().match( qsRegex ) : true;
        var buttonResult = buttonFilter ? $this.is( buttonFilter ) : true;
        return searchResult && buttonResult;
    },
});

$('.filters-lay').on( 'click', '.filter-pill', function() {
  var $this = $(this);
  // get group key
  var $buttonGroup = $this.parents('.filters-grid');
  var filterGroup = $buttonGroup.attr('data-filter-group');
  // set filter for group
  buttonFilters[ filterGroup ] = $this.attr('data-filter');
  // combine filters
  buttonFilter = concatValues( buttonFilters );

  qsRegex = new RegExp( '', 'gi' ); //reset search before filtering
  // Isotope arrange
  $grid.isotope();

  if ($grid.data('isotope').filteredItems.length < 1) {
    $('.filters-lay .js-alert-detail').text($('.filters-lay .js-alert-detail').attr("data-errorMsg") + " '" + $('.is-checked').text() + "'");
    if ($('.filters-lay .js-alert-detail').hasClass('d-none')) {
        $('.filters-lay .js-alert-detail').removeClass('d-none');
    }
  } else if (!$('.filters-lay .js-alert-detail').hasClass('d-none')){
    $('.filters-lay .js-alert-detail').addClass('d-none');
  }
});

function isotopeSearch() {
        $('.js-isotope_all_filter').click();     //reset filter before search
        qsRegex = new RegExp( $('.js-isotope-search-input').val(), 'gi');
    
        $grid.isotope();
        if ($grid.data('isotope').filteredItems.length < 1) {
            $('.filters-lay .js-alert-detail').text($('.filters-lay .js-alert-detail').attr("data-errorMsg") + " '" + $('.js-isotope-search-input').val() + "'");
            if ($('.filters-lay .js-alert-detail').hasClass('d-none')) {
                $('.filters-lay .js-alert-detail').removeClass('d-none');
            }
        } else if (!$('.filters-lay .js-alert-detail').hasClass('d-none')){
            $('.filters-lay .js-alert-detail').addClass('d-none');
        }
}

// use value of search field to filter
$('.js-isotope-btn-search').on('click', function () {
    debounce(isotopeSearch());
});

$('.js-isotope-search-input').on('keyup', function (e) {
   if ($(this).val().length < 1) {
        qsRegex = new RegExp( '', 'gi' );
        $('.js-isotope_all_filter').click();
        if (!$('.filters-lay .js-alert-detail').hasClass('d-none')){
            $('.filters-lay .js-alert-detail').addClass('d-none');
        }
    }
    if (e.keyCode == 13) {
        isotopeSearch();
    }

    var input=$(".js-isotope-search-input").val();

    if(input.length > 0) {
        if(!$('.input-group-append').hasClass('d-none')) {
            $('.input-group-append').addClass('d-none');
        }
        if($('.close-button').hasClass('d-none')){
            $('.close-button').removeClass('d-none');
        }
    }

    else {
        if($('.input-group-append').hasClass('d-none')) {
            $('.input-group-append').removeClass('d-none');
        }
        if(!$('.close-button').hasClass('d-none')){
            $('.close-button').addClass('d-none');
        }
    }
    
});

$(".close-button").on("click", function () {
    $(".js-isotope-search-input").val('');

    if($('.input-group-append').hasClass('d-none')) {
        $('.input-group-append').removeClass('d-none');
    }
    if(!$('.close-button').hasClass('d-none')){
        $('.close-button').addClass('d-none');
    }
});

// change is-checked class on buttons
$('.filters-grid').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});

// flatten object by concatting values
function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

// debounce so filtering doesn't happen every millisecond
function debounce( fn, threshold ) {
  var timeout;
  threshold = threshold || 100;
  return function debounced() {
    clearTimeout( timeout );
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply( _this, args );
    }
    timeout = setTimeout( delayed, threshold );
  };
}
addClassesToParent();

});
