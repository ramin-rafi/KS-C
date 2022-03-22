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
    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.teaserLayoutPadY) {
        model.teaserLayoutPadY = content.teaserLayoutPadY;
    }

    if (content.teaserConfig) {
        model.teaserConfig = content.teaserConfig;
    }

    if (content.teaserCapConfig) {
        model.teaserCapConfig = content.teaserCapConfig;
    }

    // if (content.sliderOption === "Yes") {
    //     model.sliderOption = "banner-slider";
    // } else {
    //     model.sliderOption = "";
    // }

    if (content.teaserLayoutConfig) {
        model.teaserLayoutConfig = content.teaserLayoutConfig;
    }

    if (content.teaserColor) {
        model.teaserColor = content.teaserColor;
    }
    if (content.addtransparency) {
        model.addtransparency = content.addtransparency;
    }
    
    if (content.indicatorConfig) {
        model.indicatorConfig = content.indicatorConfig;
    }

    if (content.navigationConfig) {
        model.navigationConfig = content.navigationConfig;
    }

    if (content.autoPlayConfig) {
        model.autoPlayConfig = content.autoPlayConfig;
    }

    if (content.opacityOverlayConfig) {
        model.opacityOverlayConfig = content.opacityOverlayConfig;
    }

    return new Template('experience/components/layouts/editorialTeaser').render(model).text;
};
