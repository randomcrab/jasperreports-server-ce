!function(t,n){"function"==typeof define&&define.amd?define([],t):(n.logging||(n.logging={}),n.logging.LogItem=t())}(function(){"use strict";function t(t){var n=t.getHours().toString(),i=t.getMinutes().toString(),e=t.getSeconds().toString(),o=t.getMilliseconds();return 1==n.length&&(n="0"+n),1==i.length&&(i="0"+i),1==e.length&&(e="0"+e),n+":"+i+":"+e+"."+o}function n(t){for(var n in t)if(t.hasOwnProperty(n)){if("args"===n)for(var i=0,e=t[n].length;i<e;i++)t[n][i]instanceof Error&&(t[n][i]=t[n][i].message);this[n]=t[n]}}return n.prototype.toArray=function(){var n=[];return n.push(t(this.time)),n.push("["+this.id+"]"),"unknown"!==this.file&&n.push("["+this.file+":"+this.line+"]"),n.push("["+this.level.toString()+"] -"),n=n.concat(this.args)},n},this);