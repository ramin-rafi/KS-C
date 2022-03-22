'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the assets.einsteinproductrecommendation.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    var category = content.category;
    model.title = content.title;
    model.prodLimit = parseInt(content.prodLimit);

    if (content.color) {
        model.color = content.color;
    }

    if (content.brand) {
        model.brand = content.brand;
    }

    if (category) {
        model.Category = content.category;
    }
    return new Template('experience/components/layouts/skuCarousel').render(model).text;
};
