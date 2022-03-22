'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

    return new Template('experience/components/assets/clickMeet').render(model).text;
};
