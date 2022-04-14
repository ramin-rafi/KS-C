"use strict";

window.jQuery = window.$ = require('jquery');
require('bootstrap/dist/js/bootstrap.bundle');
require('slick-carousel');

// All Custom JS file include here
$(document).ready(function () {
    processInclude(require('./custom'));
});