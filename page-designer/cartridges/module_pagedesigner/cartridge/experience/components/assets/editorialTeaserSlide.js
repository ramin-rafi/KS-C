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

    if (content.addClass) {
        model.addClass = content.addClass;
    }

    // image details
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
        model.alt_mobile = content.alt_mobile;
    }

    // focus details
    if (content.focusX) {
        model.focusX = content.focusX;
    }
    if (content.focusY) {
        model.focusY = content.focusY;
    }

     // CTA content details
    if (content.captionResize) {
        model.captionResize = content.captionResize;
    }
     if (content.cta_text_1) {
        model.cta_text_1 = content.cta_text_1;
    }
    if (content.cta_link_1) {
        model.cta_link_1 = content.cta_link_1;
    }
    if (content.cta_text_2) {
        model.cta_text_2 = content.cta_text_2;
    }
    if (content.cta_link_2) {
        model.cta_link_2 = content.cta_link_2;
    }
    if (content.cta_text_3) {
        model.cta_text_3 = content.cta_text_3;
    }
    if (content.cta_link_3) {
        model.cta_link_3 = content.cta_link_3;
    }

    // video details
    if (content.video_url) {
        model.video_url = content.video_url;
    }

    // text content details
    if (content.teaserCaption) {
        model.teaserCaption = content.teaserCaption;
    }
   
    // color of slide content 
    if (content.captionTextColor) {
        model.captionTextColor = content.captionTextColor;
    }

    // alignment of content on slide
    if (content.captionTextAlign) {
        model.captionTextAlign = content.captionTextAlign;
    }

    //position of content on slide
    if (content.captionPosition) {
        model.captionPosition = content.captionPosition;
    }

    

    return new Template('experience/components/assets/editorialTeaserSlide').render(model).text;
};
