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
    if (content.spaceTop) {
        model.spaceTop = content.spaceTop;
    }
    if (content.spaceBottom) {
        model.spaceBottom = content.spaceBottom;
    }
    model.teaser_option = content.teaser_option;
    if (content.sliderOption === "Yes") {
        model.sliderOption = "banner-slider";
    } else {
        model.sliderOption = "";
    }
    if (content.teaser_text) {
        model.teaser_text = content.teaser_text;
    }
    if (content.teaser_text_alignment) {
        model.teaser_text_alignment = content.teaser_text_alignment;
    }
    if (content.sliderType) {
        model.sliderType = content.sliderType;
    }
    if (content.teaserColor) {
        model.teaserColor = content.teaserColor;
    }

    return new Template('experience/components/layouts/teaser').render(model).text;
};
