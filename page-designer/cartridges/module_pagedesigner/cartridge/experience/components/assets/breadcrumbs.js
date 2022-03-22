"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");
var PageRenderHelper = require("~/cartridge/experience/utilities/PageRenderHelper.js");

module.exports.render = function (context) {
	var model = new HashMap();
	var component = context.component;
	var content = context.content;
	var breadcrumbArray = [];

	// automatically register configured regions
	model.regions = PageRenderHelper.getRegionModelRegistry(component);

	if (content.layoutType) {
		model.layoutType = content.layoutType;
	}

	if (content.breadcrumb1) {
		if (content.breadcrumb1_link) {
			breadcrumbArray.push({
				name: content.breadcrumb1,
				link: content.breadcrumb1_link,
			});
		} else {
			breadcrumbArray.push({
				name: content.breadcrumb1,
				link: null,
			});
		}
	}

	if (content.breadcrumb2) {
		if (content.breadcrumb2_link) {
			breadcrumbArray.push({
				name: content.breadcrumb2,
				link: content.breadcrumb2_link,
			});
		} else {
			breadcrumbArray.push({
				name: content.breadcrumb2,
				link: null,
			});
		}
	}

	if (content.breadcrumb3) {
		if (content.breadcrumb3_link) {
			breadcrumbArray.push({
				name: content.breadcrumb3,
				link: content.breadcrumb3_link,
			});
		} else {
			breadcrumbArray.push({
				name: content.breadcrumb3,
				link: null,
			});
		}
	}

	if (content.breadcrumb4) {
		if (content.breadcrumb4_link) {
			breadcrumbArray.push({
				name: content.breadcrumb4,
				link: content.breadcrumb4_link,
			});
		} else {
			breadcrumbArray.push({
				name: content.breadcrumb4,
				link: null,
			});
		}
	}

	if (breadcrumbArray.length > 0) {
		model.breadcrumbs = breadcrumbArray;
	} else {
		model.breadcrumbs = null;
	}

	return new Template("experience/components/assets/breadcrumbs").render(model)
		.text;
};
