'use strict';

/**
 * converts the array of products into required format
 * @param {boolean} recommendation - true if its for recommendation
 * @param {number} tilesFrom - strat of tiles
 * @param {number} tilesTo = end of tiles
 * @returns {array} - array of required structure
 */
function getProducts(recommendation, tilesFrom, tilesTo) {
    var list = $('.category-search-breadcrumbs').attr('data-breadcrumbPath');
    if (!list) {
        list = 'Product Recommendations';
    }
    var productsObj = [];
    var $selector = $('.product-details-gtm');
    if (tilesFrom !== undefined && tilesTo) {
        $selector = $('.product-details-gtm').slice(tilesFrom, tilesTo);
    }
    if (recommendation === true) {
        $selector = $('div[id^="cq_recomm_slot"] .product-details-gtm');
    }
    $selector.each(function (index) {
        var productObj = {
            name: $(this).attr('data-name'),
            id: $(this).attr('data-id'),
            price: $(this).attr('data-price') === 'null' ? null : $(this).attr('data-price'),
            brand: $(this).attr('data-brand') === 'null' ? null : $(this).attr('data-brand'),
            category: $(this).attr('data-category') === 'null' ? null : $(this).attr('data-category'),
            dimension5: $(this).attr('data-dimension5') === 'null' ? null : $(this).attr('data-dimension5'),
            dimension6: $(this).attr('data-dimension6') === 'null' ? null : $(this).attr('data-dimension6'),
            dimension10: $(this).attr('data-dimension10') === 'null' ? null : $(this).attr('data-dimension10'),
            dimension18: $(this).attr('data-dimension18') === 'null' ? null : $(this).attr('data-dimension18'),
            metric1: $(this).attr('data-metric1') === 'null' ? null : $(this).attr('data-metric1'),
            metric3: $(this).attr('data-metric3') === 'null' ? null : $(this).attr('data-metric3'),
            list: list,
            position: tilesFrom ? tilesFrom + index + 1 : index + 1
        };
        $(this).parents('.gtm-tile-subscribed').addClass('imprinted');
        productsObj.push(productObj);
    });

    return productsObj;
}

/**
 * records the event of product impression
 * @param {boolean} recommendation - true if its for recommendation
 * @param {boolean} iterateProducts - true if iteration required
 * @param {Object} items - products
 */
function gaProductImpressionObject(recommendation, iterateProducts) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var currencyCode = $('#pixelCurrencyCode').val();
        var gaobj = {
            ecommerce: {
                currencyCode: currencyCode   // Local currency is optional.
            }
        };
        var produtcImpressions;
        if (iterateProducts) {
            gaobj.event = 'productImpression';
            var totalTiles = $('.product-tile .product-details-gtm').length;
            var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);
            var totalIterations = Math.ceil((totalTiles / gaProductsBatchCount)) - 1;
            var tilesTo = 0;
            var tilesFrom = gaProductsBatchCount;
            for (var i = 0; i < totalIterations; i++) {
                tilesTo = tilesFrom + gaProductsBatchCount;
                produtcImpressions = getProducts(recommendation, tilesFrom, tilesTo);
                tilesFrom = tilesTo;
                gaobj.ecommerce.impressions = produtcImpressions;
                dataLayer.push(gaobj);
            }
        } else {
            produtcImpressions = getProducts(recommendation);
            gaobj.ecommerce.impressions = produtcImpressions;
            dataLayer.push(gaobj);
        }
    }
}

/**
 * subscribes the event of product impression
 */
