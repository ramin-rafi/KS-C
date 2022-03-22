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

    if (content.rowGridAlign) {
        model.rowGridAlign = content.rowGridAlign;
    }

    if(content.rowGridCol){
        model.rowGridCol = content.rowGridCol;
    }

    if (content.smRowGridCol) {
        model.smRowGridCol = content.smRowGridCol;
    }

    if (content.mdRowGridCol) {
        model.mdRowGridCol = content.mdRowGridCol;
    }

    return new Template('experience/components/layouts/rowGrid').render(model).text;
};