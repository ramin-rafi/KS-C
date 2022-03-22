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

    if (content.topline) {
        model.topline = content.topline;
    }

    if (content.headline) {
        model.headline = content.headline;
    }

    if (content.contentCopy) {
        model.contentCopy = content.contentCopy;
    }

    if (content.disclaimer) {
        model.disclaimer = content.disclaimer;
    }

    if (content.arrowColor) {
        model.arrowColor = content.arrowColor;
    }

    if (content.image) {
        model.image = {
            src: {
                mobile  : ImageTransformation.url(content.image, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.image.focalPoint.x * 100 + '%',
            focalPointY : content.image.focalPoint.y * 100 + '%'
        };
    }

    if (content.url) {
        model.url = content.url;
    }

    if (content.width) {
        model.width = content.width;
    }

    if (content.height) {
        model.height = content.height;
    }

    return new Template('experience/components/assets/richMediaGallerySlide').render(model).text;
};
