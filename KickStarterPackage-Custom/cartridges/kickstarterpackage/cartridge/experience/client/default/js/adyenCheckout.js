"use strict";

require('imask/dist/imask.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// eslint-disable-next-line no-unused-vars
var maskedCardNumber;
var MASKED_CC_PREFIX = '************';
var selectedMethod;
var componentsObj = {};
var checkoutConfiguration = window.Configuration;
var formErrorsExist;
var isValid = false;
var checkout;
var navItemSelect = true;
$('#dwfrm_billing').submit(function (e) {
  e.preventDefault();
  var form = $(this);
  var url = form.attr('action');
  $.ajax({
    type: 'POST',
    url: url,
    data: form.serialize(),
    async: false,
    success: function success(data) {
      formErrorsExist = 'fieldErrors' in data;
    }
  });
});

checkoutConfiguration.onChange = function (state) {
  var type = state.data.paymentMethod.type;
  isValid = state.isValid;

  if (!componentsObj[type]) {
    componentsObj[type] = {};
  }

  componentsObj[type].isValid = isValid;
  componentsObj[type].stateData = state.data;
};

checkoutConfiguration.showPayButton = false;
checkoutConfiguration.paymentMethodsConfiguration = {
  card: {
    enableStoreDetails: showStoreDetails,
    onBrand: function onBrand(brandObject) {
      document.querySelector('#cardType').value = brandObject.brand;
      $('.credit-cards-list li').removeClass('active');
      $('.credit-cards-list li.' + brandObject.brand).addClass('active');
    },
    onFieldValid: function onFieldValid(data) {
      if (data.endDigits) {
        maskedCardNumber = MASKED_CC_PREFIX + data.endDigits;
        document.querySelector('#cardNumber').value = maskedCardNumber;
      }
    },
    onChange: function onChange(state) {
      isValid = state.isValid;
      var componentName = state.data.paymentMethod.storedPaymentMethodId ? "storedCard".concat(state.data.paymentMethod.storedPaymentMethodId) : state.data.paymentMethod.type;

      if (componentName === selectedMethod) {
        componentsObj[selectedMethod].isValid = isValid;
        componentsObj[selectedMethod].stateData = state.data;
      }
    }
  },
  boletobancario: {
    personalDetailsRequired: true,
    // turn personalDetails section on/off
    billingAddressRequired: false,
    // turn billingAddress section on/off
    showEmailAddress: false,
    // allow shopper to specify their email address
    // Optionally prefill some fields, here all fields are filled:
    data: {
      // firstName: document.getElementById('shippingFirstNamedefault').value,
      // lastName: document.getElementById('shippingLastNamedefault').value
    }
  },
  paywithgoogle: {
    environment: window.Configuration.environment,
    onSubmit: () => {
      assignPaymentMethodValue();
      document.querySelector('button[value="submit-payment"]').disabled = false;
      document.querySelector('button[value="submit-payment"]').click();
    },
    configuration: {
      gatewayMerchantId: window.merchantAccount
    },
    showPayButton: true,
    buttonColor: 'white'
  },
  paypal: {
    environment: window.Configuration.environment,
    intent: 'capture',
    onSubmit: (state, component) => {
      assignPaymentMethodValue();
      document.querySelector('#adyenStateData').value = JSON.stringify(componentsObj[selectedMethod].stateData);
      paymentFromComponent(state.data, component);
    },
    onCancel: (data, component) => {
      paymentFromComponent({
        cancelTransaction: true
      }, component);
    },
    onError: (error, component) => {
      if (component) {
        component.setStatus('ready');
      }

      document.querySelector('#showConfirmationForm').submit();
    },
    onAdditionalDetails: state => {
      document.querySelector('#additionalDetailsHidden').value = JSON.stringify(state.data);
      document.querySelector('#showConfirmationForm').submit();
    },
    onClick: (data, actions) => {
      $('#dwfrm_billing').trigger('submit');

      if (formErrorsExist) {
        return actions.reject();
      }
    }
  },
  afterpay_default: {
    visibility: {
      personalDetails: 'editable',
      billingAddress: 'hidden',
      deliveryAddress: 'hidden'
    },
    data: {
      personalDetails: {
        // firstName: document.querySelector('#shippingFirstNamedefault').value,
        // lastName: document.querySelector('#shippingLastNamedefault').value,
        // telephoneNumber: document.querySelector('#shippingPhoneNumberdefault').value,
        // shopperEmail: document.querySelector('#email').value
      }
    }
  },
  facilypay_3x: {
    visibility: {
      personalDetails: 'editable',
      billingAddress: 'hidden',
      deliveryAddress: 'hidden'
    },
    data: {
      personalDetails: {
        // firstName: document.querySelector('#shippingFirstNamedefault').value,
        // lastName: document.querySelector('#shippingLastNamedefault').value,
        // telephoneNumber: document.querySelector('#shippingPhoneNumberdefault').value,
        // shopperEmail: document.querySelector('#email').value
      }
    }
  }
};

if (window.installments) {
  try {
    var installments = JSON.parse(window.installments);
    checkoutConfiguration.paymentMethodsConfiguration.card.installments = installments;
  } catch (e) {} // eslint-disable-line no-empty

}

if (window.paypalMerchantID !== 'null') {
  checkoutConfiguration.paymentMethodsConfiguration.paypal.merchantId = window.paypalMerchantID;
}

if (window.googleMerchantID !== 'null' && window.Configuration.environment === 'LIVE') {
  checkoutConfiguration.paymentMethodsConfiguration.paywithgoogle.merchantIdentifier = window.googleMerchantID;
}
/**
 * Changes the "display" attribute of the selected method from hidden to visible
 */


function displaySelectedMethod(type) {
  $('li.paymentMethod').hide();
  $('li.paymentMethod.' +type).show();
  $('li.paymentMethod.' +type).addClass('visible');
  selectedMethod = type;
  resetPaymentMethod();

  if (['paypal', 'paywithgoogle'].indexOf(type) > -1) {
    document.querySelector('button[value="submit-payment"]').disabled = true;
  } else {
    document.querySelector('button[value="submit-payment"]').disabled = false;
  }

  document.querySelector("#component_".concat(type)).setAttribute('style', 'display:flex');
  document.querySelector("#component_".concat(type)).setAttribute('style', 'flex-wrap:wrap');
}
/**
 * To avoid re-rendering components twice, unmounts existing components from payment methods list
 */


function unmountComponents() {
  var promises = Object.entries(componentsObj).map(function (_ref) {
    var [key, val] = _ref;
    delete componentsObj[key];
    return resolveUnmount(key, val);
  });
  return Promise.all(promises);
}

function resolveUnmount(key, val) {
  try {
    return Promise.resolve(val.node.unmount("component_".concat(key)));
  } catch (e) {
    // try/catch block for val.unmount
    return Promise.resolve(false);
  }
}
/**
 * checks if payment method is blocked and returns a boolean accordingly
 */


function isMethodTypeBlocked(methodType) {
  var blockedMethods = ['directEbanking', 'klarna', 'paysafecard', 'giropay', 'klarna_account', 'klarna_paynow', 'bcmc_mobile_QR', 'applepay', 'cup', 'wechatpay', 'wechatpay_pos', 'wechatpaySdk', 'wechatpayQr'];
  return blockedMethods.includes(methodType);
}
/**
 * Calls getPaymenMethods and then renders the retrieved payment methods (including card component)
 */


function renderGenericComponent() {
  return _renderGenericComponent.apply(this, arguments);
}

function _renderGenericComponent() {
  _renderGenericComponent = _asyncToGenerator(function* () {
    if (Object.keys(componentsObj).length !== 0) {
      yield unmountComponents();
    }

    getPaymentMethods(function (data) {
      var paymentMethod;
      var i;
      checkoutConfiguration.paymentMethodsResponse = data.AdyenPaymentMethods;

      if (data.amount) {
        checkoutConfiguration.amount = data.amount;
      }

      if (data.countryCode) {
        checkoutConfiguration.countryCode = data.countryCode;
      }

      checkout = new AdyenCheckout(checkoutConfiguration);
      document.querySelector('#paymentMethodsList').innerHTML = '';

      if (data.AdyenPaymentMethods.storedPaymentMethods) {
        for (i = 0; i < checkout.paymentMethodsResponse.storedPaymentMethods.length; i++) {
          paymentMethod = checkout.paymentMethodsResponse.storedPaymentMethods[i];

          if (paymentMethod.supportedShopperInteractions.includes('Ecommerce')) {
            renderPaymentMethod(paymentMethod, true, data.ImagePath);
          }
        }
      }

      data.AdyenPaymentMethods.paymentMethods.forEach((pm, i) => {
        !isMethodTypeBlocked(pm.type) && renderPaymentMethod(pm, false, data.ImagePath, data.AdyenDescriptions[i].description);
      });
      var overwriteMask = IMask(
        $('#dateOfBirthInput')[0],
        {
          mask: Date,
          lazy: false,
          overwrite: true,
          autofix: true,
          blocks: {
            Y: {mask: IMask.MaskedRange, placeholderChar: 'J', from: 1900, to: 2099},
            m: {mask: IMask.MaskedRange, placeholderChar: 'M', from: 1, to: 12, maxLength: 2},
            d: {mask: IMask.MaskedRange, placeholderChar: 'T', from: 1, to: 31, maxLength: 2}
          }
        }
      );
      //Focus rate pay date of birth field on load
        $("#dateOfBirthInput").get(0).setSelectionRange(0,0);
        $("#dateOfBirthInput").focus();
      if (data.AdyenConnectedTerminals && data.AdyenConnectedTerminals.uniqueTerminalIds && data.AdyenConnectedTerminals.uniqueTerminalIds.length > 0) {
        var posTerminals = document.querySelector('#adyenPosTerminals');

        while (posTerminals.firstChild) {
          posTerminals.removeChild(posTerminals.firstChild);
        }

        addPosTerminals(data.AdyenConnectedTerminals.uniqueTerminalIds);
      }

      var selectedAdyenMethod = $('#adyen-component-content').data('adyen-method');
      var optionToSelect = document.querySelector('input[type=radio][name=brandCode]');
      if (!selectedAdyenMethod || (selectedAdyenMethod && !navItemSelect)) {
          selectedAdyenMethod = $(".nav-item.selected").data('adyen-method');
      }
      if (selectedAdyenMethod) {
        if (selectedAdyenMethod == 'scheme' && $('input[name$="useNewCard"]').length > 0 && ( $('input[name$="useNewCard"]').val() == false || $('input[name$="useNewCard"]').val() == 'false') && data.AdyenPaymentMethods.storedPaymentMethods && data.AdyenPaymentMethods.storedPaymentMethods.length > 0) {
          optionToSelect = document.querySelector('input[type=radio][name=brandCode]');
          // ECOM-664
          // $('li.paymentMethod').hide();
          // $('#paymentMethodsList li.stored').show();
          // $('#paymentMethodsList li.stored label').show();
          // $('#paymentMethodsList li.stored input').show();
          // $('.another-card').show();
        } else {
          optionToSelect = document.querySelector('input[type=radio][name=brandCode][value='+selectedAdyenMethod+']');
          // ECOM-664
          // optionToSelect.checked = true;
          // displaySelectedMethod(optionToSelect.value);
        }
      }
      optionToSelect.checked = true;

      displaySelectedMethod(optionToSelect.value);
      navItemSelect = false;
    });
  });
  return _renderGenericComponent.apply(this, arguments);
}

function renderPaymentMethod(paymentMethod, storedPaymentMethodBool, path) {
  var description = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var node;
  var paymentMethodsUI = document.querySelector('#paymentMethodsList');
  var li = document.createElement('li');
  var paymentMethodID = storedPaymentMethodBool ? "storedCard".concat(paymentMethod.id) : paymentMethod.type;
  var isSchemeNotStored = paymentMethod.type === 'scheme' && !storedPaymentMethodBool;
  var paymentMethodImage = storedPaymentMethodBool ? "".concat(path).concat(paymentMethod.brand, ".png") : "".concat(path).concat(paymentMethod.type, ".png");
  var cardImage = "".concat(path, "card.png");
  var imagePath = isSchemeNotStored ? cardImage : paymentMethodImage;
  var label = storedPaymentMethodBool ? "".concat(MASKED_CC_PREFIX).concat(paymentMethod.lastFour) : "".concat(paymentMethod.name);
  if (storedPaymentMethodBool) {
    var liContents = "\n                              <input name=\"brandCode\" type=\"radio\" value=\"".concat(paymentMethodID, "\" id=\"rb_").concat(paymentMethodID, "\">\n                             <label id=\"lb_").concat(paymentMethodID, "\" for=\"rb_").concat(paymentMethodID, "\">").concat(label, "</label>\n                             ");
    // ECOM-664
    // var liContents = "\n <div class='input-label-wrapper'> <div class='input-label-item'><input name=\"brandCode\" type=\"radio\" value=\"".concat(paymentMethodID, "\" id=\"rb_").concat(paymentMethodID, "\">\n <label id=\"lb_").concat(paymentMethodID, "\" for=\"rb_").concat(paymentMethodID, "\">").concat(label, "</label>\n  </div>");
    // liContents += "<div class='action-buttons'><i class='fa fa-ellipsis-v card-ellipsis card-icon'></i><i class='fa fa-pencil edit-card card-icon wraped-icon'></i><i class='fa fa-trash-o delete-card card-icons wraped-icon' data-token='" + paymentMethod.id + "'></i> </div> </div>";
  } else {
    var liContents = "\n <input class=\"adhyenPaymentMethod\" name=\"brandCode\" type=\"radio\" value=\"".concat(paymentMethodID, "\" id=\"rb_").concat(paymentMethodID, "\">\n <label class=\"adhyenPaymentMethod\" id=\"lb_").concat(paymentMethodID, "\" for=\"rb_").concat(paymentMethodID, "\">").concat(label, "</label>\n ");
  }
  if (description) {
    liContents += "<p>".concat(description, "</p>");
  }

  var container = document.createElement('div');

  li.innerHTML = liContents;
  li.classList.add('paymentMethod');
  if (storedPaymentMethodBool) {
    li.classList.add('scheme');
    li.classList.add('stored');
  }
  li.classList.add(paymentMethodID);

  if (storedPaymentMethodBool) {
    node = checkout.create('card', paymentMethod);

    if (!componentsObj[paymentMethodID]) {
      componentsObj[paymentMethodID] = {};
    }

    componentsObj[paymentMethodID].node = node;
    /** adding card number field for saved card */
    var customCardInputContainer = document.createElement('div');
    customCardInputContainer.classList.add('custom-card-input');

    var cardTypeSpan = document.createElement('span');
    cardTypeSpan.classList.add(paymentMethod.brand);
    cardTypeSpan.classList.add('card');

    var savedCardNumber = document.createElement('input');
    savedCardNumber.className = 'adyen-checkout__input';
    savedCardNumber.value = "".concat(MASKED_CC_PREFIX).concat(paymentMethod.lastFour);
    savedCardNumber.disabled = true;

    var customCardHolderContainer = document.createElement('div');
    customCardInputContainer.classList.add('custom-card-holder-cont');
    var savedCardName = document.createElement('input');
    savedCardName.className = 'adyen-checkout__input';
    savedCardName.value = paymentMethod.holderName;
    savedCardName.disabled = true;
    customCardHolderContainer.appendChild(savedCardName);

    customCardInputContainer.appendChild(cardTypeSpan);
    customCardInputContainer.appendChild(savedCardNumber);
    container.appendChild(customCardInputContainer);
    container.appendChild(savedCardName);
  } else {
    var fallback = getFallback(paymentMethod.type);

    if (fallback) {
      var template = document.createElement('template');
      template.innerHTML = fallback;
      container.appendChild(template.content);
    } else {
      try {
        node = checkout.create(paymentMethod.type);

        if (!componentsObj[paymentMethodID]) {
          componentsObj[paymentMethodID] = {};
        }

        componentsObj[paymentMethodID].node = node;
      } catch (e) {} // eslint-disable-line no-empty

    }
  }

  container.classList.add('additionalFields');
  container.setAttribute('id', "component_".concat(paymentMethodID));
  container.setAttribute('style', 'display:none');

  li.appendChild(container); 
  paymentMethodsUI.appendChild(li);

  if (paymentMethod.type !== 'paywithgoogle') {
    node && node.mount(container);
  } else {
    node.isAvailable().then(() => {
      node.mount(container);
    }).catch(() => {}); // eslint-disable-line no-empty
  }

  if (storedPaymentMethodBool) {
    /** adding card number field for saved card */
    var customCardInputContainer = document.createElement('div');
    customCardInputContainer.classList.add('custom-card-input');

    var cardTypeSpan = document.createElement('span');
    cardTypeSpan.classList.add(paymentMethod.brand);
    cardTypeSpan.classList.add('card');

    var savedCardNumber = document.createElement('input');
    savedCardNumber.className = 'adyen-checkout__input';
    savedCardNumber.value = "".concat(MASKED_CC_PREFIX).concat(paymentMethod.lastFour);
    savedCardNumber.disabled = true;

    customCardInputContainer.appendChild(cardTypeSpan);
    customCardInputContainer.appendChild(savedCardNumber);

    var useAnotherCardLink = document.createElement('div');
    useAnotherCardLink.classList.add('cc-link-holder');
    var useAnotherCardLinkSpan = document.createElement('span');
    useAnotherCardLinkSpan.classList.add('another-card');
    useAnotherCardLinkSpan.classList.add('change-card');
    useAnotherCardLinkSpan.innerText = 'Andere Kreditkarte verwenden';
    useAnotherCardLink.appendChild(useAnotherCardLinkSpan);

    container.appendChild(customCardInputContainer);
    container.appendChild(useAnotherCardLink);
  } else if (paymentMethodID == 'scheme' && $('.data-checkout-stage').data('customer-type') === 'registered' && $('#paymentMethodsList').find('li.stored').length > 0) {
    var useSavedCardLink = document.createElement('div');
    useSavedCardLink.classList.add('cc-link-holder');
    var useSavedCardLinkSpan = document.createElement('span');
    useSavedCardLinkSpan.classList.add('saved-card');
    useSavedCardLinkSpan.classList.add('change-card');
    useSavedCardLinkSpan.innerText = 'Gespeicherte Kreditkarte verwenden';
    useSavedCardLink.appendChild(useSavedCardLinkSpan);
    container.appendChild(useSavedCardLink);
  }

  var input = document.querySelector("#rb_".concat(paymentMethodID));

  input.onchange = event => {
    displaySelectedMethod(event.target.value);
  };

  if (componentsObj[paymentMethodID] && !container.childNodes[0]) {
    componentsObj[paymentMethodID].isValid = true;
  }
} // eslint-disable-next-line no-unused-vars


function addPosTerminals(terminals) {
  var terminalSelect = document.createElement('select');
  terminalSelect.id = 'terminalList';

  for (var t in terminals) {
    var option = document.createElement('option');
    option.value = terminals[t];
    option.text = terminals[t];
    terminalSelect.appendChild(option);
  }

  document.querySelector('#adyenPosTerminals').append(terminalSelect);
}

function resetPaymentMethod() {
  $('#requiredBrandCode').hide();
  $('#selectedIssuer').val('');
  $('#adyenIssuerName').val('');
  $('#dateOfBirth').val('');
  $('#telephoneNumber').val('');
  $('#gender').val('');
  $('#bankAccountOwnerName').val('');
  $('#bankAccountNumber').val('');
  $('#bankLocationId').val('');
  $('.additionalFields').hide();
}
/**
 * Makes an ajax call to the controller function GetPaymentMethods
 */

 function setLimitsRatepay() {
  if ((($('.nav-link.adyen-tab.active').text().indexOf('Rechnung') > -1) || $('.nav-link.adyen-tab.active').text().indexOf('invoice') > -1) && (!$('li.placeOrder').hasClass('active'))) {
  var errorMsg2;
  var minValue = $('#minValueCheckout').attr('value');
  var maxValue = $('#maxValueCheckout').attr('value');
    if (minValue || maxValue) {
      var totalSum = $('.grand-total-sum').text();
      var check = totalSum.substr(totalSum.length - 3);
      if (check.indexOf(".") >= 0) {
        var sd = totalSum.replace(/[^0-9.]/gi, '');
        var total = parseInt(sd);
      } else {
        var newString = totalSum.replace('.','').replace(',','.');
        var sd = newString.replace(/[^0-9.]/gi, '');
        var total = parseInt(sd);
      }
      
      if (total < minValue) {
        errorMsg2 = $('#minValueCheckout').data('error-min');
        $("#dateOfBirthInput").hide();
        $('button[value="submit-payment"]').hide();
        $('div.ratepay-info').hide();
        $('#dobError').hide();
        $('span.adyen-checkout__label').hide();
      } else if (total > maxValue) {
        errorMsg2 = $('#maxValueCheckout').data('error-max');
        $("#dateOfBirthInput").hide();
        $('button[value="submit-payment"]').hide();
        $('div.ratepay-info').hide();
        $('#dobError').hide();
        $('span.adyen-checkout__label').hide();
      }
    }
    if (errorMsg2) {
      $("#dateOfBirthInput").after('<div id=\'limitError\'> <div class=\"ratepay-info-content\"><div class=\"ratepay-content-wrapper\"><div class=\"icon-holder\"><svg fill="none" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="m9.9 6.3h-1.8v-1.8h1.8v1.8zm0 7.2h-1.8v-5.4h1.8v5.4zm-0.891 4.5c4.968 0 8.991-4.032 8.991-9s-4.023-9-8.991-9c-4.977-4.351e-7 -9.009 4.032-9.009 9-4.3431e-7 4.968 4.032 9 9.009 9zm-9e-3 -16.2c3.978 0 7.2 3.222 7.2 7.2s-3.222 7.2-7.2 7.2-7.2-3.222-7.2-7.2 3.222-7.2 7.2-7.2z" fill="#000"></path></svg></div><span class=\"info-message\">' + errorMsg2 + '</span></div></div></div>');
    }
    else {
      $("#dateOfBirthInput").show();
      $('#limitError').remove();
      if ($('li.payment').hasClass('active')) {
        $('button[value="submit-payment"]').show();
    } else {
        $('button[value="submit-payment"]').hide();
    }
    }
  } else {
    if ($('li.payment').hasClass('active')) {
      $('button[value="submit-payment"]').show();
  } else {
      $('button[value="submit-payment"]').hide();
  }
    $('#limitError').remove();
  }
}



function getPaymentMethods(paymentMethods) {
  var getPaymentMethodsURL = $('#checkout-main').data('adyen-getpaymentmethods-url');
  $('#checkout-main').spinner().start();
  $.ajax({
    url: getPaymentMethodsURL,
    type: 'get',
    success: function success(data) {
      paymentMethods(data);
      $('#checkout-main').spinner().stop();
      setLimitsRatepay();
    }
  });
}
/**
 * Makes an ajax call to the controller function PaymentFromComponent. Used by certain payment methods like paypal
 */


function paymentFromComponent(data, component) {
  $.ajax({
    url: 'Adyen-PaymentFromComponent',
    type: 'post',
    data: {
      data: JSON.stringify(data),
      paymentMethod: document.querySelector('#adyenPaymentMethodName').value
    },
    success: function success(data) {
      if (data.fullResponse && data.fullResponse.action) {
        component.handleAction(data.fullResponse.action);
      } else {
        document.querySelector('#showConfirmationForm').submit();
      }
    }
  }).fail(function () {});
} // Submit the payment


$('.paypal-tab').on('click', function () {
  $('button[value="submit-payment"]').show();
});

$('button[value="submit-payment"]').on('click', function () {
  if ($('#component_ratepay').length > 0 && $('#component_ratepay:hidden').length === 0) {
    var dob = $('#dateOfBirthInput').val();
    var pattern = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.\d{4}$/g;
    var errorMsg;
    
    if (!dob) {
        errorMsg = $('.ratepay-tab').data('dob-missing-error');
    } else if (isCurrentDate() === true) {
      errorMsg = $('.ratepay-tab').data('dob-todays-date-error');
    } else if (!pattern.test(dob)) {
        var errorMsg = $('.ratepay-tab').data('ratepay-dob-error');
    } else if (isValidDob() === false) {
      errorMsg = $('.ratepay-tab').data('ratepay-eligibility-error');
    } else {
      $('#dateOfBirthInput').removeClass('adyen-checkout__input--error');
      $('#component_ratepay .adyen-checkout__error-text').remove();
    }
    if (errorMsg ) {
      $('#dateOfBirthInput').addClass('adyen-checkout__input--error');
      if ($('#component_ratepay').find('.adyen-checkout__error-text').length === 0) {
        if (errorMsg){
          $("#dateOfBirthInput").after('<span id=\'dobError\' class=\'adyen-checkout__error-text\'>'+ errorMsg +'</span>');
        }
      } else {
        if (errorMsg){
          if ($('#component_ratepay').find('#dobError').length === 0) {
            $("#dateOfBirthInput").after('<span id=\'dobError\' class=\'adyen-checkout__error-text\'>'+ errorMsg +'</span>');
          } else {
            $('#component_ratepay').find('#dobError').text(errorMsg);
          }
        }
      }
      return false;
    }
  }
  
  if ($('input[name$=isPaypal]').val() === 'true') {
    return;
  }
  $('.payment-form-fields input').removeAttr('disabled');
  assignPaymentMethodValue();
  validateComponents();
  return showValidation();
});

//Check Date of Birth for Ratepay greator than 18 or not
function isValidDob() {
  var dob = $('#dateOfBirthInput').val().split('.');
  var year = dob[2];
  var month = dob[1];
  var day = dob[0];

  var setDate = new Date(parseInt(year) + 18, month - 1, day);
  var currdate = new Date();
  if(currdate >= setDate) {
    return true;
  }
  else {
    return false;
  }

}

//Check Date of Birth for Ratepay is current Date
function isCurrentDate() {
  var dob = $('#dateOfBirthInput').val().split('.');
  var year = dob[2];
  var month = dob[1];
  var day = dob[0];

  var setDate = new Date(year, month - 1, day);
  var currdate = new Date();
  currdate.setHours(0, 0, 0, 0);
  setDate.setHours(0, 0, 0, 0);
  if(currdate.toDateString() == setDate.toDateString()) {
    return true;
  } else {
    return false;
  }
}

function assignPaymentMethodValue() {
  var adyenPaymentMethod = document.querySelector('#adyenPaymentMethodName');
  adyenPaymentMethod.value = document.querySelector("#lb_".concat(selectedMethod)).innerText;
}

function showValidation() {
  var input;

  if (componentsObj[selectedMethod] && !componentsObj[selectedMethod].isValid) {
    componentsObj[selectedMethod].node.showValidation();
    return false;
  }

  if (selectedMethod === 'ach') {
    var inputs = document.querySelectorAll('#component_ach > input');
    inputs = Object.values(inputs).filter(function (input) {
      return !(input.value && input.value.length > 0);
    });

    for (input of inputs) {
      input.classList.add('adyen-checkout__input--error');
    }

    if (inputs.length > 0) {
      return false;
    }

    return true;
  }

  if (selectedMethod === 'ratepay') {
    var inputs = document.querySelectorAll('#component_ratepay > input');
    inputs = Object.values(inputs).filter(function (input) {
      return !(input.value && input.value.length > 0);
    });

    for (input of inputs) {
      input.classList.add('adyen-checkout__input--error');
    }

    if (inputs.length > 0) {
      return false;
    }

    return true;
  }

  return true;
}

function validateCustomInputField(input) {
  if (input.value === '') {
    input.classList.add('adyen-checkout__input--error');
  } else if (input.value.length > 0) {
    input.classList.remove('adyen-checkout__input--error');
  }
}
/**
 * Assigns stateData value to the hidden stateData input field so it's sent to the backend for processing
 */


function validateComponents() {
  if (document.querySelector('#component_ach')) {
    var inputs = document.querySelectorAll('#component_ach > input');

    for (var input of inputs) {
      input.onchange = function () {
        validateCustomInputField(this);
      };
    }
  }

  if (document.querySelector('#dateOfBirthInput')) {
    document.querySelector('#dateOfBirthInput').onchange = function () {
      validateCustomInputField(this);
    };
  }

  var stateData;

  if (componentsObj[selectedMethod] && componentsObj[selectedMethod].stateData) {
    stateData = componentsObj[selectedMethod].stateData;
  } else {
    stateData = {
      paymentMethod: {
        type: selectedMethod
      }
    };
  }

  if (selectedMethod === 'ach') {
    var bankAccount = {
      ownerName: document.querySelector('#bankAccountOwnerNameValue').value,
      bankAccountNumber: document.querySelector('#bankAccountNumberValue').value,
      bankLocationId: document.querySelector('#bankLocationIdValue').value
    };
    stateData.paymentMethod = _objectSpread(_objectSpread({}, stateData.paymentMethod), {}, {
      bankAccount: bankAccount
    });
  } else if (selectedMethod === 'ratepay') {
    if (document.querySelector('#dateOfBirthInput').value) {
      // As format is different on front end
      var adyenFormatDate =  document.querySelector('#dateOfBirthInput').value.split('.');
      stateData.dateOfBirth = adyenFormatDate[2]+'-'+adyenFormatDate[1]+'-'+adyenFormatDate[0];
    }
  }

  document.querySelector('#adyenStateData').value = JSON.stringify(stateData);
}
/**
 * Contains fallback components for payment methods that don't have an Adyen web component yet
 */

function getFallback(paymentMethod) {
  var dateOfBirth = document.querySelector('#dateOfBirth').value.split('-');
  var ach = "<div id=\"component_ach\">\n                    <span class=\"adyen-checkout__label\">Bank Account Owner Name</span>\n                    <input type=\"text\" id=\"bankAccountOwnerNameValue\" class=\"adyen-checkout__input\">\n                    <span class=\"adyen-checkout__label\">Bank Account Number</span>\n                    <input type=\"text\" id=\"bankAccountNumberValue\" class=\"adyen-checkout__input\" maxlength=\"17\" >\n                    <span class=\"adyen-checkout__label\">Routing Number</span>\n                    <input type=\"text\" id=\"bankLocationIdValue\" class=\"adyen-checkout__input\" maxlength=\"9\" >\n                 </div>";
  var ratepay = "<span class=\"adyen-checkout__label\">Geburtsdatum</span>\n                    <input id=\"dateOfBirthInput\" class=\"adyen-checkout__input\" inputmode=\"numeric\"  placeholder=\"TT.MM.JJJJ*\" type=\"text\" value=\"" + dateOfBirth[2]+'.'+dateOfBirth[1]+'.'+dateOfBirth[0] +"\"/> <div class=\"ratepay-info\">";
  ratepay += $('.ratepay-tab').data('ratepay-msg') + "</div>";
  var fallback = {
    ach: ach,
    ratepay: ratepay
  };
  return fallback[paymentMethod];
}

module.exports = {
  methods: {
    renderGenericComponent: renderGenericComponent
  }
};

