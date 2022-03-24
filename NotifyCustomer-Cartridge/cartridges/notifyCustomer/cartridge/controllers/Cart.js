"use strict";

/**
 * @namespace Cart
 */

var server = require("server");
var Cart = module.superModule;
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
server.extend(Cart);

/* Cart-NotifyMe is responsible for storing the user data and save it in the Custom Object*/
server.get("NotifyMe", function (req, res, next) {
  var Transaction = require("dw/system/Transaction");
  var CustomerMgr = require("dw/customer/CustomerMgr");
  var CustomObjectMgr = require("dw/object/CustomObjectMgr");
  var productID = req.querystring.productID;
  var email = req.querystring.email;
  try {
    Transaction.wrap(function () {
      var CustomObj = CustomObjectMgr.createCustomObject(
        "Notify_customer",
        email
      );
      CustomObj.custom.email = email;
      CustomObj.custom.product_ID = productID;
    });
    res.json({
      success: true,
    });
    next();
  } catch (error) {
    var a = error;
    var b = a;
  }
});
module.exports = server.exports();
