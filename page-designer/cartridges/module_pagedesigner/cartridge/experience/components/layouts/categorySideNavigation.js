'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.carousel.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    if (content.brand) {
        model.brand = content.brand;
    }

    if (content.category) {
        model.category = content.category;
    }

    if (content.hideBrandName) {
        model.hideBrandName = content.hideBrandName;
    }

    if (content.showAllArticle) {
        model.showAllArticle = content.showAllArticle;
    }

    return new Template('experience/components/layouts/categorySideNavigation').render(model).text;
};
