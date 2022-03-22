'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
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

    if (content.text_headline) {
        model.text_headline = content.text_headline;
    }
    
    if (content.teaser_text) {
        model.teaser_text = content.teaser_text;
    }
    
    model.headline_copy_allignment = content.headline_copy_allignment;

    if (content.brand && content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID(),'prefn1','brand','prefv1', content.brand).toString();
    } else if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID()).toString();
    }

    if (!content.category && content.ctaLink) {
        model.categoryUrl = content.ctaLink;
    }

    if (content.text_link) {
        model.text_link = content.text_link;
    }

    if (content.sliderOption === "Yes") {
        model.sliderOption = "banner-slider";
    } else {
        model.sliderOption = "";
    }

    return new Template('experience/components/layouts/smallRichmediaTeaser').render(model).text;
};
