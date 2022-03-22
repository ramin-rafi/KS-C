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

    model.logoVersion = content.logoVersion;

    if (content.backgroundHexColor) {
        model.backgroundHexColor = content.backgroundHexColor;
    }

    if (content.lineFrameHexColor) {
        model.lineFrameHexColor = content.lineFrameHexColor;
    }

    if (content.brand && content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID(),'prefn1','brand','prefv1', content.brand).toString();
    } else if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID()).toString();
    }

    if (content.logo) {
        model.logo = {
            src: {
                mobile  : ImageTransformation.url(content.logo, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.logo, { device: 'desktop' })
            },
            alt         : content.logo.file.getAlt(),
            focalPointX : content.logo.focalPoint.x * 100 + '%',
            focalPointY : content.logo.focalPoint.y * 100 + '%'
        };
    }

    if (content.logoDesktopAlignment) {
        model.logoDesktopAlignment = content.logoDesktopAlignment;
    }

    if (content.logoMobileAlignment) {
        model.logoMobileAlignment = content.logoMobileAlignment;
    }

    return new Template('experience/components/assets/brandLogoHeader').render(model).text;
};
