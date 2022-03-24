"use strict";
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var ProductMgr = require("dw/catalog/ProductMgr");
var SeekableIterator = require("dw/util/SeekableIterator");
var mail = require("dw/net/Mail");
var Site = require("dw/system/Site");
var ProductVariationModel = require("dw/catalog/ProductVariationModel");

function execute() {
  var allCustomers = CustomObjectMgr.getAllCustomObjects("Notify_customer");
  var checkInstockVariants = 0;
  for (var i = 0; allCustomers !== null && allCustomers.hasNext(); i++) {
    var object = allCustomers.next();
    var productID = object.custom.product_ID;
    var email = object.custom.email;
    var product = ProductMgr.getProduct(productID);
    if (product.master) {
      var Product_variation = product.getVariants();
      var No_of_variants = Product_variation.size();
      for (var j = 0; j < No_of_variants; j++) {
        if (Product_variation[j].availabilityModel.inStock == true) {
          checkInstockVariants += 1;
        }
      }
      if (checkInstockVariants == No_of_variants && checkInstockVariants != 0) {
        var mail = new dw.net.Mail();
        mail.addTo(email); // s.custom.email
        mail.setFrom(
          Site.current.getCustomPreferenceValue("customerServiceEmail") ||
            "no-reply@testorganization.com"
        );
        mail.setSubject("Notify Product availability");
        mail.setContent(
          "Dear customer product with id " +
            productID +
            " is available  now you can get it from our web.\n\n This is an automatically generated email, please do not reply."
        );

        mail.send();
      }
    } else if (!product.master) {
      var FetchMaster = product.masterProduct;
      var Product_variation = FetchMaster.getVariants();
      var No_of_variants = Product_variation.size();
      for (var j = 0; j < No_of_variants; j++) {
        if (Product_variation[j].availabilityModel.inStock == true) {
          checkInstockVariants += 1;
        }
      }
      if (checkInstockVariants == No_of_variants && checkInstockVariants != 0) {
        var mail = new dw.net.Mail();
        mail.addTo(email); // s.custom.email
        mail.setFrom(
          Site.current.getCustomPreferenceValue("customerServiceEmail") ||
            "no-reply@testorganization.com"
        );
        mail.setSubject("Notify Product availability");
        mail.setContent(
          "Dear customer product with id " +
            productID +
            " is available  now you can get it from our web.\n\n This is an automatically generated email, please do not reply."
        );
        mail.send();
      }
    }
    checkInstockVariants = 0;
  }
}
module.exports = {
  execute: execute,
};
