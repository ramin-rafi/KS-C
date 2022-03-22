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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../storefront-reference-architecture-master/cartridges/app_storefront_base/cartridge/client/default/js/util.js":
/*!**********************************************************************************************************************!*\
  !*** ../storefront-reference-architecture-master/cartridges/app_storefront_base/cartridge/client/default/js/util.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nmodule.exports = function (include) {\r\n    if (typeof include === 'function') {\r\n        include();\r\n    } else if (typeof include === 'object') {\r\n        Object.keys(include).forEach(function (key) {\r\n            if (typeof include[key] === 'function') {\r\n                include[key]();\r\n            }\r\n        });\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///../storefront-reference-architecture-master/cartridges/app_storefront_base/cartridge/client/default/js/util.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact.js":
/*!**********************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nvar processInclude = __webpack_require__(/*! base/util */ \"../storefront-reference-architecture-master/cartridges/app_storefront_base/cartridge/client/default/js/util.js\");\r\n\r\n$(document).ready(function () {\r\n    processInclude(__webpack_require__(/*! ./helpContact/helpContact */ \"./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact/helpContact.js\"));\r\n});\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact/helpContact.js":
/*!**********************************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact/helpContact.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\nmodule.exports = function () {\r\n    $(document).ready(function () {\r\n        $('.contact-content-wrapper').hide();\r\n        var flag = false;\r\n        if (window.location.hash !== '') {\r\n            $('.lists-wrapper li a').each(function () {\r\n                var url = window.location.href;\r\n                if ($(this).attr('href') === url.substring(url.lastIndexOf('#'))) {\r\n                    $(this).trigger('click');\r\n                    flag = true;\r\n                }\r\n            });\r\n        } else {\r\n            $('.lists-wrapper li a[href=\"#Kundenservice_&_Kontakt\"]').trigger('click');\r\n            var url = window.location.href.split('#')[0];\r\n            window.history.replaceState(null, null, url);\r\n            flag = true;\r\n        }\r\n        if (!flag) {\r\n            $('.contact-wrapper').removeClass('d-none');\r\n        }\r\n    });\r\n    window.addEventListener('popstate', function () {\r\n        var flag = false;\r\n        $('.lists-wrapper li a').each(function () {\r\n            var url = window.location.href;\r\n            if ($(this).attr('href') === url.substring(url.lastIndexOf('#'))) {\r\n                $(this).trigger('click');\r\n                flag = true;\r\n            }\r\n        });\r\n        if (!flag) {\r\n            location.reload();\r\n        }\r\n    });\r\n    $('#accordion .collapse.show').each(function () {\r\n        $(this).parents('.tab-item').addClass('active-tab');\r\n    });\r\n    $('#accordion .collapse').on('show.bs.collapse', function () {\r\n        $(this).parents('.tab-item').addClass('active-tab');\r\n    }).on('hide.bs.collapse', function () {\r\n        $(this).parents('.tab-item').removeClass('active-tab');\r\n    });\r\n    $('.lists-wrapper li a').click(function () {\r\n        var target = $(this).attr('data-target');\r\n        $('.contact-wrapper').hide();\r\n        $('.contact-content-wrapper').show();\r\n        $('#accordion .tab-content').hide();\r\n        $('#accordion').find(target).show();\r\n        if (!($('.sidebar-tab li a[data-target=\"' + target + '\"]').parent('li').hasClass('active'))) {\r\n            $('.sidebar-tab li').removeClass('active');\r\n            $('.sidebar-tab li a[data-target=\"' + target + '\"]').parent('li').addClass('active');\r\n            $('.tab-item .tab-heading a[data-target=\"' + target + '\"]').parents('.tab-item').addClass('active-tab');\r\n        }\r\n    });\r\n\r\n    $('.sidebar-tab li a').click(function () {\r\n        var target = $(this).attr('data-target');\r\n        $('#accordion .tab-content').hide(100);\r\n        $('#accordion').find(target).show(100);\r\n        $('.sidebar-tab li').removeClass('active');\r\n        $(this).parent('li').addClass('active');\r\n    });\r\n\r\n    $('.tab-item .tab-heading a').click(function (e) {\r\n        var target = $(this).attr('data-target');\r\n        if ($(this).parents('.tab-item').hasClass('active-tab')) {\r\n            e.preventDefault();\r\n            $('#accordion').find(target).hide(100);\r\n            $(this).parents('.tab-item').removeClass('active-tab');\r\n            var url = window.location.href.split('#')[0];\r\n            window.history.replaceState(null, null, url);\r\n        } else {\r\n            $('#accordion .tab-content').hide(100);\r\n            $('#accordion').find(target).show(100);\r\n            $('.tab-item').removeClass('active-tab');\r\n            $(this).parents('.tab-item').addClass('active-tab');\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/helpContact/helpContact.js?");

/***/ })

/******/ });