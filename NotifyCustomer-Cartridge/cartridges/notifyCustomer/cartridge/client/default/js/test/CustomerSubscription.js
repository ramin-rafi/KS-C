"use strict";

module.exports = {
  tes: function () {
    $(document).on("click", ".notify-me", function (e) {
      e.preventDefault();
      var email = $("#email").val(); // get the input field value of mail
      var productID = $(".notify-me").data("pid"); // get the product id through class and data
      var url = $(".notify-me").data("url");
      $.ajax({
        url: url + "?email=" + email + "&productID=" + productID,
        type: "get",
        success: function () {},
      });
      alert("You have subscribed to be notified when product is restocked");
    });
  },
};
