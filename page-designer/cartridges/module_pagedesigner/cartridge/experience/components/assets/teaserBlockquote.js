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

    if (content.teaserBlockquoteConfig) {
        model.teaserBlockquoteConfig = content.teaserBlockquoteConfig;
    }

    if (content.teaserBlockquotePadY) {
        model.teaserBlockquotePadY = content.teaserBlockquotePadY;
    }

    if (content.teaserLayoutBlockquote) {
        model.teaserLayoutBlockquote = content.teaserLayoutBlockquote;
    }

    if (content.teaserBlockquoteAlignment) {
        model.teaserBlockquoteAlignment = content.teaserBlockquoteAlignment;
    }

    if (content.teaserLayoutBlockquoteFooter) {
        model.teaserLayoutBlockquoteFooter = content.teaserLayoutBlockquoteFooter;
    }

    if (content.teaserBlockquoteFooterAlignment) {
        model.teaserBlockquoteFooterAlignment = content.teaserBlockquoteFooterAlignment;
    }

    return new Template('experience/components/assets/teaserBlockquote').render(model).text;
};
