"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

module.exports.render = function (context) {
	var model = new HashMap();
	var content = context.content;

	if (content.inputPlaceholder) {
		model.inputPlaceholder = content.inputPlaceholder;
	}

	if (content.errorMessage) {
		model.errorMessage = content.errorMessage;
	}

	if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

	return new Template("experience/components/assets/serviceSearch").render(
		model
	).text;
};
