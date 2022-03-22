'use strict';
var moment = require('moment-timezone');

/**
 * add product to sfcc cart
 * @param {string} productID - product to add
 */
function liveBuyAddToCart(productID) {
    var url = $('.live-buy').data('add-to-cart-url');
    var quantity = 1;
    var form = {
        pid: productID,
        pidsObj: [],
        childProducts: [],
        quantity: quantity
    };

    $.ajax({
        url: url,
        type: 'post',
        data: form,
        dataType: 'json',
        success: function (data) {
            $('body').trigger('product:afterAddToCart', data);
            $('.minicart').trigger('focusin');
            $('.minicart').trigger('count:update', data);
            $('.minicart .popover').removeClass('show');
            if ($('.cart-cont').length > 0) {
                var actionUrl = $('.cart-cont').data('url');
                $.ajax({
                    url: actionUrl,
                    type: 'get',
                    success: function (response) {
                        $('.cart-cont').html($.parseHTML(response));
                    }
                });
            }
        }
    });
    return;
}

/**
 * remove product from sfcc cart
 * @param {string} productID - product to remove
 */
function liveBuyRemoveFromCart(productID) {
    $('.cart-delete-confirmation-btn[data-pid=' + productID + ']').trigger('click');
    return;
}

/**
 * livebuy callback function
 * @param {Object} data - product to add
 */
function liveBuyCallBackFunction(data) {
    var productID;
    if (data.item) {
        productID = data.item.productNumber;
    }
    if (productID) {
        if (data.action === 'add_product') {
            liveBuyAddToCart(productID);
        } else if (data.action === 'remove_product') {
            liveBuyRemoveFromCart(productID);
        }
    }
    if (data.action === 'init_cart' || data.action === 'checkout_cart') {
        var items = data.cart;
        if (items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i]) {
                    productID = items[i].productNumber;
                    if ($('.cart-delete-confirmation-btn[data-pid=' + productID + ']').length === 0) {
                        liveBuyAddToCart(productID);
                    }
                }
            }
        }
    }
}

