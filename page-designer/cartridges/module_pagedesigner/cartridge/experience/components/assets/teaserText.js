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

    if (content.contentLayout) {
        model.contentLayout = content.contentLayout;
    }

    if (content.textAlign) {
        model.textAlign = content.textAlign;
    }

    if (content.cardHeading) {
        model.cardHeading = content.cardHeading;
    }

    if (content.cardContent) {
        model.cardContent = content.cardContent;
    }

    if (content.teaserCtaLabel) {
        model.teaserCtaLabel = content.teaserCtaLabel;
    }

    if (content.teaserCtaLink) {
        model.teaserCtaLink = content.teaserCtaLink;
    }

    return new Template('experience/components/assets/teaserText').render(model).text;
};
