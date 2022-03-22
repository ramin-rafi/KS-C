'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the assets.contentAssets.
 */
module.exports.render = function (context) {

    var model = new HashMap();
    var content = context.content;
    model.contentid = content.contentid;

    return new Template('experience/components/assets/topcategory').render(model).text;
};