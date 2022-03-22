'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.title = content.title;
    model.details = content.details;
    model.moredetails = content.moredetails;
    model.lessShowCount = parseInt(content.lessShowCount, 10);

    return new Template('experience/components/assets/seodetails').render(model).text;
};
