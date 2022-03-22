'use strict';

/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
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

    var category = context.content.category;
    var prodLimit = parseInt(context.content.prodLimit);

    if (context.content.backgroundColour) {
        model.backgroundColour = context.content.backgroundColour;
    }

    model.title = context.content.title;
    if (context.content.titleAlignment) {
        model.titleAlignment = context.content.titleAlignment;
    }
    model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', prodLimit);
    if (product.brand) {
        model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', prodLimit, 'prefn1', 'brand', 'prefv1', product.brand);
        model.title = model.title.replace('|', product.brand);
    }
    return new Template('experience/components/dynamic/product/pdpBrandshopCarousel').render(model).text;
};
