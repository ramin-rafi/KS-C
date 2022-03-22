'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.contenttile.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.headline) {
        model.headline = content.headline;
    }
    if (content.subline) {
        model.subline = content.subline;
    }
    if (content.liveNowText) {
        model.liveNowText = content.liveNowText;
    }
    if (content.liveNowColor) {
        model.liveNowColor = content.liveNowColor;
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
    if (content.playLogoColor) {
        model.playLogoColor = content.playLogoColor;
    }

    return new Template('experience/components/assets/livebuySlotModule').render(model).text;
};
