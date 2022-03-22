'use strict';

/**
 * returns the url search parameters
 * @returns {Object} - url search parameters
 */
function urlParams() {
    var urlParamsObject;
    var match;
    var pl = /\+/g;  // Regex for replacing addition symbol with a space
    var search = /([^&=]+)=?([^&]*)/g;
    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
    var query = window.location.search.substring(1);

    urlParamsObject = {};
    match = search.exec(query);
    while (match) {
        urlParamsObject[decode(match[1])] = decode(match[2]);
        match = search.exec(query);
    }
    return urlParamsObject;
}

/**
 * Creates history for updated url
 * @param {string} category - category name
 */
function updateUrl(category) {
    var queryParams = urlParams();
    var url = '';
    if (queryParams.cid) {
        url = '?cid=' + queryParams.cid + '&catname=' + category;
    }
    history.pushState(
        '',
        document.title,
        url
    );
}

/**
 * Filter brands based on selected category
 */
function filter() {
    var selectedCategory = $($('.category-btns').find('.selected')).attr('id');
    $('.brands-set').removeClass('d-none');
    $('.brand-item').addClass('d-none');

    $('.brand-item').each(function (index, item) {
        if (selectedCategory) {
            var itemCategory = $(item).attr('data-category');
            if (itemCategory.toLowerCase().indexOf(selectedCategory.toLowerCase()) > -1) {
                $(item).removeClass('d-none');
            }
        }
    });

    $('.brands-set').addClass('d-none');
    $('.brands-set').each(function (index, item) {
        if ($(item).find('.brand-item').length !== $(item).find('.d-none').length) {
            $(item).removeClass('d-none');
        }
    });
    $('.alphabets li a').removeClass('active');
    $('.brands-set:not(".d-none")').each(function (index, item) {
        $($('.alphabets').find('#' + $(item).find('p').attr('id') + 'ele')).addClass('active');
    });
    var breadcrumb = $('.brand-breadcrumbs').attr('data-brandtext') + '<span class="bread-bar">/</span><span class="cat-breadcrumb">' + $('#' + selectedCategory).html() + '</span>';

    $('.brand-breadcrumbs').html(breadcrumb);
}

/**
 * Bind multiple events
 */
function bindEvents() {
    $(document).on('keyup', '#brandSearch', function () {
        if ($(this).val().length < 3) {
            $('.min-length-error').removeClass('d-none');
            filter('');
        } else {
            $('.min-length-error').addClass('d-none');
            filter($(this).val());
        }
    });
    $(document).on('change', '#brandSearch', function () {
        if ($(this).val().length < 3) {
            $('.min-length-error').removeClass('d-none');
            return;
        }
        if ($(this).val().length >= 3) {
            $('.min-length-error').addClass('d-none');
            return;
        }
    });
    $(document).on('click', '.brand-category', function () {
        $('.brand-category').removeClass('selected');
        $(this).addClass('selected');
        filter('');
        updateUrl($(this).attr('id'));
    });
    var queryParams = urlParams();
    if (queryParams.catname) {
        $('.category-btns').find('#' + queryParams.catname.replace(/'/g, '-').replace(/ /g, '_')).addClass('selected');
        filter('');
    }
}

/**
 * Appends relevant data
 */
function appendData() {
    $('.brand-item .brand-title, .brand-item .btn-close').click(function () {
        var myHeight = $(this).closest('.brand-item').find('.brand-details').outerHeight();
        var item = $(this).closest('.brand-item');
        var isOut;
        item.css({ marginBottom: isOut ? myHeight + 10 + 'px' : '0' });
        $(this).closest('.brand-item').find('.brand-details').toggleClass('active');
        $(this).closest('.brand-item').find('.brand-details').slideToggle();


        var firstSiblings = $(this).closest('.brand-item').siblings();
        firstSiblings.find('.brand-details').removeClass('active');
        firstSiblings.find('.brand-details').slideUp();
        firstSiblings.css({ marginBottom: '0' });

        var secondSiblings = $(this).closest('.brands-section .brands-set').siblings();
        secondSiblings.find('.brand-details').removeClass('active');
        secondSiblings.find('.brand-details').slideUp();
        secondSiblings.find('.brand-item').css({ marginBottom: '0' });
    });
}

/**
 * Handle anchors click event
 */
function smoothAnchors() {
    $('.alphabets a').on('click', function (event) {
        var headeHeight = $('#header').outerHeight();
        var $anchor = $(this);
        $('html, body').animate({
            scrollTop: ($($anchor.attr('href')).offset().top - headeHeight) + 'px'
        }, 1500);
        event.preventDefault();
    });
}

$(document).ready(function () {
    bindEvents();
    appendData();
    smoothAnchors();
});
