'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
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

    if (content.cardImage) {
        model.cardImage = ImageTransformation.url(content.cardImage, {
            device: 'desktop',
            teaser: null
        });
    }

    if (content.cardImageAlt) {
        model.cardImageAlt = content.cardImageAlt;
    }

    if (content.cardImageLink) {
        model.cardImageLink = content.cardImageLink;
    }

    if (content.cardContactDetail) {
        model.cardContactDetail = content.cardContactDetail;
    }

    if (content.cardFloorDetail) {
        model.cardFloorDetail = content.cardFloorDetail;
    }

    if (content.cardDescription) {
        model.cardDescription = content.cardDescription;
    }

    if (content.cardDescriptionContent) {
        model.cardDescriptionContent = content.cardDescriptionContent;
    }

    if (content.cardContentLimit) {
        model.cardContentLimit = content.cardContentLimit;
    }

    if (content.ctaLink) {
        model.ctaLink = content.ctaLink;
    }

    if (content.ctaTarget) {
        model.ctaTarget = content.ctaTarget;
    }

    if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

    if (content.ctaDisplay) {
        model.ctaDisplay = content.ctaDisplay;
    }

    if (content.ctaStyle) {
        model.ctaStyle = content.ctaStyle;
    }

    if (content.ctaMeetGreet) {
        model.ctaMeetGreet = content.ctaMeetGreet;
    }
    return new Template('experience/components/assets/serviceCard').render(model).text;
};
