"use strict";

var Site = require("dw/system/Site");
var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var URLUtils = require("dw/web/URLUtils");
var ImageTransformation = require("~/cartridge/experience/utilities/ImageTransformation.js");

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
	var model = new HashMap();
	var content = context.content;
	if (content.addClass) {
		model.addClass = content.addClass;
	}

	if (content.cardBg) {
		model.cardBg = content.cardBg;
	}

	if (content.cardTextColor) {
		model.cardTextColor = content.cardTextColor;
	}

	if (content.cardTextAlign) {
		model.cardTextAlign = content.cardTextAlign;
	}

	if (content.colPadding) {
		model.colPadding = content.colPadding;
	}

	if (content.cardImage) {
		model.cardImage = ImageTransformation.url(content.cardImage, {
			device: "desktop",
			teaser: null,
		});
	}

	if (content.cardImageLink) {
		model.cardImageLink = content.cardImageLink;
	}

	if (content.ctaImageLink) {
		model.ctaImageLink = content.ctaImageLink;
	}

	if (content.cardDescription) {
		model.cardDescription = content.cardDescription;
	}

	return new Template("experience/components/assets/cardImage").render(model)
		.text;
};
