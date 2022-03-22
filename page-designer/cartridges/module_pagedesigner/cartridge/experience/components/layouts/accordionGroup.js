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

    if (content.groupName) {
        model.groupName = content.groupName;
    }

    if(content.groupHeading){
        model.groupHeading = content.groupHeading;
    }

    if(content.colPadding){
        model.colPadding = content.colPadding;
    }

    return new Template('experience/components/layouts/accordionGroup').render(model).text;
};