function subscribeCLPAndBSLPImpressions() {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    var currencyCode = $('#pixelCurrencyCode').val();
    if (googleAnalyticsEnabled === 'true') {
        var target = $('.gtm-tile-subscribed:not(.imprinted)');

        var productsObj = [];
        var productObj = {};
        var count = 0;
        var gaobj = {};
        target.get().forEach(function (recoNode) {
            var index = parseInt($(recoNode).attr('data-tile-index'), 10);
            if (recoNode.getBoundingClientRect().top <= window.innerHeight) {
                count += 1;
                var prod = $(recoNode).find('.product-details-gtm');
                productObj = {
                    name: prod.attr('data-name'),
                    id: prod.attr('data-id'),
                    price: prod.attr('data-price') === 'null' ? null : prod.attr('data-price'),
                    brand: prod.attr('data-brand') === 'null' ? null : prod.attr('data-brand'),
                    category: prod.attr('data-category') === 'null' ? null : prod.attr('data-category'),
                    dimension5: prod.attr('data-dimension5') === 'null' ? null : prod.attr('data-dimension5'),
                    dimension6: prod.attr('data-dimension6') === 'null' ? null : prod.attr('data-dimension6'),
                    dimension10: prod.attr('data-dimension10') === 'null' ? null : prod.attr('data-dimension10'),
                    dimension18: prod.attr('data-dimension18') === 'null' ? null : prod.attr('data-dimension18'),
                    metric1: prod.attr('data-metric1') === 'null' ? null : prod.attr('data-metric1'),
                    metric3: prod.attr('data-metric3') === 'null' ? null : prod.attr('data-metric3'),
                    list: prod.parents('.gtm-crousel-impressions').find('.gtm-carousel-list').length > 0 && prod.parents('.gtm-crousel-impressions').find('.gtm-carousel-list').text() && prod.parents('.gtm-crousel-impressions').find('.gtm-carousel-list').text().length > 0 ? prod.parents('.gtm-crousel-impressions').find('.gtm-carousel-list').text().trim() : 'Product Recommendations',
                    position: index
                };
                if (index === count) {
                    prod.parents('.gtm-tile-subscribed').addClass('imprinted');
                    productsObj.push(productObj);
                } else if (index === 1 && count > index) {
                    gaobj = {
                        event: 'productImpression',
                        ecommerce: {
                            currencyCode: currencyCode,
                            impression: productsObj
                        }
                    };
                    dataLayer.push(gaobj);
                    gaobj = {};
                    count = 1;
                    productsObj = [];
                    prod.parents('.gtm-tile-subscribed').addClass('imprinted');
                    productsObj.push(productObj);
                }
            }
        });
        if (productsObj.length > 0) {
            gaobj = {
                event: 'productImpression',
                ecommerce: {
                    currencyCode: currencyCode,
                    impression: productsObj
                }
            };
            dataLayer.push(gaobj);
        }
    }
}

/**
 * subscribes the event of product impression
 */
function subscribePLPImpressions() {
    var target = $('.gtm-tile-subscribed:not(.imprinted)');
    var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);

    target.get().forEach(function (recoNode) {
        var index = parseInt($(recoNode).attr('data-tile-index'), 10);
        if (index % gaProductsBatchCount === 1) {
            if (recoNode.getBoundingClientRect().top <= window.innerHeight) {
                var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
                if (googleAnalyticsEnabled === 'true') {
                    var currencyCode = $('#pixelCurrencyCode').val();
                    var gaobj = {
                        event: 'productImpression',
                        ecommerce: {
                            currencyCode: currencyCode   // Local currency is optional.
                        }
                    };
                    gaobj.ecommerce.impressions = getProducts(false, index - 1, (index + gaProductsBatchCount) - 1);
                    dataLayer.push(gaobj);
                }
            }
        }
    });
}

/**
 * Returns cookie by the given name
 * @param {string} name - name of coockie
 * @returns {Object} - cookie object or null if not found
 */
function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(';');
    // Loop through the array elements
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=');

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if (name === cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}

/**
 * Trigger Apply Filter GA Event
 * @param {Object} args - object containg required data
 */
function gaApplyFilterObject(args) {
    var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaobj = {
            event: 'filter',
            filterType: args.filterType,
            filterValue: args.filterValue,
            filterAction: args.filterAction,
            ecommerce: {
                impressions: getProducts(false, 0, gaProductsBatchCount)
            }
        };
        dataLayer.push(gaobj);
    }
}

/**
 * Trigger Apply Sorting GA Event
 * @param {Object} args - object containg required data
 */
function gaApplySortingObject(args) {
    var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaobj = {
            event: 'sorting',
            sortingType: args.sortingType,
            ecommerce: {
                impressions: getProducts(false, 0, gaProductsBatchCount)
            }
        };
        dataLayer.push(gaobj);
    }
}

/**
 * Trigger Apply Pagination GA Event
 * @param {Object} args - object containg required data
 */
function gaApplyPaginationObject(args) {
    var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaobj = {
            event: 'pagination',
            newPageNumber: args.newPageNumber,
            currentPageNumber: args.currentPageNumber,
            totalPages: args.totalPages,
            ecommerce: {
                impressions: getProducts(false, 0, gaProductsBatchCount)
            }
        };
        dataLayer.push(gaobj);
    }
}

/**
 * page view event triggering
 * @param {Object} members - checkout stages object
 * @returns {string} - page type
 */
