var recommendation = require('./recommendation');
var brandShopProductSliderConfig = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    rows: 0,
    infinite: false,
    prevArrow:
        '<span class="slick-prev"><span class="icon-direction-left"></span></span>',
    nextArrow:
        '<span class="slick-next"><span class="icon-direction-right"></span></span>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 767,
            settings: 'unslick'
        }
    ]
};
var spotLightSlider = {
    dots: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    rows: 0,
    infinite: false,
    prevArrow:
        '<span class="slick-prev"><span class="icon-direction-left"></span></span>',
    nextArrow:
        '<span class="slick-next"><span class="icon-direction-right"></span></span>',
    responsive: [
        {
            breakpoint: 767,
            settings: 'unslick'
        }
    ]
};
var productsSliderConfig = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    rows: 0,
    infinite: false,
    prevArrow:
        '<span class="slick-prev"><span class="icon-direction-left"></span></span>',
    nextArrow:
        '<span class="slick-next"><span class="icon-direction-right"></span></span>',
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 767,
            settings: 'unslick'
        }
    ]
};

/**
 * Slides Color
 */
function slideColor() {
    $('.banner-slider').on('afterChange', function () {
        if ($('.banner-slider .slick-active .caption').hasClass('white')) {
            $('.banner-slider').addClass('white-caption');
        } else {
            $('.banner-slider').removeClass('white-caption');
        }
    });
}

slideColor();

$('.banner-slider.dots .teaser-slide, .banner-slider.dots .editorial-teaser-slide').slick({
    dots: true,
    useTransform: false,
    rows: 0,
    arrows: false,
    adaptiveHeight: true
});
$('.banner-slider.arrows .teaser-slide').slick({
    dots: false,
    useTransform: false,
    rows: 0,
    arrows: true,
    adaptiveHeight: true
});

$('.banner-slider.both .teaser-slide').slick({
    dots: true,
    useTransform: false,
    rows: 0,
    arrows: true,
    prevArrow: '.slick-prev',
    nextArrow: '.slick-next',
    adaptiveHeight: true
});

// $('.banner-slider .teaser-slide').slick({
//     dots: true,
//     useTransform: false,
//     rows: 0,
//     arrows: false
// });

$('.editorial-teaser-slide.autoPlay').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow: '<button class="slick-prev" type="button"></button>',
    nextArrow: '<button class="slick-next" type="button"></button>',
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000
});

$('.editorial-teaser-slide').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    prevArrow: '<button class="slick-prev" type="button"></button>',
    nextArrow: '<button class="slick-next" type="button"></button>',
    adaptiveHeight: true
});

$('.banner-slider .small-richmedia-teaser-slide').slick({
    dots: true,
    useTransform: false,
    rows: 0,
    arrows: true
});

$('.banner-slider .gallery-slide').slick({
    dots: true,
    useTransform: false,
    rows: 0,
    arrows: true,
    prevArrow: '.slick-prev',
    nextArrow: '.slick-next'
});

$('.brand-shop-products-slider').slick(brandShopProductSliderConfig);
$('.spotlight-teaser')
    .find('.products-slider')
    .not('.slick-initialized')
    .slick(spotLightSlider);
$('.products-slider').not('.slick-initialized').slick(productsSliderConfig);

recommendation.init(function (recoNode) {
    $('.products-slider', recoNode).slick(productsSliderConfig);
});

$('.top-brands-slider').slick({
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    arrows: true,
    rows: 0,
    infinite: false,
    prevArrow:
        '<span class="slick-prev"><span class="icon-direction-left"></span></span>',
    nextArrow:
        '<span class="slick-next"><span class="icon-direction-right"></span></span>',
    appendArrows: $('.top-brands-holder .slider-nav'),
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 767,
            settings: 'unslick'
        }
    ]
});

$(window).on('resize', function () {
    $('.products-slider').slick('resize');
    $('.top-brands-slider').slick('resize');
});

$(document).ready(function () {
    $('.details-section .btn-more-detail').click(function () {
        $('.all-details').slideToggle();
        $(this).closest('.details-section').toggleClass('expand');
        if ($('.btn-more-detail:first').html() === 'Mehr') {
            $('.less-details').addClass('d-none');
        } else {
            $('.less-details').removeClass('d-none');
        }
        $('.btn-more-detail').html(
            $('.btn-more-detail:first').html() === 'Mehr' ? 'Weniger' : 'Mehr'
        );
    });
    $('.details-section .btn-more').click(function () {
        $('.more-details').slideToggle();
        $(this).closest('.details-section').toggleClass('expand');
        $(this).html($(this).html() === 'Mehr' ? 'Weniger' : 'Mehr');
    });

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

$('.card-slider').slick({
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    rows: 0,
    infinite: false,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

// Career Page Slick Slider Configuration
$(document).ready(function () {
    // 3 Column Slick Slider Config
    var slickOptsCol3 = {
        arrows: false,
        // dots: true,
        focusOnSelect: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        easing: 'swing',
        speed: 700,
        customPaging: function (slick, index) {
            // dots value "true" required
            var cardLabel = slick.$slides.eq(index).find('.card-header h5').text();
            return (
                '<a class="btn btn-link" href="javascript:void(0)" title="' + cardLabel + '">' + cardLabel + '</a>'
            );
        },
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // 4 Column Slick Slider Config
    var slickOptsCol4 = {
        arrows: false,
        // dots: true,
        focusOnSelect: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        easing: 'swing',
        speed: 700,
        customPaging: function (slick, index) {
            // dots value "true" required
            var cardLabel = slick.$slides.eq(index).find('.card-header h5').text();
            return (
                '<a class="btn btn-link" href="javascript:void(0)" title="' + cardLabel + '">' + cardLabel + '</a>'
            );
        },
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    // Init slick carousel
    $(".slick-nav-tabs[data-slide-item='3']").slick(slickOptsCol3);
    $(".slick-nav-tabs[data-slide-item='4']").slick(slickOptsCol4);

    // Slick Slider GoTo
    $(".slick-nav[data-item='3'] .nav-item[data-slide]").click(function (e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $(".slick-nav-tabs[data-slide-item='3']").slick('slickGoTo', slideno - 1);
    });

    $(".slick-nav[data-item='4'] .nav-item[data-slide]").click(function (e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $(".slick-nav-tabs[data-slide-item='4']").slick('slickGoTo', slideno - 1);
    });

    $(document).on('click', '.reopen-consent-modal', function () {
        setTimeout(function () {
            $(function () {
                jcf.replaceAll();
            });
        }, 1000);
    });

    if ($('#consent-tracking').length > 0) {
        setTimeout(function () {
            $(function () {
                jcf.replaceAll();
            });
        }, 1000);
    }
});
