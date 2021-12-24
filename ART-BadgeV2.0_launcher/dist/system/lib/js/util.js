"use strict";function createCommonjsModule(r){var n={exports:{}};return r(n,n.exports),n.exports}var util=createCommonjsModule(function(r,u){function o(r){return null==r}function a(r){return"string"==typeof r}function s(r){return void 0===r?"undefined":null===r?"null":Array.isArray(r)?"["+r.toString()+"]":!(r instanceof Error)&&"object"==typeof r?JSON.stringify(r,null,2):r.toString()}r.exports={isNull:function(r){return null===r},isUndefined:function(r){return void 0===r},isNullOrUndefined:o,isNumber:function(r){return"number"==typeof r},isBoolean:function(r){return"boolean"==typeof r},isString:a,isObject:function(r){return"object"==typeof r&&null!=r},isFinite:function(r){return 0==r||r!=r/2},isFunction:function(r){return"function"==typeof r},isArray:Array.isArray,exceptionWithHostPort:function(r,n,t,e,o){var i=e&&0<e?t+":"+e:t;return o&&(i+=" - Local ("+o+")"),(i=u.errnoException(r,n,i)).address=t,e&&(i.port=e),i},errnoException:function(r,n,t){var e="error",o=n+" "+e;return t&&(o+=" "+t),(o=new Error(o)).code=e,o.errno=e,o.syscall=n,o},stringToNumber:function(r,n){return r=Number(r),isNaN(r)?n:r},inherits:function(r,n){r.prototype=Object.create(n.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}})},mixin:function(r){if(o(r))throw new TypeError("target cannot be null or undefined");for(var n=1;n<arguments.length;++n){var t=arguments[n];if(!o(t))for(var e in t)t.hasOwnProperty(e)&&(r[e]=t[e])}return r},format:function(r){if(!a(r)){for(var n=[],t=0;t<arguments.length;++t)n.push(s(arguments[t]));return n.join(" ")}t=1;for(var e,o=arguments,i="",u=0,c=0;c<r.length;)if("%"===r.charAt(c)){switch(i+=r.slice(u,c),r.charAt(c+1)){case"s":e=String(o[t]);break;case"d":e=Number(o[t]);break;case"j":try{e=JSON.stringify(o[t])}catch(r){e="[Circular]"}break;case"%":i+="%",u=c+=2;continue;default:i=i+"%"+r.charAt(c+1),u=c+=2;continue}o.length<=t?i=i+"%"+r.charAt(c+1):(t++,i+=e),u=c+=2}else c++;for(i+=r.slice(u,c);t<o.length;)i+=" "+s(o[t++]);return i}}});module.exports=util;
