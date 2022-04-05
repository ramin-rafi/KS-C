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

    if (content.CardGridTextColor) {
        model.CardGridTextColor = content.CardGridTextColor;
    }

    if (content.CardGridTextAlign) {
        model.CardGridTextAlign = content.CardGridTextAlign;
    }

    if (content.addPadding) {
        model.addPadding = content.addPadding;
    }

    if (content.CardGridImage) {
        model.CardGridImage = ImageTransformation.url(content.CardGridImage, {
            device: 'desktop',
            teaser: null
        })
    }

    if (content.CardGridImageAlt) {
        model.CardGridImageAlt = content.CardGridImageAlt;
    }

    if (content.CardGridOverlay) {
        model.CardGridOverlay = content.CardGridOverlay;
    }

    if (content.CardGridCtaLink) {
        model.CardGridCtaLink = content.CardGridCtaLink;
    }

    if (content.CardGridCtaLabel) {
        model.CardGridCtaLabel = content.CardGridCtaLabel;
    }

    if (content.CardGridHeading) {
        model.CardGridHeading = content.CardGridHeading;
    }

    if (content.CardGridCtaStyle) {
        model.CardGridCtaStyle = content.CardGridCtaStyle;
    }

    return new Template('experience/components/assets/CardGrid').render(model).text;
};
