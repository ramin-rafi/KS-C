'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var utilHelper = require('*/cartridge/scripts/helpers/utilHelper');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var product = context.content.product;
    var primaryCategoryID = productHelper.getPrimaryRootCategory(product);

    var logoConfig = utilHelper.getLogoConfigPrefs();
    if (logoConfig) {
        logoConfig = logoConfig[product.brand] ? logoConfig[product.brand] : false;
    }

    model.logoVersion = logoConfig && logoConfig.logoVersion ? logoConfig.logoVersion : null;

    if (logoConfig.backgroundHexColor) {
        model.backgroundHexColor = logoConfig.backgroundHexColor;
    }

    if (logoConfig.lineFrameHexColor) {
        model.lineFrameHexColor = logoConfig.lineFrameHexColor;
    }

    if (product.brand && primaryCategoryID) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', primaryCategoryID,'prefn1','brand','prefv1', product.brand).toString();
    } else if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', primaryCategoryID).toString();
    }

    if (logoConfig.image) {
        var img = URLUtils.staticURL(URLUtils.CONTEXT_LIBRARY, null, logoConfig.image);
        model.logo = {
            src: {
                mobile  : img,
                desktop : img
            }
        };
    }

    return new Template('experience/components/assets/brandLogoHeader').render(model).text;
};
