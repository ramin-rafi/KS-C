'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.contentAssetId) {
        model.contentAssetId = content.contentAssetId;
    }

    return new Template('experience/components/assets/contentAsset').render(model).text;
};