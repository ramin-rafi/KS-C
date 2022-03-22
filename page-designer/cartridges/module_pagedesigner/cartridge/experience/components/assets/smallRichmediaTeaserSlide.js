'use strict';

var Site = require('dw/system/Site');
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

    if (content.imagemobile) {
        model.imagemobile = {
            src: {
                mobile  : ImageTransformation.url(content.imagemobile, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.imagemobile, { device: 'desktop' })
            },
            alt         : content.imagemobile.file.getAlt(),
            focalPointX : content.imagemobile.focalPoint.x * 100 + '%',
            focalPointY : content.imagemobile.focalPoint.y * 100 + '%'
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

    return new Template('experience/components/assets/smallRichmediaTeaserSlide').render(model).text;
};
