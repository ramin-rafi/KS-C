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
    if (content.sliderOption === "Yes") {
        model.sliderOption = "banner-slider";
    } else {
        model.sliderOption = "";
    }

    if (content.headline) {
        model.headline = content.headline;
    }

    if (content.backroudColour) {
        model.backroudColour = content.backroudColour;
    }

    return new Template('experience/components/layouts/richMediaGallery').render(model).text;
};
