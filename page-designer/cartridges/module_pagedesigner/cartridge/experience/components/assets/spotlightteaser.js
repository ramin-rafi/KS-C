'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('~/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the assets.categorytile.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var category = content.category;
    /*
    * If no image url was provided, clicking the category tile will lead the user back to the home page.
    */
   var actualCategory = category;
   var CatalogMgr = require('dw/catalog/CatalogMgr');
   if (category && category.custom && category.custom.virtualOn) {
       category = CatalogMgr.getCategory(category.custom.virtualOn);
   }
    if (category) {
        model.category = category;
        model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
    } else {
        model.url = URLUtils.url('Home-Show');
    }

    model.headline = content.headline;

    if (content.alt_logo) {
        model.alt_logo = content.alt_logo;
    }

    if (content.customOpacity) {
        model.customOpacity = content.customOpacity;
    }

    model.prodLimit = parseInt(content.prodLimit);

    if (content.color) {
        model.color = content.color;
    }

    if (content.brand) {
        model.brand = content.brand;
    }

    if (content.SlideColor) {
        model.SlideColor = content.SlideColor;
    }

    if (content.backgroundColour) {
        model.backgroundColour = content.backgroundColour;
    }

    if (content.text_link) {
        model.text_link = content.text_link;
    }
    
    if (content.image) {
        model.image = {
            src: {
                desktop : ImageTransformation.url(content.image, { device: 'desktop' })
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.image.focalPoint.x * 100 + '%',
            focalPointY : content.image.focalPoint.y * 100 + '%'
        };
    }
    if (content.imagemobile) {
        model.imagemobile = {
            src: {
                mobile: ImageTransformation.url(content.imagemobile, {device: 'mobile'}),
            },
            alt         : content.image.file.getAlt(),
            focalPointX : content.imagemobile.focalPoint.x * 100 + '%',
            focalPointY : content.imagemobile.focalPoint.y * 100 + '%'
        };
        model.alt_mobile =  content.alt_mobile
    }

    if (content.logo) {
        model.logo = {
            src: {
                mobile  : ImageTransformation.url(content.logo, { device: 'mobile' }),
                desktop : ImageTransformation.url(content.logo, { device: 'desktop' })
            },
            alt         : content.logo.file.getAlt(),
            focalPointX : content.logo.focalPoint.x * 100 + '%',
            focalPointY : content.logo.focalPoint.y * 100 + '%'
        };
    }

    if (actualCategory && actualCategory.custom && actualCategory.custom.isNew === true) {
        if (content.brand && content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'showInNewArrival', 'prefv3', actualCategory.custom.isNew);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'showInNewArrival', 'prefv3', actualCategory.custom.isNew);
        } else if (content.brand) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'showInNewArrival', 'prefv2', actualCategory.custom.isNew);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'showInNewArrival', 'prefv2', actualCategory.custom.isNew);
        } else if (content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'showInNewArrival', 'prefv2', actualCategory.custom.isNew);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'showInNewArrival', 'prefv2', actualCategory.custom.isNew);
        } else {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'showInNewArrival', 'prefv1', actualCategory.custom.isNew);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'showInNewArrival', 'prefv1', actualCategory.custom.isNew);
        }
    } else if (actualCategory && actualCategory.custom && actualCategory.custom.isSale === true) {
        if (content.brand && content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'isSale', 'prefv3', actualCategory.custom.isSale);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color, 'prefn3', 'isSale', 'prefv3', actualCategory.custom.isSale);
        } else if (content.brand) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'isSale', 'prefv2', actualCategory.custom.isSale);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'isSale', 'prefv2', actualCategory.custom.isSale);
        } else if (content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'isSale', 'prefv2', actualCategory.custom.isSale);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color, 'prefn2', 'isSale', 'prefv2', actualCategory.custom.isSale);
        } else {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'isSale', 'prefv1', actualCategory.custom.isSale);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'isSale', 'prefv1', actualCategory.custom.isSale);
        }
    } else {
        if (content.brand && content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand, 'prefn2', 'refinementColor', 'prefv2', content.color);
        } else if (content.brand) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'brand', 'prefv1', content.brand);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'brand', 'prefv1', content.brand);
        } else if (content.color) {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID, 'prefn1', 'refinementColor', 'prefv1', content.color);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit, 'prefn1', 'refinementColor', 'prefv1', content.color);
        } else {
            model.url = URLUtils.url('Search-Show', 'cgid', category.ID);
            model.renderProductsUrl = URLUtils.url('Search-RenderProducts', 'cgid', category.ID, 'start', 0, 'sz', model.prodLimit);
        }
    }

    if (content.url) {
        model.url = content.url;
    }

    if (content.container_id) {
        model.container_id = content.container_id;
    }

    return new Template('experience/components/assets/spotlightteaser').render(model).text;
};
