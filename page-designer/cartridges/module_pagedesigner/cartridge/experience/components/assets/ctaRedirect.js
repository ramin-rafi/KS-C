'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    if (content.ctaImage) {
        model.ctaImage = ImageTransformation.url(content.ctaImage, {
            device: 'desktop',
            teaser: null
        })
    }

    if (content.imageAlt) {
        model.imageAlt = content.imageAlt;
    }

    if (content.ctaLink) {
        model.ctaLink = content.ctaLink;
    }

    if (content.ctaOverlay) {
        model.ctaOverlay = content.ctaOverlay;
    }

    return new Template('experience/components/assets/ctaRedirect').render(model).text;
};