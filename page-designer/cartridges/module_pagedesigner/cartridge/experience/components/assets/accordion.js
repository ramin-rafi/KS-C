'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * takes a string and convert it to a string with no language specific special characters
 * @param {string} val string of characters
 * @returns {string} string with no language specific special characters
*/
function processSpecialChars(val) {
    var charArray = val.split('');
    var chars = ['é', 'è', 'ê', 'ä', 'ü', 'ö', 'Ä', 'Ü', 'Ö', 'ç', 'Ç', 'ô', 'È', 'É', 'Ê', 'Ú', 'Û', '²'];
    var vals = ['e', 'e', 'e', 'a', 'u', 'o', 'a', 'u', 'o', 'c', 'c', 'o', 'e', 'e','e','u','u','2' ];

    for(var i=0; i<charArray.length; i++){
        var index = chars.indexOf(charArray[i]);
        if(index != -1){
            charArray[i] = vals[index];
        }
    }
    return charArray.join('');
}

/**
 * Converts given string to an html id format
 * @param {string} title Title string
 * @returns {string} string with no spaces (to be used as id)
 */
function convertToID(title) {
    title = processSpecialChars(title);
    title = title.replace(/\s+/g, '-').toLowerCase();
    return title+"-service";
}

/**
 * Render logic for the assets.headlinebanner.
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    if (content.addClass) {
        model.addClass = content.addClass;
    }

    if (content.parentGroupName) {
        model.parentGroupName = content.parentGroupName;
    }

    if (content.idHash) {
        model.idHash = content.idHash;
    }

    if (content.titleHeading) {
        model.titleHeading = content.titleHeading;
        model.cont_id = convertToID(model.titleHeading);
    }

    if (content.accordionDescription) {
        model.accordionDescription = content.accordionDescription;
    }

    if(content.accordionContentAsset) {
        model.accordionContentAsset = content.accordionContentAsset;
    }

    return new Template('experience/components/assets/accordion').render(model).text;
};
