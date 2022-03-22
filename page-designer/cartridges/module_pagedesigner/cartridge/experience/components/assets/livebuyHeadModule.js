'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the assets.contenttile.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.headline) {
        model.headline = content.headline;
    }
    if (content.subline) {
        model.subline = content.subline;
    }
    if (content.copy) {
        model.copy = content.copy;
    }
    if (content.spaceTop) {
        model.spaceTop = content.spaceTop;
    }

    return new Template('experience/components/assets/livebuyHeadModule').render(model).text;
};
