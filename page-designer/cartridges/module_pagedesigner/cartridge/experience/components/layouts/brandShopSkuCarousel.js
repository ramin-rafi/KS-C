'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the assets.einsteinproductrecommendation.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    var category = content.category;

    if (content.title) {
        model.title = content.title;
    }

    if (content.titleClickable) {
        model.titleClickable = content.titleClickable;
    }

    if (content.titleAlignment) {
        model.titleAlignment = content.titleAlignment;
    }

    model.prodLimit = parseInt(content.prodLimit);

    model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'plp', true);
    model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit);

    if (content.isSale) {
        if (content.color && content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'isSale', 'prefv3', content.isSale, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'isSale', 'prefv3', content.isSale);
        } else if (content.color) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'isSale', 'prefv2', content.isSale, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'isSale', 'prefv2', content.isSale);
        } else if (content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'isSale', 'prefv2', content.isSale, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'isSale', 'prefv2', content.isSale);
        }
    } else if (content.showInNewArrival) {
        if (content.color && content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'showInNewArrival', 'prefv3', content.showInNewArrival, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'showInNewArrival', 'prefv3', content.showInNewArrival);
        } else if (content.color) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'showInNewArrival', 'prefv2', content.showInNewArrival, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'showInNewArrival', 'prefv2', content.showInNewArrival);
        } else if (content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'showInNewArrival', 'prefv2', content.showInNewArrival, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'showInNewArrival', 'prefv2', content.showInNewArrival);
        }
    } else {
        if (content.color && content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color);
        } else if (content.color) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color);
        } else if (content.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'plp', true);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand);
        }
    }

    return new Template('experience/components/layouts/brandShopSkuCarousel').render(model).text;
};
