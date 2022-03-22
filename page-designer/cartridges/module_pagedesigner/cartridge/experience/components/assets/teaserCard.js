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

    if (content.teaserCardTextColor) {
        model.teaserCardTextColor = content.teaserCardTextColor;
    }

    if (content.teaserCardTextAlign) {
        model.teaserCardTextAlign = content.teaserCardTextAlign;
    }

    if (content.teaserCardHeading) {
        model.teaserCardHeading = content.teaserCardHeading;
    }

    if (content.teaserCardImage) {
        model.teaserCardImage = ImageTransformation.url(content.teaserCardImage, {
            device: 'desktop',
            teaser: null
        })
    }

    if (content.teaserCardImageAlt) {
        model.teaserCardImageAlt = content.teaserCardImageAlt;
    }

    if (content.teaserCardOverlay) {
        model.teaserCardOverlay = content.teaserCardOverlay;
    }

    if (content.teaserCardDescription) {
        model.teaserCardDescription = content.teaserCardDescription;
    }

    if (content.teaserCtaLink) {
        model.teaserCtaLink = content.teaserCtaLink;
    }

    if (content.teaserCtaLabel) {
        model.teaserCtaLabel = content.teaserCtaLabel;
    }

    if (content.teaserCtaStyle) {
        model.teaserCtaStyle = content.teaserCtaStyle;
    }

    if (content.teaserImageAsCta) {
        model.teaserImageAsCta = content.teaserImageAsCta;
    }

    if (content.teaserCardMagazineIframeURL) {
        model.teaserCardMagazineIframeURL = content.teaserCardMagazineIframeURL;
    }

    if (content.teaserCardMagazineTarget) {
        model.teaserCardMagazineTarget = content.teaserCardMagazineTarget;
    }

    if (content.teaserCardMagazineTargetName) {
        model.teaserCardMagazineTargetName = content.teaserCardMagazineTargetName;
    }

    return new Template('experience/components/assets/teaserCard').render(model).text;
};
