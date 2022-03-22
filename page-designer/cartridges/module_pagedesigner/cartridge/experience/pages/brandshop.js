'use strict';
/* global request, response */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var utilHelper = require('*/cartridge/scripts/helpers/utilHelper');

/**
 * Render logic for the product detail page.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();
    var cookieCat;
    var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');

    var page = context.page;
    model.page = page;

    var parameters = context.renderParameters ? JSON.parse(context.renderParameters) : false;

    if (parameters && parameters.catID) {
        model.breadcrumbs = productHelpers.getAllBreadcrumbs(parameters.catID, null, []).reverse();

        cookieCat = productHelpers.getPrimaryRootCategory(null, CatalogMgr.getCategory(parameters.catID), false);
        if(cookieCat && cookieCat !== false){
            if(cookieCat === "brandshopsbeauty"){
                cookieCat = "master_beauty"
            }
            model.cookieCat = cookieCat;
        }
    }
    model.productSearch = {
        isCategorySearch: true,
        brandshopKeywordSearch: false // parameters.catID === 'root' ? true : false
    };
    if (parameters && parameters.brand) {
        model.brandForBSLP = parameters.brand;
        var fontsForBrand = utilHelper.getFontsSpecificForBrandsPrefs();
        if (fontsForBrand) {
            model.fontForBrand = fontsForBrand[parameters.brand];
        }
    }

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    // determine seo meta data
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);
    model.decorator = PageRenderHelper.determineDecorator(context);

    // call a hook and reset client side data when rendering inside the Page Designer
    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }

    var expires = new Date();
    expires.setDate(expires.getDate() + 1); // this handles overflow automatically
    response.setExpires(expires);
    model.pageType = 'Brand';

    // render the page
    return new Template('experience/pages/brandshop').render(model).text;
};
