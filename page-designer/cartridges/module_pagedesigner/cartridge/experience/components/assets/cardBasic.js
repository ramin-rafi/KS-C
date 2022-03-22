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

    if (content.cardBg) {
        model.cardBg = content.cardBg;
    }

    if (content.cardTextColor) {
        model.cardTextColor = content.cardTextColor;
    }

    if (content.cardTextAlign) {
        model.cardTextAlign = content.cardTextAlign;
    }

    if (content.colPadding) {
        model.colPadding = content.colPadding;
    }

    if (content.cardHeading) {
        model.cardHeading = content.cardHeading;
    }

    if (content.cardSubHeading) {
        model.cardSubHeading = content.cardSubHeading;
    }

    if (content.cardSubLine) {
        model.cardSubLine = content.cardSubLine;
    }

    if (content.cardImage) {
        model.cardImage = ImageTransformation.url(content.cardImage, {
            device: 'desktop',
            teaser: null
        })
    }

    if (content.cardImageAlt) {
        model.cardImageAlt = content.cardImageAlt;
    }

    if (content.cardImageLink) {
        model.cardImageLink = content.cardImageLink;
    }

    if (content.cardDescription) {
        model.cardDescription = content.cardDescription;
    }

    if (content.ctaLink) {
        model.ctaLink = content.ctaLink;
    }

    if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

    if (content.ctaDsiplay) {
        model.ctaDsiplay = content.ctaDsiplay;
    }

    if (content.ctaStyle) {
        model.ctaStyle = content.ctaStyle;
    }

    return new Template('experience/components/assets/cardBasic').render(model).text;
};
