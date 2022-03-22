'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.containerType) {
        model.containerType = content.containerType;
    }

    if (content.sectionPaddingY) {
        model.sectionPaddingY = content.sectionPaddingY;
    }

    return new Template('experience/components/assets/accordionHorizontalNav').render(model).text;
};
