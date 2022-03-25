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

    if (content.teaserLayoutConfig) {
        model.teaserLayoutConfig = content.teaserLayoutConfig;
    }

    if (content.teaserLayoutPadY) {
        model.teaserLayoutPadY = content.teaserLayoutPadY;
    }

    if (content.teaserLayoutCol) {
        model.teaserLayoutCol = content.teaserLayoutCol;
    }

    if (content.teaserLayoutHeading) {
        model.teaserLayoutHeading = content.teaserLayoutHeading;
    }

    if (content.teaserHeadingAlignment) {
        model.teaserHeadingAlignment = content.teaserHeadingAlignment;
    }

    if (content.teaserLayoutMagazine) {
        model.teaserLayoutMagazine = content.teaserLayoutMagazine;
    }

    if (content.teaserLayoutMagazineName) {
        model.teaserLayoutMagazineName = content.teaserLayoutMagazineName;
    }

    if (content.teaserLayoutMagazineDisclaimer) {
        model.teaserLayoutMagazineDisclaimer = content.teaserLayoutMagazineDisclaimer;
    }

    return new Template('experience/components/layouts/teaserLayout').render(model).text;
};