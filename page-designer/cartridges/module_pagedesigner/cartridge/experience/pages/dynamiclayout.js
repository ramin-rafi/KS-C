'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('~/cartridge/experience/utilities/PageRenderHelper.js');
var utilHelper = require('*/cartridge/scripts/helpers/utilHelper');

/**
 * Render logic for the dynamiclayout.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var page = context.page;
    model.page = page;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);

    // determine seo meta data
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);
    model.decorator = PageRenderHelper.determineDecorator(context);

    if (PageRenderHelper.isInEditMode()) {
        dw.system.HookMgr.callHook('app.experience.editmode', 'editmode');
    }

    var parameters = context.renderParameters ? JSON.parse(context.renderParameters) : false;
    if (parameters && parameters.brand) {
        var fontsForBrand = utilHelper.getFontsSpecificForBrandsPrefs();
        if (fontsForBrand) {
            model.fontForBrand = fontsForBrand[parameters.brand];
        }
    }

    // render the page
    var expiryTime = new Date(Date.now());
    expiryTime.setMinutes(expiryTime.getMinutes() + 60);
    response.setExpires(expiryTime);
    model.pageType = parameters && parameters.pageType ? parameters.pageType : null;
    if (model.pageType === 'PDP') {
        model.action = 'Product-Show';
    }

    if(parameters && parameters.category){
        if (parameters.category === "brandshopsbeauty") {
            model.cookieCat = "master_beauty";
        } else {
            model.cookieCat = parameters.category;
        }
    }

    return new Template('experience/pages/dynamiclayout').render(model).text;
};
