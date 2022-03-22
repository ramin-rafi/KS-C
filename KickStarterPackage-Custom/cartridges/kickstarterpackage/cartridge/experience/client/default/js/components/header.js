'use strict';
var google = require('./googleAnalytics');
require('autocomplete.js/dist/autocomplete.jquery');

/**
 * floating label Script
 * @param {Object} field - parameter used for input
 */
function floatLabels(field) {
    var controlLabel = field.siblings('.form-control-label');
    var valueLength = field.val().length;


    if (valueLength > 0) {
        controlLabel.parents('.form-group').addClass('float-wrapper');
        controlLabel.addClass('float-label');
    } else {
        controlLabel.parents('.form-group').removeClass('float-wrapper');
        controlLabel.removeClass('float-label');
    }
}

module.exports = function () {
    //  teaser images focus points js
    $('.focuspoint').focusPoint();

    $(function () {
        var container = $('.header-banner');
        if (container.find('.html-slot-container').length) {
            container.addClass('slot-active');
        } else {
            container.addClass('slot-inactive');
        }
    }());
    $('.search-opener').on('click', function () {
        $(this).parent().addClass('active');
        $(this).parent().find('.site-search').addClass('search-open');
        $('.page').addClass('search-open');
        $(this).parent().find('.site-search input.search-field').focus();
    });
    $('.search-field').val('');

    $('.flyout-opener,.search-mobile-holder').on('click', function () {
        $('body').addClass('search-flyout-active');
        $('.search-form-wrapper').removeClass('d-xl-block d-none');
        $('.search-field').focus();
    });

    $('.flyout-close').on('click', function () {
        $('.search-field').val('');
        $('body').removeClass('search-flyout-active');
        $('.search-form-wrapper').addClass('d-xl-block d-none');
    });

    $(document).mouseup(function (e) {
        var container = $('.site-search, .suggestions');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.parent().removeClass('active');
            container.removeClass('search-open');
            $('.page').removeClass('search-open');
            $('.search-field').val('');
            $('body').removeClass('search-show');
        }
    });

    $('.header-right-part a#myaccount').on('mouseover', function () {
        $(this).closest('header').siblings().attr('aria-hidden', 'false');
        $(this).closest('.suggestions').removeClass('modal');
        $('body').removeClass('search-show');
    });

    $('.header-right-part a#myaccount').on('mouseover', function () {
        $(this).closest('.header-wrap').find('.suggestions').hide();
        $('.site-search').parent().removeClass('active');
        $('.site-search').removeClass('search-open');
        $('.page').removeClass('search-open');
        $('body').removeClass('search-show');
        $('.search-field').val('');
    });

    $('.mobile-categories > a.more-link').on('click', function () {
        $(this).parent('.mobile-categories').toggleClass('active');
    });

    jcf.replaceAll();

    //  Top ticker
    if ($('#top-ticker').length > 0) {
        $('#top-ticker').jConveyorTicker();
    }

    $('body').on('click', '.menu-group a', function () {
        var check = $(this).parent();
        var breadcrumb2;
        var eventKeyword;
        var data;
        var concatenatedName = $(this).parents('li.dropdown').find('span:first');
        var breadcrumb1 = $(concatenatedName[0]).text();
        if (concatenatedName[1]) {
            breadcrumb2 = $(concatenatedName[1]).text();
        }
        if (check.hasClass('show')) {
            eventKeyword = $(this).text();
            data = {
                hint: 'main',
                eventKeyword: eventKeyword,
                eventType: 'Main Navigation'
            };
            google.navigationEvents(data);
        } else {
            eventKeyword = breadcrumb1 + ' > ' + breadcrumb2 + ' > ' + $(this).text();
            data = {
                hint: 'flyout',
                eventKeyword: eventKeyword,
                eventType: 'Flyout Navigation'
            };
            google.navigationEvents(data);
        }
    });

    $('button.cat-refinement .refinement-dvalue').on('click', function () {
        var buttonText = $(this).text();
        var data = {
            hint: 'side',
            eventKeyword: buttonText.trim(),
            eventType: 'Side Navigation'
        };
        google.navigationEvents(data);
    });

    $('body').on('click', '.breadcrumb-item a', function () {
        var data = {
            hint: 'breadcrumb',
            eventKeyword: $(this).text(),
            eventType: 'Breadcrumb Navigation'
        };
        google.navigationEvents(data);
    });

    $('body').on('click', '.tripple-nav', function () {
        var data = {
            hint: 'tab',
            eventKeyword: $(this).text(),
            eventType: 'Tab Navigation'
        };
        google.navigationEvents(data);
    });

    $('body').on('click', '.links-part ul li a', function () {
        var eventKeyword = $(this).text();
        if ($(this).hasClass('fa-facebook')) {
            eventKeyword = 'facebook';
        } else if ($(this).hasClass('fa-Weibo')) {
            eventKeyword = 'Weibo';
        } else if ($(this).hasClass('fa-instagram')) {
            eventKeyword = 'instagram';
        } else if ($(this).hasClass('fa-weixin')) {
            eventKeyword = 'Weixin';
        }
        var data = {
            hint: 'footer',
            eventKeyword: eventKeyword,
            eventType: 'Footer Navigation'
        };
        google.navigationEvents(data);
    });

    $('body').on('click', '.header-banner a, .navbar-header a, .top-header a', function () {
        var eventKeyword;
        if (($(this).text().trim()).length === 0) {
            eventKeyword = 'Logo';
        } else {
            eventKeyword = $(this).text();
        }
        var data = {
            hint: 'header',
            eventKeyword: eventKeyword,
            eventType: 'Header Navigation'
        };
        google.navigationEvents(data);
    });

    $('body').on('click', '.dl-promo', function () {
        var data;
        var slotTemp = $(this).data('slot');
        var dataid = $(this).data('id');
        if ($(this).data('creative') === 'Navigation - Main Menu Teaser') {
            var idExtended = $(this).parents('li.dropdown').find('span:first').text();
            dataid = idExtended + ' > ' + dataid;
        }
        if ($(this).data('creative') === 'Homepage Teaser') {
            dataid = dataid.replace(/\n/g, ' ');
        }
        if (slotTemp === undefined) {
            slotTemp = 'slot1';
        }
        if ($(this).data('creative') === undefined) {
            data = {
                id: dataid,
                name: dataid,
                position: slotTemp
            };
        } else {
            data = {
                id: dataid,
                name: dataid,
                creative: $(this).data('creative'),
                position: slotTemp
            };
        }
        google.promotionalClick(data);
    });

    $(document).ready(function () {
        var getHeaderHeight = $('#header').height();
        if ($('.addtransparency').length > 0) {
            $('body').addClass('transpraentHeader');

            if ($('body').hasClass('transpraentHeader')) {
                $('#maincontent').css('paddingTop', 0);
            } else {
                $('#maincontent').css('paddingTop', getHeaderHeight);
            }
        }

        $('.line-item-attributes, .size-measurement').each(function () {
            var fixedSize;
            var indexOfUnit;
            if ($(this).text().indexOf('ml') > -1 || $(this).text().indexOf('ML') > -1 || $(this).text().indexOf('cm') > -1 || $(this).text().indexOf('CM') > -1) {
                fixedSize = $(this).text();
                if (fixedSize.indexOf('ml') > -1) {
                    indexOfUnit = fixedSize.indexOf('ml');
                } else if (fixedSize.indexOf('g') > -1) {
                    indexOfUnit = fixedSize.indexOf('g');
                } else if (fixedSize.indexOf('cm') > -1) {
                    indexOfUnit = fixedSize.indexOf('cm');
                }
                if (fixedSize.charAt(indexOfUnit - 1) === ' ') {
                    var SpaceRemoved = fixedSize.slice(0, indexOfUnit - 1) + fixedSize.slice(indexOfUnit);
                    $(this).text(SpaceRemoved);
                }
            }
        });

        var promotionalObjects = [];
        var data;
        $('.dl-promo:not(".slick-cloned")').each(function () {
            if (!$(this).parents().closest('div').hasClass('.slick-cloned')) {
                var creative = $(this).data('creative');
                var dataid = $(this).data('id');
                if ($(this).data('creative') === 'Navigation - Main Menu Teaser') {
                    var idExtended = $(this).parents('li.dropdown').find('span:first').text();
                    dataid = idExtended + ' > ' + dataid;
                }
                if ($(this).data('creative') === 'Homepage Teaser') {
                    dataid = dataid.replace(/\n/g, ' ');
                }
                var slotTemp = $(this).data('slot');
                if (slotTemp === undefined) {
                    slotTemp = 'slot1';
                }
                if ($(this).data('creative') === undefined) {
                    data = {
                        id: dataid,
                        name: dataid,
                        position: slotTemp
                    };
                } else {
                    data = {
                        id: dataid,
                        name: dataid,
                        creative: creative,
                        position: slotTemp
                    };
                }
                promotionalObjects.push(data);
            }
        });
        google.promotionalView(promotionalObjects);
    });

    //  trending category footer collapse
    $('.trends-category-wrap .btn-more').click(function () {
        $(this).closest('.trends-category-wrap').toggleClass('expand');
        $(this).html($(this).html() === 'Mehr' ? 'Weniger' : 'Mehr');
    });

    //  password view code

    $('.view-link').click(function () {
        $(this).toggleClass('active');
        var input = $(this).parents('.form-group').find('input');
        if (input.attr('type') === 'password') {
            input.attr('type', 'text');
        } else {
            input.attr('type', 'password');
        }
    });

    $(document).ready(function () {
        google.handleAction();

        //  disable tabbing
        var tabIndexNo = $('.no-tabbing, .no-tabbing .jcf-select');
        tabIndexNo.attr('tabindex', '-1');
    });

    $('body').on('click', '.pcalist', function () {
        setTimeout(function () {
            $('.loqate-lookup').focusout();
            $('.fake-city').val($('.real-city').val());
            $('.fake-zipcode').val($('.real-zipcode').val());
            $('.billing-fake-city').val($('.billing-real-city').val());
            $('.billing-fake-zipcode').val($('.billing-real-zipcode').val());
            $('.loqate-lookup').map(function () {
                if ($(this).val() && $(this).val().length > 0) {
                    $(this).siblings('.form-control-label').addClass('float-label');
                    $(this).parents('.form-group').addClass('float-wrapper');
                }
                return true;
            });
            if ($('.shipping-address-heading').length > 0 && (!($('.shipping-address-heading').hasClass('d-none')) && !($('.shippingAddressOne').val().toLowerCase().indexOf('packstation') > -1 || $('.shippingAddressOne').val().toLowerCase().indexOf('postfiliale') > -1))) {
                $('.geo-name').trigger('input');
                $('.geo-name').trigger('focusout');
            } else if ($('.billingAddressOne').length > 0 && (!($('.billingAddressOne').hasClass('page-check'))) && $('.shipping-address-heading').hasClass('d-none')) {
                $('.geo-name').trigger('input');
                $('.geo-name').trigger('focusout');
            } else if (($('#address1').length > 0) && (!($('#address1').hasClass('page-check')))) {
                $('.geo-name').trigger('input');
                $('.geo-name').trigger('focusout');
                $('#address1').closest('form').find('button[type="submit"]').prop('disabled', false);
            } else {
                $('.billingAddressOne').removeClass('page-check');
                $('#address1').removeClass('page-check');
            }
        }, 500);
        $('.loqate-lookup').map(function () {
            if ($(this).val() && $(this).val().length > 0) {
                $(this).siblings('.form-control-label').addClass('float-label');
                $(this).parents('.form-group').addClass('float-wrapper');
            }
            return true;
        });
    });

    if ($('#page-view').length > 0) {
        $(document).scroll(function () {
            var pageViewVal = $('#page-view').val();

            if (pageViewVal) {
                var gaobj = JSON.parse(pageViewVal);
                if (gaobj.pageType === 'PLP') {
                    google.subscribePLPImpressions();
                } else if (gaobj.pageType === 'CLP' || gaobj.pageType === 'Brand') {
                    google.subscribeCLPAndBSLPImpressions(gaobj.pageType);
                }
            }
        });
    }

    $('.dt-contact').on('click', function () {
        var gaobj = {
            contactCategory: $(this).attr('data-contact-category'),
            contactLink: $(this).text().trim()
        };
        google.contactEvent(gaobj);
    });

    $('a:not(.dt-contact)').on('click', function () {
        if ($(this).attr('href')) {
            var internalDomainSet = $('.home-link.logo-home').length > 0 ? $('.home-link.logo-home').attr('data-internalDomainSet') : $('.checkout-logo').attr('data-internalDomainSet');
            if (internalDomainSet) {
                var url = new URL($(this).prop('href'));
                if (url && url.origin && url.href && url.hostname) {
                    var linkCategory = 'outbound';
                    if (internalDomainSet.indexOf(url.hostname) > -1) {
                        linkCategory = 'internal';
                    }
                    var gaobj = {
                        linkCategory: linkCategory,
                        linkDomain: url.origin,
                        linkURL: url.href
                    };
                    google.linkEvent(gaobj);
                }
            }
        }
    });

    if ($('#enableAXValidation').val() === 'true') {
        $('.geo-name').autocomplete({ hint: false, minLength: 3 }, [{
            source: function (request, response) {
                if (event) {
                    var element = event.target;
                    var addressLookup = $(element).parents('form').data('address-lookup-url');
                    var enableAXLookup = $('#enableAXLookup').val();
                    if (enableAXLookup !== 'false' && addressLookup) {
                        var isCityLookup = $(element).hasClass('geo-name-city');
                        var form = {
                            inputVal: request,
                            isCityLookup: isCityLookup
                        };
                        $.ajax({
                            url: addressLookup,
                            type: 'post',
                            data: form,
                            success: function (data) {
                                if (data.success) {
                                    var suggestionsList = data.suggestionsArray;
                                    response(suggestionsList);
                                }
                            }
                        });
                    }
                }
            // eslint-disable-next-line object-property-newline
            }, templates: {
                suggestion: function (suggestion) {
                    var suggestedString = suggestion.displayValue;
                    // var inputVal = $('#shippingZipCodedefault').val();
                    // var highlightedText = boldString(suggestedString, inputVal);
                    var list;
                    if (suggestedString) {
                        // var list = "<span class='d-block'> " + highlightedText + '</span>';
                        list = "<span class='d-block'> " + suggestion.displayValue + '</span>';
                    }
                    return list;
                }
            }
        }]).on('autocomplete:selected', function (event, suggestion) {
            if (suggestion.city && suggestion.postalCode) {
                var element = event.target;
                var isCityLookup = $(element).hasClass('geo-name-city');
                if (isCityLookup) {
                    $(event.target).parents('.address-form').find('.geo-name-zipcode').val(suggestion.postalCode);
                    $(event.target).parents('.address-form').find('.geo-name-zipcode').trigger('input');
                    $(event.target).parents('.address-form').find('.geo-name-zipcode').focus();
                    $(event.target).val(suggestion.city).trigger('input').focus();
                } else {
                    $(event.target).parents('.address-form').find('.geo-name-city').val(suggestion.city);
                    $(event.target).parents('.address-form').find('.geo-name-city').trigger('input');
                    $(event.target).parents('.address-form').find('.geo-name-city').focus();
                    $(event.target).val(suggestion.postalCode).trigger('input').focus();
                    $(event.target).removeClass('is-invalid');
                    $(event.target).parents('.form-group').find('.invalid-feedback').hide();
                }
            }
        });
        try {
            // eslint-disable-next-line no-undef
            pca.on('load', function (type, id, control) {
                control.listen('populate', function (address) {
                    var $focusedElement = $($(this)[0].autocomplete.field);
                    var url = $focusedElement.parents('form').data('address-matcher-url');
                    var city = address.City;
                    var zipcode = address.PostalCode;
                    var form = {
                        city: city,
                        zipcode: zipcode
                    };
                    $.ajax({
                        url: url,
                        type: 'post',
                        data: form,
                        success: function (data) {
                            if (data.success) {
                                $focusedElement.parents('.address-form').find('.geo-name-zipcode').val(zipcode);
                                $focusedElement.parents('.address-form').find('.geo-name-city').val(city);
                            } else {
                                $focusedElement.parents('.address-form').find('.geo-name-zipcode').val('');
                                $focusedElement.parents('.address-form').find('.geo-name-city').val('');
                            }
                            $('.geo-name').trigger('input');
                            $('.geo-name').trigger('focusout');
                            $focusedElement.parents('.address-form').find('.loqate-lookup').trigger('focusout');
                        }
                    });
                });
            });
        } catch (e) {
            // pca nott loaded
        }
        $('.dummy-input').on('input', function () {
            $(this).parents('.address-form').find($(this).data('target-field') + ":not('.dummy-input')").val($(this).val());
        });
    }
    $('.dummy-input').on('input', function () {
        $(this).parents('.address-form').find($(this).data('target-field') + ":not('.dummy-input')").val($(this).val());
    });

    try {
        // eslint-disable-next-line no-undef
        pca.on('load', function (type, id, control) {
            control.listen('populate', function () {
                var $focusedElement = $($(this)[0].autocomplete.field);
                floatLabels($focusedElement.parents('.address-form').find('.geo-name-zipcode'));
                floatLabels($focusedElement.parents('.address-form').find('.geo-name-city'));
            });
        });
    } catch (e) {
        // pca nott loaded
    }
};
