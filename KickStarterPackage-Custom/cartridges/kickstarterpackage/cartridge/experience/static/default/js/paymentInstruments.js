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
/******/ 	return __webpack_require__(__webpack_require__.s = "./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/components/cleave.js":
/*!****************************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/components/cleave.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nvar Cleave = __webpack_require__(!(function webpackMissingModule() { var e = new Error(\"Cannot find module 'cleave.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())).default;\r\n\r\nmodule.exports = {\r\n    handleCreditCardNumber: function (cardFieldSelector, cardTypeSelector) {\r\n        var cleave = new Cleave(cardFieldSelector, {\r\n            creditCard: true,\r\n            onCreditCardTypeChanged: function (type) {\r\n                var creditCardTypes = {\r\n                    visa: 'Visa',\r\n                    mastercard: 'Master Card',\r\n                    amex: 'Amex',\r\n                    discover: 'Discover',\r\n                    unknown: 'Unknown'\r\n                };\r\n\r\n                var cardType = creditCardTypes[Object.keys(creditCardTypes).indexOf(type) > -1\r\n                    ? type\r\n                    : 'unknown'];\r\n                $(cardTypeSelector).val(cardType);\r\n                $('.card-number-wrapper').attr('data-type', type);\r\n                if (type === 'visa' || type === 'mastercard' || type === 'discover') {\r\n                    $('#securityCode').attr('maxlength', 3);\r\n                } else {\r\n                    $('#securityCode').attr('maxlength', 4);\r\n                }\r\n            }\r\n        });\r\n\r\n        $(cardFieldSelector).data('cleave', cleave);\r\n    },\r\n\r\n    serializeData: function (form) {\r\n        var serializedArray = form.serializeArray();\r\n\r\n        serializedArray.forEach(function (item) {\r\n            if (item.name.indexOf('cardNumber') > -1) {\r\n                item.value = $('#cardNumber').data('cleave').getRawValue(); // eslint-disable-line\r\n            }\r\n        });\r\n\r\n        return $.param(serializedArray);\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/components/cleave.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/components/formValidation.js":
/*!************************************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/components/formValidation.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\n/**\r\n * Remove all validation. Should be called every time before revalidating form\r\n * @param {element} form - Form to be cleared\r\n * @returns {void}\r\n */\r\nfunction clearFormErrors(form) {\r\n    $(form).find('.form-control.is-invalid').removeClass('is-invalid');\r\n}\r\n\r\nmodule.exports = function (formElement, payload) {\r\n    // clear form validation first\r\n    clearFormErrors(formElement);\r\n    $('.alert', formElement).remove();\r\n\r\n    if (typeof payload === 'object' && payload.fields) {\r\n        Object.keys(payload.fields).forEach(function (key) {\r\n            if (payload.fields[key]) {\r\n                var feedbackElement = $(formElement).find('[name=\"' + key + '\"]')\r\n                    .parent()\r\n                    .children('.invalid-feedback');\r\n\r\n                if (feedbackElement.length > 0) {\r\n                    if (Array.isArray(payload[key])) {\r\n                        feedbackElement.html(payload.fields[key].join('<br/>'));\r\n                    } else {\r\n                        feedbackElement.html(payload.fields[key]);\r\n                    }\r\n                    feedbackElement.siblings('.form-control').addClass('is-invalid');\r\n                }\r\n            }\r\n        });\r\n    }\r\n    if (payload && payload.error) {\r\n        var form = $(formElement).prop('tagName') === 'FORM'\r\n            ? $(formElement)\r\n            : $(formElement).parents('form');\r\n\r\n        form.prepend('<div class=\"alert alert-danger\" role=\"alert\">'\r\n            + payload.error.join('<br/>') + '</div>');\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/components/formValidation.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments.js":
/*!*****************************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments.js ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nvar processInclude = __webpack_require__(/*! ./util */ \"./cartridges/kickstarterpackage/cartridge/client/default/js/util.js\");\r\n\r\n$(document).ready(function () {\r\n    processInclude(__webpack_require__(/*! ./paymentInstruments/paymentInstruments */ \"./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments/paymentInstruments.js\"));\r\n});\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments/paymentInstruments.js":
/*!************************************************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments/paymentInstruments.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nvar formValidation = __webpack_require__(/*! ../components/formValidation */ \"./cartridges/kickstarterpackage/cartridge/client/default/js/components/formValidation.js\");\r\nvar cleave = __webpack_require__(/*! ../components/cleave */ \"./cartridges/kickstarterpackage/cartridge/client/default/js/components/cleave.js\");\r\n\r\nvar url;\r\n\r\nmodule.exports = {\r\n    removePayment: function () {\r\n        $('.remove-payment').on('click', function (e) {\r\n            e.preventDefault();\r\n            url = $(this).data('url') + '?UUID=' + $(this).data('id');\r\n            $('.payment-to-remove').empty().append($(this).data('card'));\r\n\r\n            $('.delete-confirmation-btn').click(function (f) {\r\n                f.preventDefault();\r\n                $('.remove-payment').trigger('payment:remove', f);\r\n                $.ajax({\r\n                    url: url,\r\n                    type: 'get',\r\n                    dataType: 'json',\r\n                    success: function (data) {\r\n                        $('#uuid-' + data.UUID).remove();\r\n                        if (data.message) {\r\n                            var toInsert = '<div class=\"row justify-content-center h3 no-saved-payments\"><p>' +\r\n                            data.message +\r\n                            '</p></div>';\r\n                            $('.paymentInstruments').empty().append(toInsert);\r\n                        }\r\n                    },\r\n                    error: function (err) {\r\n                        if (err.responseJSON.redirectUrl) {\r\n                            window.location.href = err.responseJSON.redirectUrl;\r\n                        }\r\n                        $.spinner().stop();\r\n                    }\r\n                });\r\n            });\r\n        });\r\n    },\r\n\r\n    submitPayment: function () {\r\n        $('form.payment-form').submit(function (e) {\r\n            var $form = $(this);\r\n            e.preventDefault();\r\n            url = $form.attr('action');\r\n            $form.spinner().start();\r\n            $('form.payment-form').trigger('payment:submit', e);\r\n\r\n            var formData = cleave.serializeData($form);\r\n\r\n            $.ajax({\r\n                url: url,\r\n                type: 'post',\r\n                dataType: 'json',\r\n                data: formData,\r\n                success: function (data) {\r\n                    $form.spinner().stop();\r\n                    if (!data.success) {\r\n                        formValidation($form, data);\r\n                    } else {\r\n                        location.href = data.redirectUrl;\r\n                    }\r\n                },\r\n                error: function (err) {\r\n                    if (err.responseJSON.redirectUrl) {\r\n                        window.location.href = err.responseJSON.redirectUrl;\r\n                    }\r\n                    $form.spinner().stop();\r\n                }\r\n            });\r\n            return false;\r\n        });\r\n    },\r\n\r\n    handleCreditCardNumber: function () {\r\n        if ($('#cardNumber').length && $('#cardType').length) {\r\n            cleave.handleCreditCardNumber('#cardNumber', '#cardType');\r\n        }\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/paymentInstruments/paymentInstruments.js?");

/***/ }),

/***/ "./cartridges/kickstarterpackage/cartridge/client/default/js/util.js":
/*!***************************************************************************!*\
  !*** ./cartridges/kickstarterpackage/cartridge/client/default/js/util.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n\r\nmodule.exports = function (include) {\r\n    if (typeof include === 'function') {\r\n        include();\r\n    } else if (typeof include === 'object') {\r\n        Object.keys(include).forEach(function (key) {\r\n            if (typeof include[key] === 'function') {\r\n                include[key]();\r\n            }\r\n        });\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///./cartridges/kickstarterpackage/cartridge/client/default/js/util.js?");

/***/ })

/******/ });