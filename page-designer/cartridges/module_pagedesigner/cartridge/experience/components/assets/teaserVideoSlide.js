'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.url = content.url;

    model.width = content.width;

    model.height = content.height;

    if (content.teaser_text) {
        model.teaser_text = content.teaser_text;
    }

    return new Template('experience/components/assets/teaserVideoSlide').render(model).text;
};