module.exports = function () {
    if ($('.live-buy-content .cat-menu-banner').length > 0) {
        var time = $('.live-buy-time:first').text().trim();
        $('.mbl-live-buy-time').text(time);
        var text = $('#livebuy-button-text').text().trim();
        $('.mbl-live-buy-link').text(text);
        var configuredStartDate = $('.live-buy-time').attr('data-start-date');
        var configuredEndDate = $('.live-buy-time').attr('data-end-date');
        if (configuredStartDate && configuredEndDate) {
            var localDate = new Date();
            var localTime = localDate.toISOString();
            var germanTime = moment(localTime).tz('Europe/Berlin');
            var year = parseInt(germanTime.format().split('T')[0].split('-')[0], 10);
            var month = parseInt(germanTime.format().split('T')[0].split('-')[1], 10);
            var dateNumber = parseInt(germanTime.format().split('T')[0].split('-')[2], 10);
            var hour = parseInt(germanTime.format().split('T')[1].split(':')[0], 10);
            var minute = parseInt(germanTime.format().split('T')[1].split(':')[1], 10);

            var startYear = parseInt(configuredStartDate.split('T')[0].split('-')[0], 10);
            var startMonth = parseInt(configuredStartDate.split('T')[0].split('-')[1], 10);
            var startDateNumber = parseInt(configuredStartDate.split('T')[0].split('-')[2], 10);
            var startHour = parseInt(configuredStartDate.split('T')[1].split(':')[0], 10);
            var startMinute = parseInt(configuredStartDate.split('T')[1].split(':')[1], 10);

            var endYear = parseInt(configuredEndDate.split('T')[0].split('-')[0], 10);
            var endMonth = parseInt(configuredEndDate.split('T')[0].split('-')[1], 10);
            var endDateNumber = parseInt(configuredEndDate.split('T')[0].split('-')[2], 10);
            var endHour = parseInt(configuredEndDate.split('T')[1].split(':')[0], 10);
            var endMinute = parseInt(configuredEndDate.split('T')[1].split(':')[1], 10);

            if ((year >= startYear && year <= endYear) && (month >= startMonth && month <= endMonth) && (dateNumber >= startDateNumber && dateNumber <= endDateNumber)) {
                if (hour >= startHour && hour <= endHour) {
                    if ((startHour === endHour && minute >= startMinute && minute < endMinute) || (startHour !== endHour && hour === startHour && minute >= startMinute) || (hour > startHour && hour < endHour) || (startHour !== endHour && hour === endHour && minute < endMinute)) {
                        $('.live-now-state').text($('.live-now-state').attr('data-live-now'));
                        $('.live-now-state').css('color', $('.live-now-state').attr('data-live-now-color'));
                    }
                }
            }
        }
        if ($('.live-buy').hasClass('livebuyExists')) {
            $('.live-buy').removeClass('d-none');
        }
    }

    $('.create-calendar-event').each(function () {
        var title = '';
        if ($('.live-now-state').length > 0) {
            title = $('.live-now-state').attr('data-before-live');
        }
        if ($('.calendar-event-title').length > 0 && $('.calendar-event-title').text().trim().length > 0) {
            title = $('.calendar-event-title').text().trim();
        }
        var details = 'Join the live stream on this link: ' + window.location.href;
        if ($('.calendar-event-description').length > 0 && $('.calendar-event-description').text().trim().length > 0) {
            details = $('.calendar-event-description').text().trim();
        }
        var startDate = $('.live-buy-time').attr('data-start-date') ? $('.live-buy-time').attr('data-start-date').split(/[\s:-]+/).join('') : null;
        var endDate = $('.live-buy-time').attr('data-end-date') ? $('.live-buy-time').attr('data-end-date').split(/[\s:-]+/).join('') : null;
        var icsMSG = 'BEGIN:VCALENDAR'
                    + '\nVERSION:2.0'
                    + '\nPRODID:-//KadeWe Live Shopping Event'
                    + '\nBEGIN:VEVENT'
                    + '\nDTSTART;TZID=Europe/Berlin:' + startDate
                    + '\nDTEND;TZID=Europe/Berlin:' + endDate
                    + '\nSUMMARY:' + title
                    + '\nDESCRIPTION:' + details
                    + '\nEND:VEVENT'
                    + '\nEND:VCALENDAR';
        var data = new File([icsMSG], { type: 'text/plain' });
        var icsFile = window.URL.createObjectURL(data);
        if (startDate && endDate) {
            $(this).attr('href', icsFile);
        }
    });

    $('.gmail-create-event').each(function () {
        var defaultUrl = $(this).attr('data-default-url');
        var title = '';
        if ($('.live-now-state').length > 0) {
            title = $('.live-now-state').attr('data-before-live');
        }
        if ($('.calendar-event-title').length > 0 && $('.calendar-event-title').text().trim().length > 0) {
            title = $('.calendar-event-title').text().trim();
        }
        title = encodeURIComponent(title);
        var details = 'Join the live stream on this link: ' + window.location.href;
        if ($('.calendar-event-description').length > 0 && $('.calendar-event-description').text().trim().length > 0) {
            details = $('.calendar-event-description').text().trim();
        }
        details = encodeURIComponent(details);
        var configuredStartDateTime = $('.live-buy-time').attr('data-start-date') ? $('.live-buy-time').attr('data-start-date').split(/[\s:-]+/).join('') : null;
        var configuredEndDateTime = $('.live-buy-time').attr('data-end-date') ? $('.live-buy-time').attr('data-end-date').split(/[\s:-]+/).join('') : null;
        var dates = configuredStartDateTime + '/' + configuredEndDateTime;
        dates = encodeURIComponent(dates);
        var ctz = 'Europe/Berlin';
        ctz = encodeURIComponent(ctz);
        var hrefLink = defaultUrl + '&text=' + title + '&details=' + details + '&dates=' + dates + '&ctz=' + ctz;
        if (configuredStartDateTime && configuredEndDateTime) {
            $(this).attr('href', hrefLink);
        }
    });

    $('body').on('click', '.livebuy-topbanner-link, .livebuy-placeholder', function () {
        $('.live-buy-trigger').trigger('click');
    });

    $('body').on('click', '.mbl-live-buy-link', function () {
        window.location.href = $(this).attr('data-url');
    });

    $('body').on('click', '.add-to-calendar', function () {
        $(this).text($(this).attr('data-add-to-calendar'));
        $(this).removeClass('event-added');
        if ($('.calender-options').hasClass('d-none')) {
            $('.calender-options').removeClass('d-none');
            $('.calendar-wrapper').addClass('calendar-options-open');
        } else {
            $('.calender-options').addClass('d-none');
            $('.calendar-wrapper').removeClass('calendar-options-open');
        }
    });

    $('body').on('click', '.calendar-event', function () {
        $('.add-to-calendar').text($('.add-to-calendar').attr('data-after-success'));
        $('.add-to-calendar').addClass('event-added');
        $('.calender-options').addClass('d-none');
    });

    // eslint-disable-next-line no-undef
    try {
        // eslint-disable-next-line no-undef
        livebuy.registerCartCallback(liveBuyCallBackFunction);
    } catch (e) {
        // sdk not loaded
    }
};
