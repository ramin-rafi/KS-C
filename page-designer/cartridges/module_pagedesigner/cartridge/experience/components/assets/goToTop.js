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

    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.btnLabel) {
        model.btnLabel = content.btnLabel;
    }

    return new Template('experience/components/assets/goToTop').render(model).text;
};
