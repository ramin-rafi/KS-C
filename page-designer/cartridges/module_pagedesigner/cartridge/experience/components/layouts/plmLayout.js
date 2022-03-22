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

    if (content.plmLayoutConfig) {
        model.plmLayoutConfig = content.plmLayoutConfig;
    }

    if (content.plmLayoutPadY) {
        model.plmLayoutPadY = content.plmLayoutPadY;
    }

    if (content.plmLayoutCol) {
        model.plmLayoutCol = content.plmLayoutCol;
    }

    if (content.plmLayoutHeading) {
        model.plmLayoutHeading = content.plmLayoutHeading;
    }

    if (content.plmHeadingAlignment) {
        model.plmHeadingAlignment = content.plmHeadingAlignment;
    }

    return new Template('experience/components/layouts/plmLayout').render(model).text;
};