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

    model.productID = content.product.getID();

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
                mobile: ImageTransformation.url(content.imagemobile, {device: 'mobile'}),
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.imagemobile.focalPoint.x * 100 + '%',
            focalPointY : content.imagemobile.focalPoint.y * 100 + '%'
        };
        model.alt_mobile =  content.alt_mobile
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

    if (content.text_headline1) {
        model.text_headline1 = content.text_headline1;
    }

    if (content.text_headline2) {
        model.text_headline2 = content.text_headline2;
    }

    if (content.text_subline) {
        model.text_subline = content.text_subline;
    }

    if (content.customOpacity) {
        model.customOpacity = content.customOpacity;
    }
    
    if (content.SlideColor) {
        model.SlideColor = content.SlideColor;
    }

    if (content.isBeautyProduct === 'yes') {
        var tileType = JSON.parse(Site.getCurrent().getCustomPreferenceValue('storefrontConfigs'));
        tileType = tileType && tileType.productTileType && tileType.productTileType['master_beauty'] ? tileType.productTileType['master_beauty'] : false;
        if (tileType) {
            model.tileType = tileType;
        }
    }

    return new Template('experience/components/assets/spotlightHeroProduct').render(model).text;
};
