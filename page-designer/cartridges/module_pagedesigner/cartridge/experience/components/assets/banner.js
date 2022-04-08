'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.BannerTextColor) {
        model.BannerTextColor = content.BannerTextColor;
    }

    if (content.BannerTextAlign) {
        model.BannerTextAlign = content.BannerTextAlign;
    }

    if (content.addPadding) {
        model.addPadding = content.addPadding;
    }

    if (content.BannerCtaLink) {
        model.BannerCtaLink = content.BannerCtaLink;
    }

    if (content.BannerCtaLabel) {
        model.BannerCtaLabel= content.BannerCtaLabel;
    }

    if (content.BannerCtaLink2) {
        model.BannerCtaLink2 = content.BannerCtaLink2;
    }

    if (content.BannerCtaLabel2) {
        model.BannerCtaLabel2= content.BannerCtaLabel2;
    }

    if (content.BannerCtaLink3) {
        model.BannerCtaLink3 = content.BannerCtaLink3;
    }

    if (content.BannerCtaLabel3) {
        model.BannerCtaLabel3= content.BannerCtaLabel3;
    }

    if (content.BannerCtaLink4) {
        model.BannerCtaLink4 = content.BannerCtaLink4;
    }

    if (content.BannerCtaLabel4) {
        model.BannerCtaLabel4= content.BannerCtaLabel4;
    }

    if (content.BannerHeading) {
        model.BannerHeading = content.BannerHeading;
    }

    if (content.BannerParagraph) {
        model.BannerParagraph = content.BannerParagraph;
    }

    if (content.BannerCtaStyle) {
        model.BannertaStyle = content.BannerCtaStyle;
    }

    return new Template('experience/components/assets/banner').render(model).text;
};
