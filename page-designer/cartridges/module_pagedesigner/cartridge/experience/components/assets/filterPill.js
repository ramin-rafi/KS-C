'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;
    var content = context.content;

    if (content.addClass) {
        model.addClass = content.addClass;
    }
    if (content.addFilter) {
        model.addFilter = content.addFilter.toLowerCase().trim();
    }
    if (content.filterText) {
        model.filterText = content.filterText;
    }

    return new Template('experience/components/assets/filterPill').render(model).text;
};