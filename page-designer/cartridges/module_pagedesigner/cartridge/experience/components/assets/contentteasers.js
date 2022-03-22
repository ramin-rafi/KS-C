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

    model.content_headline = content.content_headline;
    
    if (content.portraitView) {
        model.portraitView = content.portraitView;
    }

    // The details of teaser 1
    model.url1 = content.url1;
    if (content.brand1) {
        model.url1 = model.url1 + '?prefn1=brand&prefv1='+ content.brand1;
    }

    model.text_headline1 = content.text_headline1;

    if (content.text_subline1) {
        model.text_subline1 = content.text_subline1;
    }

    if (content.image1) {
        model.image1 = {
            src: {
                mobile  : ImageTransformation.url(content.image1, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image1, { device: 'desktop' })
            },
            alt         : content.image1.file.getAlt(),
            focalPointX : content.image1.focalPoint.x * 100 + '%',
            focalPointY : content.image1.focalPoint.y * 100 + '%'
        };
    }

    // The details of teaser 2
    model.url2 = content.url2;
    if (content.brand2) {
        model.url2 = model.url2 + '?prefn1=brand&prefv1='+ content.brand2;
    }

    model.text_headline2 = content.text_headline2;

    if (content.text_subline2) {
        model.text_subline2 = content.text_subline2;
    }

    if (content.image2) {
        model.image2 = {
            src: {
                mobile  : ImageTransformation.url(content.image2, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image2, { device: 'desktop' })
            },
            alt         : content.image2.file.getAlt(),
            focalPointX : content.image2.focalPoint.x * 100 + '%',
            focalPointY : content.image2.focalPoint.y * 100 + '%'
        };
    }

    // The details of teaser 3
    model.url3 = content.url3;
    if (content.brand3) {
        model.url3 = model.url3 + '?prefn1=brand&prefv1='+ content.brand3;
    }

    model.text_headline3 = content.text_headline3;

    if (content.text_subline3) {
        model.text_subline3 = content.text_subline3;
    }

    if (content.image3) {
        model.image3 = {
            src: {
                mobile  : ImageTransformation.url(content.image3, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image3, { device: 'desktop' })
            },
            alt         : content.image3.file.getAlt(),
            focalPointX : content.image3.focalPoint.x * 100 + '%',
            focalPointY : content.image3.focalPoint.y * 100 + '%'
        };
    }

    // The details of teaser 4
    model.url4 = content.url4;
    if (content.brand4) {
        model.url4 = model.url4 + '?prefn1=brand&prefv1='+ content.brand4;
    }

    model.text_headline4 = content.text_headline4;

    if (content.text_subline4) {
        model.text_subline4 = content.text_subline4;
    }

    if (content.image4) {
        model.image4 = {
            src: {
                mobile  : ImageTransformation.url(content.image4, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.image4, { device: 'desktop' })
            },
            alt         : content.image4.file.getAlt(),
            focalPointX : content.image4.focalPoint.x * 100 + '%',
            focalPointY : content.image4.focalPoint.y * 100 + '%'
        };
    }

    return new Template('experience/components/assets/contentteasers').render(model).text;
};
