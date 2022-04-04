'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.carousel.
 */
module.exports.render = function(context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.teaserLayoutPadY) {
        model.teaserLayoutPadY = content.teaserLayoutPadY;
    }

    if (content.LayoutHeading) {
        model.LayoutHeading = content.LayoutHeading;
    }

    if (content.HeadingAlignment) {
        model.HeadingAlignment = content.HeadingAlignment;
    }

    if (content.teaserLayoutConfig) {
        model.teaserLayoutConfig = content.teaserLayoutConfig;
    }

    return new Template('experience/components/layouts/sliderLayout').render(model).text;
};