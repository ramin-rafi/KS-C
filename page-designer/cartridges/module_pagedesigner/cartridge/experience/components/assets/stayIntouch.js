'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for richtext component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.heading) {
        model.heading = content.heading;
    }

    if (content.subHeading) {
        model.subHeading = content.subHeading;
    }

    if (content.linkText) {
        model.linkText = content.linkText;
    }

    if (content.htmlclass) {
        model.htmlclass = content.htmlclass;
    }

    if (content.newsLetterLink) {
        model.newsLetterLink = content.newsLetterLink;
    }

    return new Template('experience/components/assets/stayInTouch').render(model).text;
};
