'use strict';

var google = require('./googleAnalytics');

/**
 * Executes a callback function when a dynamic recommendation is loaded
 * @param callback - function to execute
 */
module.exports = {
    init: function (callback) {
        var recomendationSlots = $('div[id^="cq_recomm_slot"]');

        var mutationConfig = {
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true
        };

        recomendationSlots.get().forEach(function (recoNode) {
            var observer = new MutationObserver(function () {
                if (callback) {
                    callback(recoNode);
                    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
                    if (googleAnalyticsEnabled === 'true') {
                        if ($('div[id^="cq_recomm_slot"] .product-details-gtm').length > 0) {
                            google.gaProductImpressionObject(true);
                        }
                    }
                    $('.product-tile').map(function () { // eslint-disable-line array-callback-return
                        if ($(this).find('.sales-flag').length !== 0 && $(this).parents('.show-sales-flag').length !== 0 && !$(this).parents('.show-sales-flag').attr('new-arrival-priority')) {
                            $(this).find('.sales-flag').removeClass('d-none');
                        } else if ($(this).find('.new-flag').length !== 0 && !$(this).parents('.show-sales-flag').attr('new-arrival-priority')) {
                            var url = $(this).find('.product-link').attr('href');
                            $(this).find('.product-link').attr('href', url + '#flag=new');
                            $(this).find('.new-flag').removeClass('d-none');
                        }
                    });
                }

                observer.disconnect();
            });

            observer.observe(recoNode, mutationConfig);
        });
    }
};
