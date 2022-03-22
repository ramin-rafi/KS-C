'use strict';

/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var utilHelper = require('*/cartridge/scripts/helpers/utilHelper');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers.js');

/**
 * Render logic for the product detail component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var gaHelper = require('*/cartridge/scripts/helpers/gaHelper.js');
    var model = modelIn || new HashMap();

    var component = context.component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var product = context.content.product;

    var params = { pid: product.ID };
    var productHelperResult = productHelper.showProductPage(params, request.pageMetaData);
    var productType = productHelperResult.product.productType;

    var template;
    if (!productHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        template = new Template('error/notFound');
        template.setStatusCode(404);
        return template.render().text;
    }
        // While this would break if the template is specified at the product,
        // those where excluded in ProductHelper.getPageDesignerPage

    var primaryCategoryID = productHelperResult.product.primaryRootCategory;

    var logoConfig = utilHelper.getLogoConfigPrefs();
    if (logoConfig) {
        logoConfig = logoConfig[product.brand] ? logoConfig[product.brand] : false;
    }

    model.logoVersion = logoConfig && logoConfig.logoVersion ? logoConfig.logoVersion : null;

    if (logoConfig && logoConfig.backgroundHexColor) {
        model.backgroundHexColor = logoConfig.backgroundHexColor;
    }

    if (logoConfig && logoConfig.lineFrameHexColor) {
        model.lineFrameHexColor = logoConfig.lineFrameHexColor;
    }

    if (logoConfig && logoConfig.logoDesktopAlignment) {
        model.logoDesktopAlignment = logoConfig.logoDesktopAlignment;
    }

    if (logoConfig && logoConfig.logoMobileAlignment) {
        model.logoMobileAlignment = logoConfig.logoMobileAlignment;
    }

    if (product.brand) {
        var fontsForBrand = utilHelper.getFontsSpecificForBrandsPrefs();
        if (fontsForBrand) {
            model.fontForBrand = fontsForBrand[product.brand];
        }
    }

    var breadcrumbs = productHelperResult.breadcrumbs;
    if (product.brand && primaryCategoryID) {
        if (breadcrumbs && breadcrumbs.length > 1 && breadcrumbs[0].brandSpecificCategory === 'brandshopCategory' 
            && breadcrumbs[1].brandSpecificCategory === product.brand) {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', breadcrumbs[1].categoryID,'prefn1','brand','prefv1', product.brand).toString();
        } else {
            model.categoryUrl = URLUtils.url('Search-Show', 'cgid', primaryCategoryID,'prefn1','brand','prefv1', product.brand).toString();
        }
    } else if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', primaryCategoryID).toString();
    }

    if (logoConfig && logoConfig.image) {
        var img = URLUtils.staticURL(URLUtils.CONTEXT_LIBRARY, null, logoConfig.image);
        model.logo = {
            src: {
                mobile  : img,
                desktop : img
            }
        };
    }
    template = new Template('experience/components/dynamic/' + productHelperResult.template);
    model.product = productHelperResult.product;
    model.addToCartUrl = productHelperResult.addToCartUrl;
    model.resources = productHelperResult.resources;
    model.breadcrumbs = productHelperResult.breadcrumbs;
    model.canonicalUrl = productHelperResult.canonicalUrl;
    model.schemaData = productHelperResult.schemaData;
    model.action = 'Product-Show';
    model.queryString = 'pid=' + product.ID;
    productHelperResult.product.breadcrumbs = productHelperResult.breadcrumbs;
    model.gaProduct = gaHelper.gaProductDetailObject(productHelperResult.product);
    return template.render(model).text;
};
