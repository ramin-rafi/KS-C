'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.contenttile.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    // The details of teaser 1
    if (content.url1) {
        model.url1 = content.url1;
    }

    if (content.addContainer) {
        model.addContainer = content.addContainer;
    }

    if (content.customOpacity) {
        model.customOpacity = content.customOpacity;
    }

    if (content.brand1) {
        model.url1 = model.url1 + '?prefn1=brand&prefv1='+ content.brand1;
    }

    if (content.text_headline1) {
        model.text_headline1 = content.text_headline1;
    }

    if (content.text_subline1) {
        model.text_subline1 = content.text_subline1;
    }

    if (content.text_link1) {
        model.text_link1 = content.text_link1;
    }

    if (content.font_option1) {
        model.font_option1 = content.font_option1;
    }

    if (content.font_color1) {
        model.font_color1 = content.font_color1;
    }

    if (content.image1) {
        model.image1 = {
            src: {
                desktop : ImageTransformation.url(content.image1, { device: 'desktop' })
            },
            alt         : content.image1.file.getAlt(),
            focalPointX : content.image1.focalPoint.x * 100 + '%',
            focalPointY : content.image1.focalPoint.y * 100 + '%'
        };
    }
    if (content.mblimage1) {
        model.mblimage1 = {
            src: {
                mobile  : ImageTransformation.url(content.mblimage1, { device: 'mobile' })
            },
            alt         : content.image1.file.getAlt(),
            focalPointX : content.image1.focalPoint.x * 100 + '%',
            focalPointY : content.image1.focalPoint.y * 100 + '%'
        };
    }

    // The details of teaser 2
    if (content.url2) {
        model.url2 = content.url2;
    }

    if (content.brand2) {
        model.url2 = model.url2 + '?prefn1=brand&prefv1='+ content.brand2;
    }

    if (content.text_headline2) {
        model.text_headline2 = content.text_headline2;
    }

    if (content.text_subline2) {
        model.text_subline2 = content.text_subline2;
    }

    if (content.text_link2) {
        model.text_link2 = content.text_link2;
    }
    
    if (content.font_option2) {
        model.font_option2 = content.font_option2;
    }

    if (content.font_color2) {
        model.font_color2 = content.font_color2;
    }

    if (content.image2) {
        model.image2 = {
            src: {
                desktop : ImageTransformation.url(content.image2, { device: 'desktop' })
            },
            alt         : content.image2.file.getAlt(),
            focalPointX : content.image2.focalPoint.x * 100 + '%',
            focalPointY : content.image2.focalPoint.y * 100 + '%'
        };
    }
    if (content.mblimage2) {
        model.mblimage2 = {
            src: {
                mobile  : ImageTransformation.url(content.mblimage2, { device: 'mobile' })
            },
            alt         : content.image2.file.getAlt(),
            focalPointX : content.image2.focalPoint.x * 100 + '%',
            focalPointY : content.image2.focalPoint.y * 100 + '%'
        };
    }

    if (content.container_id) {
        model.container_id = content.container_id;
    }

    return new Template('experience/components/assets/doubleteaser').render(model).text;
};
