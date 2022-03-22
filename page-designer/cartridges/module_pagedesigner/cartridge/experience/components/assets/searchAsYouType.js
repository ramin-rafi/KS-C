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

    if (content.containerType) {
        model.containerType = content.containerType;
    }

    if (content.layoutPaddingY) {
        model.layoutPaddingY = content.layoutPaddingY;
    }

    if (content.headingLabel) {
        model.headingLabel = content.headingLabel;
    }

    if (content.headingAlign) {
        model.headingAlign = content.headingAlign;
    }

    if (content.searchPlaceholder) {
        model.searchPlaceholder = content.searchPlaceholder;
    }

    if (content.errorMessage) {
        model.errorMessage = content.errorMessage;
    }

    if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

    if (content.isIsotope) {
        model.isIsotope = content.isIsotope;
    }

    return new Template('experience/components/assets/searchAsYouType').render(model).text;
};
