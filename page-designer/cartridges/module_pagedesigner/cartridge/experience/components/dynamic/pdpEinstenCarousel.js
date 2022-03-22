'use strict';

/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the product detail component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var product = context.content.product;

    if (context.content.titleAlignment) {
        model.titleAlignment = context.content.titleAlignment;
    }

    model.product = product;
    return new Template('experience/components/dynamic/product/pdpEinstenCarousel').render(model).text;
};
