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
    var imagesPref = null; //JSON.parse(Site.current.getCustomPreferenceValue('disConfiguration'));
    imagesPref = imagesPref ? imagesPref.teaser : null;
    var model = new HashMap();
    var content = context.content;

    if(content.text_headline1){
        model.text_headline1 = content.text_headline1;
    }
    if (content.customOpacity) {
        model.customOpacity = content.customOpacity;
    }

    if (content.text_headline2) {
        model.text_headline2 = content.text_headline2;
    }
    if (content.htmlclass) {
        model.htmlclass = content.htmlclass;
    }

    if (content.focusX) {
        model.focusX = content.focusX;
    }

    if (content.focusY) {
        model.focusY = content.focusY;
    }

    if (content.image) {
        model.image = {
            src: {
                desktop: ImageTransformation.url(content.image, {
                    device: 'desktop',
                    teaser: imagesPref
                })
            },
        };
        model.alt_desktop =  content.alt_desktop
    }

    if (content.mobileImage) {
        model.mobileImage = {
            src: {
                mobile: ImageTransformation.url(content.mobileImage, {
                    device: 'mobile',
                    teaser: imagesPref
                }),
            },
        };
        model.alt_mobile =  content.alt_mobile
    }

    model.SlideColor = content.SlideColor;
    model.headline_copy_allignment = content.headline_copy_allignment;

    if (content.text_link) {
        model.text_link = content.text_link;
    }

    if (content.categoryLink) {
        model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID()).toString();
        if (content.brand) {
            if (content.isSale) {
                model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID(), 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'isSale', 'prefv2', content.isSale).toString();
            } else if (content.showInNewArrival) {
                model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID(), 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'showInNewArrival', 'prefv2', content.showInNewArrival).toString();
            } else {
                model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID(), 'prefn1', 'brand', 'prefv1', content.brand).toString();
            }
        } else {
            if (content.isSale) {
                model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID(), 'prefn1', 'isSale', 'prefv1', content.isSale).toString();
            }
            if (content.showInNewArrival) {
                model.categoryLink = URLUtils.url('Search-Show', 'cgid', content.categoryLink.getID(), 'prefn1', 'showInNewArrival', 'prefv1', content.showInNewArrival).toString();
            }
        }
    } else if (content.ctaLink) {
        model.categoryLink = content.ctaLink;
    }

    if (content.htmlclass && content.htmlclass != "main-teaser") {
        return new Template('experience/components/assets/slimTeaserSlide').render(model).text;
    } else {
        return new Template('experience/components/assets/smallTeaserSlide').render(model).text;
    }
};