function gaPageViewObject(members) {
    var pageViewVal = $('#page-view').val();
    var gaobj = pageViewVal ? JSON.parse(pageViewVal) : '';
    if (gaobj !== '') {
        if ((gaobj.pageType === 'Product' && !gaobj.pageCategory) || gaobj.pageType === 'Brand' || (gaobj.pageType === 'PLP' && (!gaobj.pageCategory || !gaobj.pageSubCategory1 || !gaobj.pageSubCategory2 || !gaobj.pageSubCategory3))) {
            $('.breadcrumb-item a').each(function (index) {
                if (index === 0) {
                    gaobj.pageCategory = $(this).text().trim();
                } else {
                    gaobj['pageSubCategory' + index.toString()] = $(this).text().trim();
                }
            });
        }
        if (gaobj.pageType === 'CLP' && !gaobj.pageCategory && $('.pd-cat').length > 0) {
            gaobj.pageCategory = $('.pd-cat').attr('id').replace('-clp', '');
            gaobj.pageCategory = gaobj.pageCategory.charAt(0).toUpperCase() + gaobj.pageCategory.slice(1);
            if (gaobj.pageCategory.indexOf('beauty') > -1) {
                gaobj.pageCategory = 'Beauty';
            }
        }

        if (members || (gaobj.pageType === 'Checkout' && $('#checkoutProductList').length > 0)) {
            var isGuestCheckout = false;
            if ($('#checkout-main').data('customer-type') === 'guest') {
                isGuestCheckout = true;
            }
            gaobj.guestCheckout = isGuestCheckout;
            gaobj.checkoutType = $('input[name=isPaypal]').val() === 'true' ? 'Paypal' : 'Standard';
            var productitems = JSON.parse($('#checkoutProductList').val());
            var categoryCorrectionObject = JSON.parse($('#checkoutObject').val());
            Object.keys(productitems).forEach(function (key) {
                productitems[key].category = categoryCorrectionObject[key].category;
            });
            var step = members ? members.currentStage + 1 : null;
            if (!step) {
                var checkoutStages = [
                    'address',
                    'payment',
                    'placeOrder',
                    'submitted'
                ];
                step = checkoutStages.indexOf($('#checkout-main').data('checkout-stage')) + 1;
            }
            var ecommerce = {
                checkout: {
                    actionField: {
                        step: step,
                        option: $('.nav-item.selected').length > 0 ? $('.nav-item.selected a').text().trim() : null
                    },
                    products: productitems
                }
            };
            gaobj.ecommerce = ecommerce;
        }

        if ($('.product-tile .product-details-gtm').length > 0 && gaobj.pageType !== 'CLP' && gaobj.pageType !== 'Brand') {
            var currencyCode = $('#pixelCurrencyCode').val();
            var gaProductsBatchCount = parseInt($('#ga_productsBatchCount').val(), 10);
            var ecommerceObj = {
                currencyCode: currencyCode,                       // Local currency is optional.
                impressions: getProducts(false, 0, gaProductsBatchCount)
            };
            gaobj.ecommerce = ecommerceObj;
        }
        dataLayer.push(gaobj);
    }
    return gaobj && gaobj.pageType ? gaobj.pageType : null;
}

/**
 * Decides event based on action
 */
function sendEvent() {
    var pageViewPlusProductDetail = false;
    var action = $('#page-action').val();
    if (action === 'Product-Show') {
        var gaObj = JSON.parse($('#productData').val());
        if ($('.product-tile .product-details-gtm').length > 0) {
            gaObj.ecommerce.impressions = getProducts();
        }
        if ($('#page-view').length > 0) {
            var pageViewObj = JSON.parse($('#page-view').val());
            if (pageViewObj.pageType === 'Product' && !pageViewObj.pageCategory) {
                $('.breadcrumb-item a').each(function (index) {
                    if (index === 0) {
                        pageViewObj.pageCategory = $(this).text().trim();
                    } else {
                        pageViewObj['pageSubCategory' + index.toString()] = $(this).text().trim();
                    }
                });
            }
            if (gaObj && pageViewObj) {
                pageViewPlusProductDetail = true;
                Object.keys(gaObj).forEach(function (key) {
                    if (key !== 'event') {
                        pageViewObj[key] = gaObj[key];
                    }
                });
                gaObj = pageViewObj;
            }
        }
        dataLayer.push(gaObj);
    } else if (action === 'Order-Confirm') {
        dataLayer.push(JSON.parse($('#orderData').val()));
        gaPageViewObject();
    } else if ($('.product-tile .product-details-gtm').length > 0) {
        var pageViewType = null;
        if (pageViewPlusProductDetail === false) {
            pageViewType = gaPageViewObject();
        }
        if (pageViewType !== 'PLP' && pageViewType !== 'CLP' && pageViewType !== 'Brand') {
            gaProductImpressionObject(false, true);
        }
    } else {
        gaPageViewObject();
    }
}

