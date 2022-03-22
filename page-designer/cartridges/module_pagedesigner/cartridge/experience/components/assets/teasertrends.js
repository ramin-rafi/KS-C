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
	var categoryID = content.category.getID();

    model.title = content.title;
    if (content.heading) {
        model.heading = content.heading;
    }
    if (content.htmlclass) {
        model.htmlclass = content.htmlclass;
    }
    if (content.image1) {
        model.image1 = {
            src: {
                desktop : ImageTransformation.url(content.image1, { device: 'desktop' })
            },
            alt         : content.image1.file.getAlt(),
        };
    }
    model.brand1 = content.brand1;
    model.categoryLink1 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brand1).toString();

    if (content.image2) {
        model.image2 = {
            src: {
                desktop : ImageTransformation.url(content.image2, { device: 'desktop' })
            },
            alt         : content.image2.file.getAlt(),
        };
    }
    model.brand2 = content.brand2;
    model.categoryLink2 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brand2).toString();

    if (content.image3) {
        model.image3 = {
            src: {
                desktop : ImageTransformation.url(content.image3, { device: 'desktop' })
            },
            alt         : content.image3.file.getAlt(),
        };
    }
    model.brand3 = content.brand3;
    model.categoryLink3 = URLUtils.url('Search-Show', 'cgid', categoryID,'prefn1','brand','prefv1', content.brand3).toString();

    model.linktitle = content.linktitle;
    model.linkUrl = URLUtils.url('Search-Show','cgid', categoryID, 'prefn1', 'brand','prefv1', content.brand1 + "|" +content.brand2 + "|" +content.brand3).toString();
    return new Template('experience/components/assets/teasertrends').render(model).text;
};
