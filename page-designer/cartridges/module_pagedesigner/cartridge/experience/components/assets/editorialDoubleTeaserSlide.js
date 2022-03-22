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

    // video details
    if (content.video_url) {
        model.video_url = content.video_url;
    }

    // text content details
    if (content.captionResizeLHS) {
        model.captionResizeLHS = content.captionResizeLHS;
    }
    if (content.captionResizeRHS) {
        model.captionResizeRHS = content.captionResizeRHS;
    }
    if (content.captionPositionLHS) {
        model.captionPositionLHS = content.captionPositionLHS;
    }
    if (content.captionPositionRHS) {
        model.captionPositionRHS = content.captionPositionRHS;
    }
    // color of slide content
    if (content.captionTextColor) {
        model.captionTextColor = content.captionTextColor;
    }
    if (content.captionTextColor2) {
        model.captionTextColor2 = content.captionTextColor2;
    }

    // text content details
    if (content.teaserCaptionLHS) {
        model.teaserCaptionLHS = content.teaserCaptionLHS;
    }
    if (content.teaserCaptionRHS) {
        model.teaserCaptionRHS = content.teaserCaptionRHS;
    }

    // alignment of content on slide
    if (content.captionTextAlign) {
        model.captionTextAlign = content.captionTextAlign;
    }
    if (content.captionTextAlign2) {
        model.captionTextAlign2 = content.captionTextAlign2;
    }

    return new Template('experience/components/assets/editorialDoubleTeaserSlide').render(model).text;
};