/**
 * Triggers for pdp variation change
 */
function handleVariantDetailEvent() {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = JSON.parse($('#productData').val());
        dataLayer.push(gaObj);
    }
}

/**
 * decides if to fire the google analytics event or not
 */
function handleAction() {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        sendEvent();
    }
}

/**
 * decides if to fire the google analytics event or not
 * @param {Object} cookieSetting - cookies state
 */
function handleConsentChange(cookieSetting) {
    var gaobj = {
        event: 'consentChange',
        analyticsConsent: cookieSetting.analytics,
        marketingConsent: cookieSetting.marketingConsent,
        personalizationConsent: cookieSetting.personalizationConsent,
        GoogleAnalytics: cookieSetting.googleAnalytics,
        facebookTracking: cookieSetting.faceBook,
        GoogleAds: cookieSetting.googleAds
    };
    dataLayer.push(gaobj);
}

/**
 * records the event of add to cart
 * @param {Object} item - add to cart item
 * @param {Object} quantity - quantity of product
 * @param {string} deliveryType - delivery type
 * @param {string} deliveryCost - delivery cost
 */
function gaAddToCartObject(item, quantity, deliveryType, deliveryCost) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var currencyCode = $('#currencyCode').val();
        var gaobj = {
            event: 'addToCart',
            ecommerce: {
                currencyCode: currencyCode,
                add: {
                    products: []
                }
            }
        };
        var productObj = {
            name: item.productName,
            id: item.masterProductId,
            price: item.price.sales.value.toString(),
            brand: item.brand,
            category: item.breadcrumbsPath,
            variant: item.productType === 'variant' ? item.id : null,
            dimension1: item.refinementColor
        };
        productObj.dimension2 = item.productType === 'variant' ? '0' : null;
        if ((item.productType === 'variant' || item.productType === 'standard') && item.quantityATS) {
            if (item.quantityATS.perpetual) {
                productObj.dimension2 = 'perpetual';
            } else if (item.quantityATS.availableToSell) {
                productObj.dimension2 = item.quantityATS.availableToSell;
            }
        }
        productObj.dimension3 = deliveryCost ? deliveryCost.replace(',', '.') : null;
        productObj.dimension4 = deliveryType;
        productObj.dimension5 = null;
        if (item.isNew) {
            productObj.dimension5 = 'Neu';
        } else if (item.percentageOff && item.percentageOff > 0) {
            productObj.dimension5 = item.percentageOff + '%';
        }
        productObj.dimension6 = item.percentageOff && item.percentageOff > 0 ? 'true' : 'false';
        productObj.dimension10 = 'Own';
        productObj.dimension11 = item.size ? item.size : null;
        productObj.dimension18 = item.EAN ? item.EAN : null;
        productObj.metric1 = null;
        if (item.price && item.price.list) {
            productObj.metric1 = item.price.list.decimalPrice.toString();
        } else if (item.price && item.price.sales) {
            productObj.metric1 = item.price.sales.decimalPrice.toString();
        }
        productObj.metric4 = null;
        productObj.quantity = quantity || 1;
        gaobj.ecommerce.add.products.push(productObj);
        dataLayer.push(gaobj);
    }
}

/**
 * records the event of remove from cart
 * @param {Object} item - remove from cart item
 * @param {string} deliveryType - delivery type
 * @param {string} deliveryCost - delivery cost
 */
