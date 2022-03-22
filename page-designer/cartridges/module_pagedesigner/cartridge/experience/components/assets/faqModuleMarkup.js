'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.details = content.details;

    return new Template('experience/components/assets/faqModuleMarkup').render(model).text;
};
