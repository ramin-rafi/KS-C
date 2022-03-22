'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

function getFiltersString(commaFilters) {
    var filtersArr = commaFilters.split(',');
    var filters = '';
    for (var a = 0; a < filtersArr.length; a++){
        filters += (filtersArr[a].toLowerCase().trim() + ' ');
    }
    return filters;
}

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.cardTextAlign) {
        model.cardTextAlign = content.cardTextAlign;
    }

    if (content.cardHeading) {
        model.cardHeading = content.cardHeading;
    }

    if (content.cardImage) {
        model.cardImage = ImageTransformation.url(content.cardImage, {
            device: 'desktop',
            teaser: null
        });
    }

    if (content.cardImageAlt) {
        model.cardImageAlt = content.cardImageAlt;
    }

    if (content.cardImageLink) {
        model.cardImageLink = content.cardImageLink;
    }

    if (content.cardPrice) {
        model.cardPrice = content.cardPrice;
    }

    if (content.cardContactDetail) {
        model.cardContactDetail = content.cardContactDetail;
    }

    if (content.cardFilters) {
        var filters = getFiltersString(content.cardFilters);
        model.cardFilters = filters;
    }

    if (content.cardDescriptionContent) {
        model.cardDescriptionContent = content.cardDescriptionContent;
    }

    if (content.cardAccordionTitle) {
        model.cardAccordionTitle = content.cardAccordionTitle;
    }

    if (content.idHash) {
        model.idHash = content.idHash;
    }

    if (content.cardAccordionDesc) {
        model.cardAccordionDesc = content.cardAccordionDesc;
    }

    if (content.ctaLink) {
        model.ctaLink = content.ctaLink;
    }

    if (content.ctaTarget) {
        model.ctaTarget = content.ctaTarget;
    }

    if (content.ctaLabel) {
        model.ctaLabel = content.ctaLabel;
    }

    if (content.ctaStyle) {
        model.ctaStyle = content.ctaStyle;
    }

    if (content.cta2Link) {
        model.cta2Link = content.cta2Link;
    }

    if (content.cta2Target) {
        model.cta2Target = content.cta2Target;
    }

    if (content.cta2Label) {
        model.cta2Label = content.cta2Label;
    }

    if (content.cta2Style) {
        model.cta2Style = content.cta2Style;
    }

    return new Template('experience/components/assets/prassenCard').render(model).text;
};
