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

    if (content.title) {
        model.title = content.title;
    }

    if (content.titleClickable) {
        model.titleClickable = content.titleClickable;
    }

    if (content.text_link) {
        model.text_link = content.text_link;
    }

    if (content.teaser_text) {
        model.teaser_text = content.teaser_text;
    }

    if (content.disclaimer) {
        model.disclaimer = content.disclaimer;
    }

    if (content.brand && content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID(),'prefn1','brand','prefv1', content.brand).toString();
    } else if (content.category) {
        model.categoryUrl = URLUtils.url('Search-Show', 'cgid', content.category.getID()).toString();
    }

    if (!content.category && content.ctaLink) {
        model.categoryUrl = content.ctaLink;
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

    return new Template('experience/components/assets/bigRichmediaContent').render(model).text;
};