function gaRemoveFromCartObject(item, deliveryType, deliveryCost) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var currencyCode = $('#currencyCode').val();
        var gaobj = {
            event: 'removeFromCart',
            ecommerce: {
                currencyCode: currencyCode,
                remove: {
                    products: []
                }
            }
        };
        var productObj = {
            name: item.productName,
            id: item.masterProductId,
            price: item.price.sales.value.toString(),
            brand: item.brand,
            category: item.breadcrumbsPath,
            variant: item.id,
            quantity: item.quantity,
            dimension1: item.refinementColor
        };
        productObj.dimension2 = '0';
        if (item.quantityATS) {
            if (item.quantityATS.perpetual) {
                productObj.dimension2 = 'perpetual';
            } else if (item.quantityATS.availableToSell) {
                productObj.dimension2 = item.quantityATS.availableToSell;
            }
        }
        productObj.dimension3 = null;
        if (deliveryCost) {
            productObj.dimension3 = deliveryCost.replace(',', '.');
        } else {
            productObj.dimension3 = '0.00';
        }
        productObj.dimension4 = deliveryType;
        productObj.dimension5 = null;
        if (item.isNew === true || item.isNew === 'true') {
            productObj.dimension5 = 'Neu';
        } else if (item.percentageOff && item.percentageOff > 0) {
            productObj.dimension5 = item.percentageOff + '%';
        }
        productObj.dimension6 = item.percentageOff && item.percentageOff > 0 ? 'true' : 'false';
        productObj.dimension10 = 'Own';
        productObj.dimension11 = item.size ? item.size : null;
        productObj.dimension18 = item.EAN ? item.EAN : null;
        productObj.metric1 = null;
        if (item.price && item.price.list) {
            productObj.metric1 = item.price.list.decimalPrice.toString();
        } else if (item.price && item.price.sales) {
            productObj.metric1 = item.price.sales.decimalPrice.toString();
        }
        productObj.metric4 = null;
        gaobj.ecommerce.remove.products.push(productObj);
        dataLayer.push(gaobj);
    }
}

/**
 * records the event of product click
 * @param {Object} item - add to cart item
 * @param {Object} fromCart - flag if coming from cart
 */
function gaClickProductObject(item, fromCart) {
    var list = $('.category-search-breadcrumbs').attr('data-breadcrumbPath');
    if (!list && !fromCart) {
        list = 'Product Recommendations';
    }
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaobj = {
            event: 'productClick',
            ecommerce: {
                click: {
                    actionField: { list: list },      // Optional list property.
                    products: []
                }
            },
            eventCallback: function () {
                document.location = item.url;
            }
        };
        var productObj = {
            name: item.name,
            id: item.id,
            price: item.price,
            brand: item.brand,
            category: item.category,
            dimension5: item.dimension5,
            dimension6: item.dimension6,
            dimension10: item.dimension10,
            dimension18: item.dimension18,
            metric1: item.metric1,
            metric3: item.metric3,
            variant: item.variant,
            position: 1
        };
        gaobj.ecommerce.click.products.push(productObj);
        dataLayer.push(gaobj);
    }
}

/**
 * records the event in checkout process
 * @param {Object} members - checkout stage information
 */
function googleanalyticsCheckotEvent(members) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var productitems = JSON.parse($('#checkoutObject').val());
        if (members.currentStage === 0) {
            dataLayer.push({
                event: 'checkout',
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: members.currentStage + 1
                        },
                        products: productitems
                    }
                }
            });
        } else if (members.currentStage === 1) {
            dataLayer.push({
                event: 'paymentInfo',
                ecommerce: {
                    checkout: {
                        actionField: {
                            step: members.currentStage + 1
                        },
                        products: productitems
                    }
                }
            });
        }
    }
}

/**
 * records the event in checkout failure process
 * @param {Object} data - checkout error ata
 */
function checkoutFailure(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var isGuestCheckout = false;
        if ($('#checkout-main').data('customer-type') === 'guest') {
            isGuestCheckout = true;
        }
        var errorId = [];
        var errrorText = [];
        if (data.errorCode) {
            errorId.push(data.errorCode);
            if (data.errorMessage) {
                errrorText.push(data.errorMessage);
            }
        }
        var gaObj = {
            event: 'checkoutFailure',
            checkoutType: $('input[name=isPaypal]').val() === 'true' ? 'Paypal' : 'Standard',
            guestCheckout: isGuestCheckout,
            checkoutError: data.errorMessage ? data.errorMessage : null,
            formField: [],
            errorId: errorId,
            errrorText: errrorText
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event in registration failure process
 * @param {Object} data - registration error data
 */
function registrationFailure(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'registrationFailure',
            formField: data.formField,
            errorText: data.errorText
        };
        if (data.formField.length !== 0) {
            dataLayer.push(gaObj);
        }
    }
}

/**
 * records the event of loyalty card clicks
 * @param {Object} data - arguments
 */
