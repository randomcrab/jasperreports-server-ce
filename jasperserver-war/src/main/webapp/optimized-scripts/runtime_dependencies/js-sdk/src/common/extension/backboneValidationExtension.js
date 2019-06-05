define(["require","backbone.validation.original","underscore","common/util/parse/NumberUtils"],function(t){"use strict";var n=t("backbone.validation.original"),e=t("underscore"),i=t("common/util/parse/NumberUtils"),r=new i,a=n.mixin.validate;return n.mixin.validate=function(t,n){n||(n={});var i=this;return a.call(this,t,e.extend({valid:function(t,n){i.trigger("validate:"+n,i,n)},invalid:function(t,n,e){i.trigger("validate:"+n,i,n,e)}},n))},e.extend(n.validators,{doesNotContainSymbols:function(t,n,e){if(new RegExp("["+e+"]","g").test(t))return"Attribute '"+n+"' contains forbidden symbols"},integerNumber:function(t){if(!r.isNumberInt(t))return"Value is not a valid integer number"},type:function(t,n,i){function r(t){var n;return"string"==t?n=e.isString:"number"===t?n=e.isNumber:"object"===t?n=e.isObject:"boolean"===t?n=e.isBoolean:"null"===t?n=e.isNull:"undefined"===t&&(n=e.isUndefined),n}if(e.isArray(i)||(i=[i]),!i.some(function(n){return r(n)(t)}))return"'{attr}' is not {type}".replace("{attr}",n).replace("'{type}'",i.join(" "))},url:function(t){if(!/(http|https):\/\/.*\..*./.test(t))return"Value is not a valid url"},hexColor:function(t){if(!/^#[0-9a-f]{3,6}$/i.test(t))return"Value is not a valid hex color"},xRegExpPattern:function(t,n,e,i){if(!e.test(t))return"Value does not match pattern"},startsWithLetter:function(t,n,e,i){if(!t.substr(0,1).match(/[A-Za-z]/))return"Value should start with letter"},containsOnlyWordCharacters:function(t,n,e,i){if(t.search(/\W/)>=0)return"Value should contain only word characters (letters, digits and underscore)"},arrayMinLength:function(t,n,i,r){if(e.isArray(t)&&t.length<i)return"Array length is less than "+i}}),n});