'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
	var categoryID = content.category.getID();

    model.title = content.title;

    model.brand = content.brandtile;
    model.categoryLink = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile).toString();

    model.brand1 = content.brandtile1;
    model.categoryLink1 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile1).toString();

    model.brand2 = content.brandtile2;
    model.categoryLink2 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile2).toString();

    model.brand3 = content.brandtile3;
    model.categoryLink3 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile3).toString();

    if (content.brandtile4) {
        model.brand4 = content.brandtile4;
        model.categoryLink4 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile4).toString();
    }

    if (content.brandtile5) {
        model.brand5 = content.brandtile5;
        model.categoryLink5 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile5).toString();
    }

    if (content.brandtile6) {
        model.brand6 = content.brandtile6;
        model.categoryLink6 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile6).toString();
    }

    if (content.brandtile7) {
        model.brand7 = content.brandtile7;
        model.categoryLink7 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brandtile7).toString();
    }

    return new Template('experience/components/assets/topbrands').render(model).text;
};
