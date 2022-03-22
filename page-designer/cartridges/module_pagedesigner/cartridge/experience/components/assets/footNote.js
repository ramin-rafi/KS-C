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

    if (content.ctaOrder) {
        model.ctaOrder = content.ctaOrder;
    }

    if (content.noteBg) {
        model.noteBg = content.noteBg;
    }

    if (content.noteTextColor) {
        model.noteTextColor = content.noteTextColor;
    }

    if (content.noteTextAlign) {
        model.noteTextAlign = content.noteTextAlign;
    }

    if (content.noteDescription) {
        model.noteDescription = content.noteDescription;
    }

    if (content.ctaShowMore) {
        model.ctaShowMore = content.ctaShowMore;
    }

    if (content.ctaShowLess) {
        model.ctaShowLess = content.ctaShowLess;
    }

    return new Template('experience/components/assets/footNote').render(model).text;
};
