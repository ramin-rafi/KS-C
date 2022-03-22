'use strict';
var utilHelpers = require('./utilHelpers');

/**
 * Change URL
 * @param {Object} category - category
 */
function modifyUrl(category) {
    var stateObj = {
        id: category
    };
    window.history.pushState(stateObj, category, '/marken/' + category.toLowerCase());
}

/**
 * Get Category ID
 * @param {Object} url - url
 * @returns {string} - last part of the url containing category id
 */
function getCategory(url) {
    var parts = url.split('/');
    var lastPart = parts[parts.length - 1];
    if (lastPart.includes('=')) {
        lastPart = lastPart.split('=')[1];
    }
    return lastPart;
}

/**
 * Updates category cookie according to selected category in brand overview page
 * @param {Object} curCategory - current category
 */
function setNewCategoryCookie(curCategory) {
    if (curCategory && curCategory !== '') {
        var expirationTime = parseInt($('.menu-group').attr('data-category-cookie-expiration-time'), 10);
        var topLevelDomain = $('.logo-home').attr('data-topLevelDomain');
        var sfccTrackingCookie = utilHelpers.getCookie('sfccTracking');
        if (sfccTrackingCookie !== 'false') {
            utilHelpers.deleteCookie('Category');
            utilHelpers.createCookie('Category', curCategory, expirationTime, topLevelDomain);
        }
    }
}

/**
 * Bind click event
 */
function bindEvents() {
    $(document).on('click', '.brand-category', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this).hasClass('selected')) {
            return;
        }
        $('.brand-category').removeClass('selected');
        $(this).addClass('selected');

        $('.categoryCrumbs .secondary').text('/ ' + $(this).attr('data-name'));
        var category = $(this).attr('data-category-id');
        setNewCategoryCookie(category);
        var headerCategory = $('.navbar li.first-level.' + category);
        var url = $(location).attr('href');
        var topCategory = getCategory(url);

        $.spinner().start();
        $.ajax({
            url: $(this).attr('href'),
            method: 'GET',
            success: function (response) {
                if (typeof category !== 'undefined') {
                    modifyUrl(category);
                }

                var prevCategory = $('.navbar li.first-level.' + topCategory);
                if (prevCategory.length === 0) {
                    prevCategory = $('.navbar li.first-level.' + topCategory.substr(0, 1).toUpperCase() + topCategory.substr(1));
                }

                prevCategory.removeClass('cat-preferred');
                var sfccTrackingCookie = utilHelpers.getCookie('sfccTracking');
                if (sfccTrackingCookie !== 'false') {
                    headerCategory.addClass('cat-preferred');
                }

                $('.all-brands').html($.parseHTML(response));
                $.spinner().stop();
            },
            error: function () {
                $.spinner().stop();
            }
        });
    });
}

$(document).ready(function () {
    var url = $(location).attr('href');
    var category = getCategory(url);
    if (typeof category !== 'undefined') {
        modifyUrl(category);
    }

    setNewCategoryCookie(category);
    var prevCategory = $('.navbar li.first-level');
    prevCategory.removeClass('cat-preferred');
    var headerCategory = $('.navbar li.first-level.' + category);
    var sfccTrackingCookie = utilHelpers.getCookie('sfccTracking');
    if (sfccTrackingCookie !== 'false') {
        headerCategory.addClass('cat-preferred');
    }

    bindEvents();
});
