'use strict';

var googleAnalytics = require('./components/googleAnalytics');

/**
 * delete cookie value by cookie name from browser
 * @param {string} cookieName - name of the cookie
 */
function deleteCookie(cookieName) {
    document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/**
 * Get cookie value by cookie name from browser
 * @param {string} cookieName - name of the cookie
 * @returns {string} cookie value of the found cookie name
 */
function getCookie(cookieName) {
    var name = cookieName + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookieItem = cookieArray[i];
        while (cookieItem.charAt(0) === ' ') {
            cookieItem = cookieItem.substring(1);
        }
        if (cookieItem.indexOf(name) === 0) {
            return cookieItem.substring(name.length, cookieItem.length);
        }
    }
    return '';
}

/**
 * Set cookie value by cookie name in browser
 * @param {string} name - name of the cookie
 * @param {string} value - value of the cookie
 * @param {string} days - expiry of cookie in days
 * @param {string} topLevelDomain - TLD
 */
function createCookie(name, value, days, topLevelDomain) {
    var expires;
    var domain = '';

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }

    if (topLevelDomain && topLevelDomain !== null && topLevelDomain !== 'null') {
        domain = '; domain=' + topLevelDomain;
    }

    document.cookie = name + '=' + value + expires + domain + '; path=/';
}

/**
 * appends param at the end of sent url
 *
 * @param {string} url - url with which param to be appended
 * @param {string} name - param to be added
 * @param {string} value - value of parameter
 * @return {string} url with param
 */
function appendParamToURL(url, name, value) {
    // quit if the param already exists
    if (url.indexOf(name + '=') !== -1) {
        return url;
    }
    var separator = url.indexOf('?') !== -1 ? '&' : '?';
    return url + separator + name + '=' + encodeURIComponent(value);
}

/**
 *
 * @param {array} fields - form fields
 * @param {Object} buttonClicked - submit button
 * @param {boolean} formSubmissionError - flag to check if its from submission form
 */
function formFilureEventTrigger(fields, buttonClicked, formSubmissionError) {
    var inputs = [];
    var errors = [];
    fields.map(function () {
        if ($(this).hasClass('is-invalid') || $(this).hasClass('mismatch-invalid')) {
            inputs.push($(this).parents('.form-group').find('.form-control-label').text()
                    .trim());
            if ($(this).siblings('.invalid-feedback').length > 0 && $(this).siblings('.invalid-feedback').text()
                    .trim().length > 0) {
                errors.push($(this).siblings('.invalid-feedback').text().trim());
            }
            if ($(this).siblings('span[class$="-confirm-data-mismatch-error"], div[class$="-confirm-data-mismatch-error"], span[id$="-confirm-data-mismatch-error"], div[id$="-confirm-data-mismatch-error"]').length > 0 && $(this).siblings('span[class$="-confirm-data-mismatch-error"], div[class$="-confirm-data-mismatch-error"], span[id$="-confirm-data-mismatch-error"], div[id$="-confirm-data-mismatch-error"]').text().trim().length > 0 && $(this).siblings('span[class$="-confirm-data-mismatch-error"], div[class$="-confirm-data-mismatch-error"], span[id$="-confirm-data-mismatch-error"], div[id$="-confirm-data-mismatch-error"]').text().trim() !== $(this).siblings('.invalid-feedback').text().trim()) {
                errors.push($(this).siblings('span[class$="-confirm-data-mismatch-error"], div[class$="-confirm-data-mismatch-error"], span[id$="-confirm-data-mismatch-error"], div[id$="-confirm-data-mismatch-error"]').text().trim());
            }
        }
        return true;
    });
    if ((inputs.length > 0 && errors.length > 0) || formSubmissionError === true) {
        googleAnalytics.failureForm({
            formName: buttonClicked ? buttonClicked.parents('form').attr('data-form-name') : $(fields[0]).parents('form').attr('data-form-name'),
            formField: inputs,
            errorText: errors

        });
    } else if (buttonClicked && !buttonClicked.parents('form').hasClass('submitted')) {
        buttonClicked.parents('form').submit();
    }
}

/**
 * Function to check device type of client
 * @returns {string} - device type
 */
function getDeviceType() {
    var isDesktop = $('.menu-toggleable-left').css('position') !== 'absolute';
    var device;
    if (isDesktop) {
        device = 'Desktop';
    } else {
        device = 'Mobile';
    }
    return device;
}

module.exports = {
    createCookie: createCookie,
    getCookie: getCookie,
    appendParamToURL: appendParamToURL,
    formFilureEventTrigger: formFilureEventTrigger,
    deleteCookie: deleteCookie,
    getDeviceType: getDeviceType
};
