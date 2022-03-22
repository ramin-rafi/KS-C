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

    if (content.headline) {
        model.headline = content.headline;
    }
    if (content.headingPosition) {
        model.headingPosition = content.headingPosition;
    }
    if (content.backgroundColour) {
        model.backgroundColour = content.backgroundColour;
    }

    var teaserArray = [];
    for (var i = 1; i <= 3 ; i++) {
        var teaserObject = {}
        if (content['title'+i]) {
            teaserObject['title'] = content['title'+i];
        }
        if (content['contentCopy'+i]) {
            teaserObject['contentCopy'] = content['contentCopy'+i];
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
        teaserArray.push(teaserObject);
    }
    model.teaserArray = teaserArray;

    return new Template('experience/components/assets/trippleTeaser').render(model).text;
};
