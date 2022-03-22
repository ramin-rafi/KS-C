"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
	var model = new HashMap();
	var content = context.content;

	if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.containerType) {
        model.containerType = content.containerType;
    }

    if (content.layoutPaddingY) {
        model.layoutPaddingY = content.layoutPaddingY;
    }

    if (content.headingLabel) {
        model.headingLabel = content.headingLabel;
    }

    if (content.headingAlign) {
        model.headingAlign = content.headingAlign;
    }

    if (content.searchPlaceholder) {
        model.searchPlaceholder = content.searchPlaceholder;
    }

    if (content.errorMessage) {
        model.errorMessage = content.errorMessage;
    }

	if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

	return new Template("experience/components/assets/faqSearch").render(model).text;
};
