'use strict';

/* global request */

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var utilHelper = require('*/cartridge/scripts/helpers/utilHelper');

/**
 * Render logic for the product list component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @param {dw.util.Map} [modelIn] Additional model values created by another cartridge. This will not be passed in by Commcerce Cloud Plattform.
 *
 * @returns {string} The markup to be displayed
 */
module.exports.render = function (context, modelIn) {
    var model = modelIn || new HashMap();

    var component = context.component;
    model.component = component;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    var content = context.content;
    model.categoryId = content.category.getID();

    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    var params = { cgid: model.categoryId };
    
    if (content.srule && content.srule.length > 0) {
        params.srule = content.srule.substr(content.srule.indexOf('(') + 1, content.srule.indexOf('(') + 1);
    }
    if (content.sz) {
        params.sz = content.sz;
    }
    if (content.size) {
        params.size = content.size;
    }
    if (content.brand) {
        params.preferences = {
            brand: content.brand
        };
    }
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, params);
    var sortingRule = params && params.srule ? params.srule : apiProductSearch.category.defaultSortingRule.ID;
    apiProductSearch.search();

    var productSearch = new ProductSearch(
        apiProductSearch,
        params,
        sortingRule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );
    model.productSearch = productSearch;
    model.apiProductSearch = apiProductSearch;
    model.moduleProductLimit = parseInt(params.sz, 10);
    model.brandForBSLP = searchHelper.checkBrandshopPage( {querystring: params} ).brandName;
    if (content.brand) {
        model.brand = content.brand;
        var fontsForBrand = utilHelper.getFontsSpecificForBrandsPrefs();
        if (fontsForBrand) {
            model.fontForBrand = fontsForBrand[content.brand];
        }
    }

    return new Template('experience/components/dynamic/productList/plmProductGrid.isml').render(model).text;
};
