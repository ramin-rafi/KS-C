'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/*
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

    if (content.containerType) {
        model.containerType = content.containerType;
    }

    if (content.sectionBg) {
        model.sectionBg = content.sectionBg;
    }

    if (content.sectionPaddingY) {
        model.sectionPaddingY = content.sectionPaddingY;
    }

    return new Template('experience/components/layouts/pageSection').render(model).text;
};