function loyaltyCardClick(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'Loyalty Card',
            step: '1_signUp',
            buttonLocation: data
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event in registration success process
 * @param {Object} data - registration success data
 */
function registrationSuccess(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'registrationSuccess',
            userId: data.customerNumber,
            LoggedIn: true
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event in login success process
 * @param {Object} data - login success data
 */
function loginSuccess(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'loginSuccess',
            eventCategory: 'Login',
            userID: data.customerNumber,
            loggedIn: data.loggedIn
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event in login failure process
 * @param {Object} data - login failure data
 */
function loginFailure(data) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {};
        gaObj = {
            event: 'loginFailure',
            userID: data.customerNumber,
            loggedIn: data.loggedIn,
            errorText: data.error
        };
        if (!data.loggedIn) {
            gaObj.loggedIn = 'false';
        }
        if (!data.customerNumber) {
            gaObj.userID = null;
        }
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of form view
 * @param {Object} args - arguments
 */
function viewOrSubmitForm(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: args.event,
            formName: args.formName
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of form failure
 * @param {Object} args - arguments
 */
function failureForm(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'formFailure',
            formName: args.formName,
            formField: args.formField,
            errorText: args.errorText
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records search clicks
 * @param {Object} args - arguments
 */
function internalSearch(args) {
    var decodedKeyword;
    if (args.searchKeyword === '') {
        decodedKeyword = null;
    } else {
        decodedKeyword = decodeURI(args.searchKeyword);
    }
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'internalSearch',
            searchTerm: decodedKeyword,
            searchType: args.eventType
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records navigation data
 * @param {Object} args - arguments
 */
function navigationEvents(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'navigation',
            navigationType: args.eventType,
            navigationElement: args.eventKeyword
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of contact
 * @param {Object} args - arguments
 */
function contactEvent(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'contact',
            contactCategory: args.contactCategory,
            contactLink: args.contactLink
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of links
 * @param {Object} args - arguments
 */
function linkEvent(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'links',
            linkCategory: args.linkCategory,
            linkDomain: args.linkDomain,
            linkURL: args.linkURL
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of promotional views
 * @param {Object} args - arguments
 */
function promotionalView(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'internalPromotionView',
            ecommerce: {
                promoView: {
                    promotions: args
                }
            }
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of promotional clicks
 * @param {Object} args - arguments
 */
function promotionalClick(args) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'internalPromotionClick',
            ecommerce: {
                promoClick: {
                    promotions: [
                        args
                    ]
                }
            }
        };
        dataLayer.push(gaObj);
    }
}

/**
 * records the event of beauty services clicks
 * @param {Object} brand - arguments
 */
function beautyServicesClicks(brand) {
    var googleAnalyticsEnabled = $('#googleAnalyticsEnabled').val();
    if (googleAnalyticsEnabled === 'true') {
        var gaObj = {
            event: 'Store Service',
            service: 'Beauty Service Appointment',
            brand: brand
        };
        dataLayer.push(gaObj);
    }
}

exports.getCookie = getCookie;
exports.googleanalyticsCheckotEvent = googleanalyticsCheckotEvent;
exports.gaAddToCartObject = gaAddToCartObject;
exports.handleAction = handleAction;
exports.gaRemoveFromCartObject = gaRemoveFromCartObject;
exports.gaClickProductObject = gaClickProductObject;
exports.gaProductImpressionObject = gaProductImpressionObject;
exports.handleVariantDetailEvent = handleVariantDetailEvent;
exports.handleConsentChange = handleConsentChange;
exports.gaPageViewObject = gaPageViewObject;
exports.checkoutFailure = checkoutFailure;
exports.registrationFailure = registrationFailure;
exports.registrationSuccess = registrationSuccess;
exports.loginSuccess = loginSuccess;
exports.loginFailure = loginFailure;
exports.subscribePLPImpressions = subscribePLPImpressions;
exports.subscribeCLPAndBSLPImpressions = subscribeCLPAndBSLPImpressions;
exports.gaApplyFilterObject = gaApplyFilterObject;
exports.gaApplySortingObject = gaApplySortingObject;
exports.gaApplyPaginationObject = gaApplyPaginationObject;
exports.viewOrSubmitForm = viewOrSubmitForm;
exports.failureForm = failureForm;
exports.internalSearch = internalSearch;
exports.navigationEvents = navigationEvents;
exports.contactEvent = contactEvent;
exports.linkEvent = linkEvent;
exports.promotionalView = promotionalView;
exports.promotionalClick = promotionalClick;
exports.beautyServicesClicks = beautyServicesClicks;
exports.loyaltyCardClick = loyaltyCardClick;

