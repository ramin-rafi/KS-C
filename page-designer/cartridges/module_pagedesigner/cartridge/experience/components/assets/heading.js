'use strict';

var Site = require('dw/system/Site');
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

    if (content.headingLevel) {
        model.headingLevel = content.headingLevel;
    }

    if (content.headingAlign) {
        model.headingAlign = content.headingAlign;
    }

    if (content.headingLabel) {
        model.headingLabel = content.headingLabel;
    }

    if (content.headingLabel2) {
        model.headingLabel2 = content.headingLabel2;
    }

    if (content.subHeadingLabel) {
        model.subHeadingLabel = content.subHeadingLabel;
    }

    return new Template('experience/components/assets/heading').render(model).text;
};
