'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for richtext component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.htmlclass) {
        model.htmlclass = content.htmlclass;
    }

    if (content.heading) {
        model.heading = content.heading;
    }

    if (content.subHeading) {
        model.subHeading = content.subHeading;
    }

    if (content.addContentAsset) {
        model.addContentAsset = content.addContentAsset;
    }

    if (content.addToCalenderText) {
        model.addToCalenderText = content.addToCalenderText;
    }

    if (content.afterSuccessText) {
        model.afterSuccessText = content.afterSuccessText;
    }

    if (content.gmailText) {
        model.gmailText = content.gmailText;
    }

    if (content.outlookText) {
        model.outlookText = content.outlookText;
    }

    if (content.outlookFileName) {
        model.outlookFileName = content.outlookFileName;
    }

    if (content.iCalText) {
        model.iCalText = content.iCalText;
    }

    if (content.appleFileName) {
        model.appleFileName = content.appleFileName;
    }

    return new Template('experience/components/assets/calendarSmallTeaser').render(model).text;
};
