/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/kickstarterpackage/cartridge/client/default/js/brand.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/brand.js":
/*!****************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/brand.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n/**\r\n * returns the url search parameters\r\n * @returns {Object} - url search parameters\r\n */\r\nfunction urlParams() {\r\n    var urlParamsObject;\r\n    var match;\r\n    var pl = /\\+/g;  // Regex for replacing addition symbol with a space\r\n    var search = /([^&=]+)=?([^&]*)/g;\r\n    var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };\r\n    var query = window.location.search.substring(1);\r\n\r\n    urlParamsObject = {};\r\n    match = search.exec(query);\r\n    while (match) {\r\n        urlParamsObject[decode(match[1])] = decode(match[2]);\r\n        match = search.exec(query);\r\n    }\r\n    return urlParamsObject;\r\n}\r\n\r\n/**\r\n * Creates history for updated url\r\n * @param {string} category - category name\r\n */\r\nfunction updateUrl(category) {\r\n    var queryParams = urlParams();\r\n    var url = '';\r\n    if (queryParams.cid) {\r\n        url = '?cid=' + queryParams.cid + '&catname=' + category;\r\n    }\r\n    history.pushState(\r\n        '',\r\n        document.title,\r\n        url\r\n    );\r\n}\r\n\r\n/**\r\n * Filter brands based on selected category\r\n */\r\nfunction filter() {\r\n    var selectedCategory = $($('.category-btns').find('.selected')).attr('id');\r\n    $('.brands-set').removeClass('d-none');\r\n    $('.brand-item').addClass('d-none');\r\n\r\n    $('.brand-item').each(function (index, item) {\r\n        if (selectedCategory) {\r\n            var itemCategory = $(item).attr('data-category');\r\n            if (itemCategory.toLowerCase().indexOf(selectedCategory.toLowerCase()) > -1) {\r\n                $(item).removeClass('d-none');\r\n            }\r\n        }\r\n    });\r\n\r\n    $('.brands-set').addClass('d-none');\r\n    $('.brands-set').each(function (index, item) {\r\n        if ($(item).find('.brand-item').length !== $(item).find('.d-none').length) {\r\n            $(item).removeClass('d-none');\r\n        }\r\n    });\r\n    $('.alphabets li a').removeClass('active');\r\n    $('.brands-set:not(\".d-none\")').each(function (index, item) {\r\n        $($('.alphabets').find('#' + $(item).find('p').attr('id') + 'ele')).addClass('active');\r\n    });\r\n    var breadcrumb = $('.brand-breadcrumbs').attr('data-brandtext') + '<span class=\"bread-bar\">/</span><span class=\"cat-breadcrumb\">' + $('#' + selectedCategory).html() + '</span>';\r\n\r\n    $('.brand-breadcrumbs').html(breadcrumb);\r\n}\r\n\r\n/**\r\n * Bind multiple events\r\n */\r\nfunction bindEvents() {\r\n    $(document).on('keyup', '#brandSearch', function () {\r\n        if ($(this).val().length < 3) {\r\n            $('.min-length-error').removeClass('d-none');\r\n            filter('');\r\n        } else {\r\n            $('.min-length-error').addClass('d-none');\r\n            filter($(this).val());\r\n        }\r\n    });\r\n    $(document).on('change', '#brandSearch', function () {\r\n        if ($(this).val().length < 3) {\r\n            $('.min-length-error').removeClass('d-none');\r\n            return;\r\n        }\r\n        if ($(this).val().length >= 3) {\r\n            $('.min-length-error').addClass('d-none');\r\n            return;\r\n        }\r\n    });\r\n    $(document).on('click', '.brand-category', function () {\r\n        $('.brand-category').removeClass('selected');\r\n        $(this).addClass('selected');\r\n        filter('');\r\n        updateUrl($(this).attr('id'));\r\n    });\r\n    var queryParams = urlParams();\r\n    if (queryParams.catname) {\r\n        $('.category-btns').find('#' + queryParams.catname.replace(/'/g, '-').replace(/ /g, '_')).addClass('selected');\r\n        filter('');\r\n    }\r\n}\r\n\r\n/**\r\n * Appends relevant data\r\n */\r\nfunction appendData() {\r\n    $('.brand-item .brand-title, .brand-item .btn-close').click(function () {\r\n        var myHeight = $(this).closest('.brand-item').find('.brand-details').outerHeight();\r\n        var item = $(this).closest('.brand-item');\r\n        var isOut;\r\n        item.css({ marginBottom: isOut ? myHeight + 10 + 'px' : '0' });\r\n        $(this).closest('.brand-item').find('.brand-details').toggleClass('active');\r\n        $(this).closest('.brand-item').find('.brand-details').slideToggle();\r\n\r\n\r\n        var firstSiblings = $(this).closest('.brand-item').siblings();\r\n        firstSiblings.find('.brand-details').removeClass('active');\r\n        firstSiblings.find('.brand-details').slideUp();\r\n        firstSiblings.css({ marginBottom: '0' });\r\n\r\n        var secondSiblings = $(this).closest('.brands-section .brands-set').siblings();\r\n        secondSiblings.find('.brand-details').removeClass('active');\r\n        secondSiblings.find('.brand-details').slideUp();\r\n        secondSiblings.find('.brand-item').css({ marginBottom: '0' });\r\n    });\r\n}\r\n\r\n/**\r\n * Handle anchors click event\r\n */\r\nfunction smoothAnchors() {\r\n    $('.alphabets a').on('click', function (event) {\r\n        var headeHeight = $('#header').outerHeight();\r\n        var $anchor = $(this);\r\n        $('html, body').animate({\r\n            scrollTop: ($($anchor.attr('href')).offset().top - headeHeight) + 'px'\r\n        }, 1500);\r\n        event.preventDefault();\r\n    });\r\n}\r\n\r\n$(document).ready(function () {\r\n    bindEvents();\r\n    appendData();\r\n    smoothAnchors();\r\n});\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/brand.js?");

/***/ })

/******/ });