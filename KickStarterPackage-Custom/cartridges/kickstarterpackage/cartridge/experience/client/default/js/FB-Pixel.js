'use strict';

function sendData (event, type, data, currencyCode, conversionValue, pixelCatalogID) {
	if (typeof conversionValue === 'string') {
		conversionValue = parseFloat(conversionValue);
	}
	if (event === 'view' && type === 'ids') {
		fbq('track', 'ViewContent', {
			value: conversionValue ? conversionValue : 0,
			currency: currencyCode ? currencyCode: 'EUR',
			content_type: 'product',
			content_ids: data,
			product_catalog_id: pixelCatalogID ? pixelCatalogID : ''
		});
	} else if (event === 'addToCart' && type === 'contents') {
		fbq('track', 'AddToCart', {
			value: conversionValue ? conversionValue : 0,
			currency: currencyCode ? currencyCode: 'EUR',
			contents: data,
			content_type: 'product',
			product_catalog_id: pixelCatalogID ? pixelCatalogID : ''
		});
	}
}

function pixelPDP () {
	if ($('#enablePixel').val() === 'true' && $('#maincontent .product-detail').length) {
		var pid = $('#maincontent .product-detail').attr('data-master-pid');
		var currencyCode = $('#pixelCurrencyCode').val();
		var conversionValue = $('#pixelConversionValue').val();
		var pixelCatalogID = $('#pixelCatalogID').val();
		sendData('view', 'ids', pid, currencyCode, conversionValue, pixelCatalogID);
	}
}

function init() {
	var pixelId = $('#pixelCatalogID').val();
	$('#enablePixel').val(true);
	!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window, document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', pixelId);
	fbq('track', 'PageView');
	pixelPDP();
}

module.exports = {
	sendData: sendData,
	init: init
};
