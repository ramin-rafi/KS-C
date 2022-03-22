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
    if (content.headingPosition) {
        model.headingPosition = content.headingPosition;
    }

    // The details of teaser 1
    if (content.brand) {
        if(content.isExternalLink1 && (content.isExternalLink1 == true || content.isExternalLink1 == 'true')){
            model.category1url = content.category1;
        }
        else {
            model.category1url = content.category1+'?prefn1=brand&prefv1='+ content.brand;
        }
    } else {
        model.category1url = URLUtils.url('Search-Show', 'cgid', content.category1).toString();
    }

    /* if (content.category1) {
        if (content.brand) {
            if(content.isExternalLink1 && (content.isExternalLink1 == true || content.isExternalLink1 == 'true')){
                model.category1url = content.category1;
            } else {
                model.category1url = content.category1+'?prefn1=brand&prefv1='+ content.brand;
            }
        } else {
            model.category1url = content.category1;
        }
    } */

    if (content.category1) {
        model.category1 = content.category1;
    }

    if (content.isExternalLink1) {
        model.isExternalLink1 = content.isExternalLink1;
    }

    if (content.category1name) {
        model.category1name = content.category1name;
    }

    if (content.layout) {
        model.layout = content.layout;
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
    if (content.brand) {
        if(content.isExternalLink2 && (content.isExternalLink2 == true || content.isExternalLink2 == 'true')){
            model.category2url = content.category2;
        }
        else {
            model.category2url = content.category2+'?prefn1=brand&prefv1='+ content.brand;
        }
    } else {
        model.category2url = URLUtils.url('Search-Show', 'cgid', content.category2).toString();
    }

   /*  if (content.category2) {
        if (content.brand) {
            if(content.isExternalLink2 && (content.isExternalLink2 == true || content.isExternalLink2 == 'true')){
                model.category2url = content.category2;
            } else {
                model.category2url = content.category2+'?prefn1=brand&prefv1='+ content.brand;
            }
        } else {
            model.category2url = content.category2;
        }
    } */

    if (content.category2) {
        model.category2 = content.category2;
    }

    if (content.isExternalLink2) {
        model.isExternalLink2 = content.isExternalLink2;
    }
    if (content.category2name) {
        model.category2name = content.category2name;
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
    if (content.brand) {
        if(content.isExternalLink3 && (content.isExternalLink3 == true || content.isExternalLink3 == 'true')){
            model.category3url = content.category3;
        }
        else {
            model.category3url = content.category3+'?prefn1=brand&prefv1='+ content.brand;
        }
    } else {
        model.category3url = URLUtils.url('Search-Show', 'cgid', content.category3).toString();
    }

    /* if (content.category3) {
        if (content.brand) {
            if(content.isExternalLink3 && (content.isExternalLink3 == true || content.isExternalLink3 == 'true')){
                model.category3url = content.category3;
            } else {
                model.category3url = content.category3+'?prefn1=brand&prefv1='+ content.brand;
            }
        } else {
            model.category3url = content.category3;
        }
    } */

    if (content.category3) {
        model.category3 = content.category3;
    }

    if (content.isExternalLink3) {
        model.isExternalLink3 = content.isExternalLink3;
    }
    if (content.category3name) {
        model.category3name = content.category3name;
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

    return new Template('experience/components/assets/categoryteaser').render(model).text;
};
