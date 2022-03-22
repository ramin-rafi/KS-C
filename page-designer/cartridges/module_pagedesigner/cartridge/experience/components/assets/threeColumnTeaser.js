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

    if (content.teaserConfig) {
        model.teaserConfig = content.teaserConfig;
    }
    if (content.customOpacity) {
        model.customOpacity = content.customOpacity;
    }

    if (content.teaserColumnCount) {
        model.teaserColumnCount = content.teaserColumnCount;
    }
    if (content.backgroundColour) {
        model.backgroundColour = content.backgroundColour;
    }

    var teaserArray = [];
    var count = parseInt(content.teaserColumnCount, 10);
    for (var i = 1; i <= count ; i++) {
        var teaserObject = {}
        if (content['title'+i]) {
            teaserObject['title'] = content['title'+i];
        }
        if (content['copy'+i]) {
            teaserObject['copy'] = content['copy'+i];
        }
        if (content['textColor'+i]) {
            teaserObject['textColor'] = content['textColor'+i];
        }
        if (content['url'+i]) {
            teaserObject['url'] = content['url'+i];
        }
        if (content["image"+i]) {
            teaserObject["image"] = {
                src: {
                    mobile  : ImageTransformation.url(content["image"+i], { device: 'mobile' }),
                    desktop : ImageTransformation.url(content["image"+i], { device: 'desktop' })
                },
                alt         : content["image"+i].file.getAlt(),
                focalPointX : content["image"+i].focalPoint.x * 100 + '%',
                focalPointY : content["image"+i].focalPoint.y * 100 + '%'
            };
        }
        if (content["mobileImage"+i]) {
            teaserObject["mobileImage"] = {
                src: {
                    mobile  : ImageTransformation.url(content["mobileImage"+i], { device: 'mobile' }),
                    desktop : ImageTransformation.url(content["mobileImage"+i], { device: 'desktop' })
                },
                alt         : content["mobileImage"+i].file.getAlt(),
                focalPointX : content["mobileImage"+i].focalPoint.x * 100 + '%',
                focalPointY : content["mobileImage"+i].focalPoint.y * 100 + '%'
            };
        }
        teaserArray.push(teaserObject);
    }
    model.teaserArray = teaserArray;

    return new Template('experience/components/assets/threeColumnTeaser').render(model).text;
};
