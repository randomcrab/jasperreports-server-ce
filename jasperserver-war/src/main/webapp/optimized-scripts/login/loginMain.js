function setMaxDigits(i){maxDigits=i,ZERO_ARRAY=new Array(maxDigits);for(var t=0;t<ZERO_ARRAY.length;t++)ZERO_ARRAY[t]=0;bigZero=new BigInt,bigOne=new BigInt,bigOne.digits[0]=1}function BigInt(i){this.digits="boolean"==typeof i&&1==i?null:ZERO_ARRAY.slice(0),this.isNeg=!1}function biFromDecimal(i){for(var t,e="-"==i.charAt(0),s=e?1:0;s<i.length&&"0"==i.charAt(s);)++s;if(s==i.length)t=new BigInt;else{var n=i.length-s,o=n%dpl10;for(0==o&&(o=dpl10),t=biFromNumber(Number(i.substr(s,o))),s+=o;s<i.length;)t=biAdd(biMultiply(t,biFromNumber(1e15)),biFromNumber(Number(i.substr(s,dpl10)))),s+=dpl10;t.isNeg=e}return t}function biCopy(i){var t=new BigInt(!0);return t.digits=i.digits.slice(0),t.isNeg=i.isNeg,t}function biFromNumber(i){var t=new BigInt;t.isNeg=i<0,i=Math.abs(i);for(var e=0;i>0;)t.digits[e++]=i&maxDigitVal,i>>=biRadixBits;return t}function reverseStr(i){for(var t="",e=i.length-1;e>-1;--e)t+=i.charAt(e);return t}function biToString(i,t){var e=new BigInt;e.digits[0]=t;for(var s=biDivideModulo(i,e),n=hexatrigesimalToChar[s[1].digits[0]];1==biCompare(s[0],bigZero);)s=biDivideModulo(s[0],e),digit=s[1].digits[0],n+=hexatrigesimalToChar[s[1].digits[0]];return(i.isNeg?"-":"")+reverseStr(n)}function biToDecimal(i){var t=new BigInt;t.digits[0]=10;for(var e=biDivideModulo(i,t),s=String(e[1].digits[0]);1==biCompare(e[0],bigZero);)e=biDivideModulo(e[0],t),s+=String(e[1].digits[0]);return(i.isNeg?"-":"")+reverseStr(s)}function digitToHex(t){var e="";for(i=0;i<4;++i)e+=hexToChar[15&t],t>>>=4;return reverseStr(e)}function biToHex(i){for(var t="",e=(biHighIndex(i),biHighIndex(i));e>-1;--e)t+=digitToHex(i.digits[e]);return t}function charToHex(i){return i>=48&&i<=57?i-48:i>=65&&i<=90?10+i-65:i>=97&&i<=122?10+i-97:0}function hexToDigit(i){for(var t=0,e=Math.min(i.length,4),s=0;s<e;++s)t<<=4,t|=charToHex(i.charCodeAt(s));return t}function biFromHex(i){for(var t=new BigInt,e=i.length,s=e,n=0;s>0;s-=4,++n)t.digits[n]=hexToDigit(i.substr(Math.max(s-4,0),Math.min(s,4)));return t}function biFromString(i,t){var e="-"==i.charAt(0),s=e?1:0,n=new BigInt,o=new BigInt;o.digits[0]=1;for(var r=i.length-1;r>=s;r--){n=biAdd(n,biMultiplyDigit(o,charToHex(i.charCodeAt(r)))),o=biMultiplyDigit(o,t)}return n.isNeg=e,n}function biDump(i){return(i.isNeg?"-":"")+i.digits.join(" ")}function biAdd(i,t){var e;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,e=biSubtract(i,t),t.isNeg=!t.isNeg;else{e=new BigInt;for(var s,n=0,o=0;o<i.digits.length;++o)s=i.digits[o]+t.digits[o]+n,e.digits[o]=65535&s,n=Number(s>=biRadix);e.isNeg=i.isNeg}return e}function biSubtract(i,t){var e;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,e=biAdd(i,t),t.isNeg=!t.isNeg;else{e=new BigInt;var s,n;n=0;for(var o=0;o<i.digits.length;++o)s=i.digits[o]-t.digits[o]+n,e.digits[o]=65535&s,e.digits[o]<0&&(e.digits[o]+=biRadix),n=0-Number(s<0);if(-1==n){n=0;for(var o=0;o<i.digits.length;++o)s=0-e.digits[o]+n,e.digits[o]=65535&s,e.digits[o]<0&&(e.digits[o]+=biRadix),n=0-Number(s<0);e.isNeg=!i.isNeg}else e.isNeg=i.isNeg}return e}function biHighIndex(i){for(var t=i.digits.length-1;t>0&&0==i.digits[t];)--t;return t}function biNumBits(i){var t,e=biHighIndex(i),s=i.digits[e],n=(e+1)*bitsPerDigit;for(t=n;t>n-bitsPerDigit&&0==(32768&s);--t)s<<=1;return t}function biMultiply(i,t){for(var e,s,n,o=new BigInt,r=biHighIndex(i),a=biHighIndex(t),d=0;d<=a;++d){for(e=0,n=d,j=0;j<=r;++j,++n)s=o.digits[n]+i.digits[j]*t.digits[d]+e,o.digits[n]=s&maxDigitVal,e=s>>>biRadixBits;o.digits[d+r+1]=e}return o.isNeg=i.isNeg!=t.isNeg,o}function biMultiplyDigit(i,t){var e,s,n,o=new BigInt;e=biHighIndex(i),s=0;for(var r=0;r<=e;++r)n=o.digits[r]+i.digits[r]*t+s,o.digits[r]=n&maxDigitVal,s=n>>>biRadixBits;return o.digits[1+e]=s,o}function arrayCopy(i,t,e,s,n){for(var o=Math.min(t+n,i.length),r=t,a=s;r<o;++r,++a)e[a]=i[r]}function biShiftLeft(i,t){var e=Math.floor(t/bitsPerDigit),s=new BigInt;arrayCopy(i.digits,0,s.digits,e,s.digits.length-e);for(var n=t%bitsPerDigit,o=bitsPerDigit-n,r=s.digits.length-1,a=r-1;r>0;--r,--a)s.digits[r]=s.digits[r]<<n&maxDigitVal|(s.digits[a]&highBitMasks[n])>>>o;return s.digits[0]=s.digits[r]<<n&maxDigitVal,s.isNeg=i.isNeg,s}function biShiftRight(i,t){var e=Math.floor(t/bitsPerDigit),s=new BigInt;arrayCopy(i.digits,e,s.digits,0,i.digits.length-e);for(var n=t%bitsPerDigit,o=bitsPerDigit-n,r=0,a=r+1;r<s.digits.length-1;++r,++a)s.digits[r]=s.digits[r]>>>n|(s.digits[a]&lowBitMasks[n])<<o;return s.digits[s.digits.length-1]>>>=n,s.isNeg=i.isNeg,s}function biMultiplyByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,0,e.digits,t,e.digits.length-t),e}function biDivideByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,t,e.digits,0,e.digits.length-t),e}function biModuloByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,0,e.digits,0,t),e}function biCompare(i,t){if(i.isNeg!=t.isNeg)return 1-2*Number(i.isNeg);for(var e=i.digits.length-1;e>=0;--e)if(i.digits[e]!=t.digits[e])return i.isNeg?1-2*Number(i.digits[e]>t.digits[e]):1-2*Number(i.digits[e]<t.digits[e]);return 0}function biDivideModulo(i,t){var e,s,n=biNumBits(i),o=biNumBits(t),r=t.isNeg;if(n<o)return i.isNeg?(e=biCopy(bigOne),e.isNeg=!t.isNeg,i.isNeg=!1,t.isNeg=!1,s=biSubtract(t,i),i.isNeg=!0,t.isNeg=r):(e=new BigInt,s=biCopy(i)),new Array(e,s);e=new BigInt,s=i;for(var a=Math.ceil(o/bitsPerDigit)-1,d=0;t.digits[a]<biHalfRadix;)t=biShiftLeft(t,1),++d,++o,a=Math.ceil(o/bitsPerDigit)-1;s=biShiftLeft(s,d),n+=d;for(var g=Math.ceil(n/bitsPerDigit)-1,h=biMultiplyByRadixPower(t,g-a);-1!=biCompare(s,h);)++e.digits[g-a],s=biSubtract(s,h);for(var u=g;u>a;--u){var l=u>=s.digits.length?0:s.digits[u],c=u-1>=s.digits.length?0:s.digits[u-1],p=u-2>=s.digits.length?0:s.digits[u-2],f=a>=t.digits.length?0:t.digits[a],b=a-1>=t.digits.length?0:t.digits[a-1];e.digits[u-a-1]=l==f?maxDigitVal:Math.floor((l*biRadix+c)/f);for(var w=e.digits[u-a-1]*(f*biRadix+b),m=l*biRadixSquared+(c*biRadix+p);w>m;)--e.digits[u-a-1],w=e.digits[u-a-1]*(f*biRadix|b),m=l*biRadix*biRadix+(c*biRadix+p);h=biMultiplyByRadixPower(t,u-a-1),s=biSubtract(s,biMultiplyDigit(h,e.digits[u-a-1])),s.isNeg&&(s=biAdd(s,h),--e.digits[u-a-1])}return s=biShiftRight(s,d),e.isNeg=i.isNeg!=r,i.isNeg&&(e=r?biAdd(e,bigOne):biSubtract(e,bigOne),t=biShiftRight(t,d),s=biSubtract(t,s)),0==s.digits[0]&&0==biHighIndex(s)&&(s.isNeg=!1),new Array(e,s)}function biDivide(i,t){return biDivideModulo(i,t)[0]}function biModulo(i,t){return biDivideModulo(i,t)[1]}function biMultiplyMod(i,t,e){return biModulo(biMultiply(i,t),e)}function biPow(i,t){for(var e=bigOne,s=i;;){if(0!=(1&t)&&(e=biMultiply(e,s)),0==(t>>=1))break;s=biMultiply(s,s)}return e}function biPowMod(i,t,e){for(var s=bigOne,n=i,o=t;;){if(0!=(1&o.digits[0])&&(s=biMultiplyMod(s,n,e)),o=biShiftRight(o,1),0==o.digits[0]&&0==biHighIndex(o))break;n=biMultiplyMod(n,n,e)}return s}function BarrettMu(i){this.modulus=biCopy(i),this.k=biHighIndex(this.modulus)+1;var t=new BigInt;t.digits[2*this.k]=1,this.mu=biDivide(t,this.modulus),this.bkplus1=new BigInt,this.bkplus1.digits[this.k+1]=1,this.modulo=BarrettMu_modulo,this.multiplyMod=BarrettMu_multiplyMod,this.powMod=BarrettMu_powMod}function BarrettMu_modulo(i){var t=biDivideByRadixPower(i,this.k-1),e=biMultiply(t,this.mu),s=biDivideByRadixPower(e,this.k+1),n=biModuloByRadixPower(i,this.k+1),o=biMultiply(s,this.modulus),r=biModuloByRadixPower(o,this.k+1),a=biSubtract(n,r);a.isNeg&&(a=biAdd(a,this.bkplus1));for(var d=biCompare(a,this.modulus)>=0;d;)a=biSubtract(a,this.modulus),d=biCompare(a,this.modulus)>=0;return a}function BarrettMu_multiplyMod(i,t){var e=biMultiply(i,t);return this.modulo(e)}function BarrettMu_powMod(i,t){var e=new BigInt;for(e.digits[0]=1;;){if(0!=(1&t.digits[0])&&(e=this.multiplyMod(e,i)),t=biShiftRight(t,1),0==t.digits[0]&&0==biHighIndex(t))break;i=this.multiplyMod(i,i)}return e}jaspersoft.components.utils=function(i,t,e,s){var n=navigator.userAgent.toLowerCase().indexOf("msie")>-1;return{LOADING_DIALOG_DELAY:800,isElementInDom:function(i){var t=i.nextSibling,e=i.parentNode&&11!==i.parentNode.nodeType;return t||e},setInnerHtml:function(e,s,o){var r,a,d;if(this.isElementInDom(e)&&(r=e.nextSibling,a=e.parentNode,d=e.style.display,e.style.display="none",a.removeChild(e)),i(e).html(""),n&&"SELECT"==e.tagName){var g=document.createDocumentFragment();t.each(o.data,function(e){var s=document.createElement("OPTION");s.value=t.isUndefined(e.value)?e.id:e.value,i(s).html(e.label),e.selected&&s.setAttribute("selected","selected"),g.appendChild(s)}),e.appendChild(g)}else i(e).html(s(o));if(r?a.insertBefore(e,r):a.appendChild(e),e.style.display=d,n&&"SELECT"==e.tagName){var h=e.getAttribute("style");e.removeAttribute("style"),e.setAttribute("style",h)}},wait:function(t){return i.Deferred(function(i){setTimeout(i.resolve,t)})},showLoadingDialogOn:function(n,o,r){this.wait(o||this.LOADING_DIALOG_DELAY).then(t.bind(function(){"pending"==n.state()&&(e.popup.show($(s.LOADING_ID),r),i.when(n).always(t.bind(function(){this.wait(500).then(function(){e.popup.hide($(s.LOADING_ID))})},this)))},this))},createTimer:function(t){var e=new i.Deferred;return e.done(function(i){var e=(new Date).getTime(),s=e-i;console.log(t+" took time: "+s+" msec.")}),{start:function(){return this.startTime=(new Date).getTime(),this},stop:function(){return e.resolve(this.startTime),this}}}}}(jQuery,_,dialogs,ajax),define("components.utils",["jquery","underscore","components.dialogs","core.ajax"],function(i){return function(){return i.jaspersoft.components.utils}}(this));var loginBox={LOGIN_BOX_TEMPLATE_DOM_ID:"login",DOCUMENTATION_BUTTON_ID:"documentationButton",GOTO_JASPERFORGE_BUTTON_ID:"gotoJasperForge",CONTACT_SALES_BUTTON_ID:"contactSalesButton",NEED_HELP_LINK_ID:"needHelp",NEED_HELP_DIALOG_ID:"helpLoggingIn",CONTACT_SALES_URL:"http://www.jaspersoft.com/contact-us",_dom:null,_baseInitialize:function(i){this._initVars(i),this._processTemplate(),this._initHandlers(),this._warningMessage&&(this._customError.update(this._warningMessage),this._customError.removeClassName("hidden")),this._passwordExpiredDays&&this._passwordExpiredDays.setValue(this._passwordExpirationInDays)},initialize:function(i){this._baseInitialize(i)},_baseInitVars:function(i){this._showLocaleMessage=i.showLocaleMessage,this._hideLocaleMessage=i.hideLocaleMessage,this._changePasswordMessage=i.changePasswordMessage,this._cancelPasswordMessage=i.cancelPasswordMessage,this._allowUserPasswordChange=i.allowUserPasswordChange,this._showPasswordChange=i.showPasswordChange,this._allowedPasswordPattern=new RegExp(i.allowedPasswordPattern),this._passwordExpirationInDays=i.passwordExpirationInDays,this._nonEmptyPasswordMessage=i.nonEmptyPasswordMessage,this._passwordNotMatchMessage=i.passwordNotMatchMessage,this._passwordNotMatchMessage=i.passwordNotMatchMessage,this._passwordTooWeakMessage=i.passwordTooWeakMessage,this._warningMessage=i.warningMessage},_initVars:function(i){this._baseInitVars(i)},_baseProcessTemplate:function(){this._dom=$(this.LOGIN_BOX_TEMPLATE_DOM_ID),this._usernameInput=$("j_username"),this._passwordInput=$("j_password"),this._showHideLocaleAndTimezone=$("showHideLocaleAndTimezone"),this._localeAndTimeZone=$("localeAndTimeZone"),this._userLocale=$("userLocale"),this._changePassword=$("changePassword"),this._j_newpassword1=$("j_newpassword1"),this._j_newpassword2=$("j_newpassword2"),this._showHideChangePassword=$("showHideChangePassword"),this._passwordExpiredDays=this._dom.select('input[name="passwordExpiredDays"]')[0],this._customError=$("customError"),this._loginForm=this._dom.up("form"),this.documentationButton=$(this.DOCUMENTATION_BUTTON_ID),this.gotoJasperForge=$(this.GOTO_JASPERFORGE_BUTTON_ID),this.needHelpLink=$(this.NEED_HELP_LINK_ID),this.needHelpDialog=$(this.NEED_HELP_DIALOG_ID)},_processTemplate:function(){this._baseProcessTemplate()},_initHandlers:function(){this._showHideLocaleAndTimezone.observe("click",this._localeAndTimezoneShowHideHandler.bindAsEventListener(this)),this._allowUserPasswordChange&&(this._showHideChangePassword.observe("click",this._changePasswordShowHideHandler.bindAsEventListener(this)),jQuery(this._loginForm).on("submit",this._submitValidateHandler.bind(this))),this._showPasswordChange&&this._changePasswordShowHideHandler(),window.webHelpModule&&this.documentationButton&&this.documentationButton.observe("click",function(i){webHelpModule.displayWebHelp()}.bindAsEventListener(this)),this.gotoJasperForge&&this.gotoJasperForge.observe("click",function(i){window.name="",window.open("http://jasperforge.org","jasperforge.org").focus()}.bindAsEventListener(this)),this.needHelpLink.observe("click",function(i){dialogs.popup.show(this.needHelpDialog)}.bindAsEventListener(this)),[this.needHelpDialog].each(function(i){i.select(layoutModule.BUTTON_PATTERN)[0].observe("click",function(t){dialogs.popup.hide(i)})})},_submitValidateHandler:function(i){if(this._customError.addClassName("hidden"),!this._changePassword.hasClassName("hidden")){ValidationModule.validate([{validator:this._emptyPasswordValidator.bind(this),element:this._j_newpassword1},{validator:this._emptyPasswordValidator.bind(this),element:this._j_newpassword2},{validator:this._confirmationPasswordNotMatchValidator.bind(this),element:this._j_newpassword2},{validator:this._confirmationPasswordTooWeakValidator.bind(this),element:this._j_newpassword1}])||i.preventDefault()}},_emptyPasswordValidator:function(i){var t=!0,e="";return i.blank()&&(t=!1,e=this._nonEmptyPasswordMessage),{isValid:t,errorMessage:e}},_confirmationPasswordNotMatchValidator:function(i){var t=!0,e="";return i!=this._j_newpassword1.getValue()&&(t=!1,e=this._passwordNotMatchMessage),{isValid:t,errorMessage:e}},_confirmationPasswordTooWeakValidator:function(i){return{isValid:this._allowedPasswordPattern.test(i),errorMessage:this._passwordTooWeakMessage}},_changePasswordShowHideHandler:function(){this._changePassword.toggleClassName("hidden"),this._changePassword.hasClassName("hidden")?(this._showHideChangePassword.update(this._changePasswordMessage),this._j_newpassword1.setValue(""),this._j_newpassword2.setValue("")):(this._showHideChangePassword.update(this._cancelPasswordMessage),this._j_newpassword1.focus())},_localeAndTimezoneShowHideHandler:function(){this._localeAndTimeZone.toggleClassName("hidden"),this._localeAndTimeZone.hasClassName("hidden")?this._showHideLocaleAndTimezone.update(this._showLocaleMessage):(this._showHideLocaleAndTimezone.update(this._hideLocaleMessage),this._userLocale.focus())}};define("components.loginBox",["prototype","components.webHelp","components.dialogs","components.utils","core.layout"],function(i){return function(){return i.loginBox}}(this)),function(i){i.jCryption=function(t,e){var s=this;s.$el=i(t),s.el=t,s.$el.data("jCryption",s),s.init=function(){if(s.options=i.extend({},i.jCryption.defaultOptions,e),$encryptedElement=i("<input />",{type:"hidden",name:s.options.postVariable}),!1!==s.options.submitElement)var t=s.options.submitElement;else var t=s.$el.find(":input:submit");t.bind(s.options.submitEvent,function(){return i(this).attr("disabled",!0),s.options.beforeEncryption()&&i.jCryption.getKeys(s.options.getKeysURL,function(t){i.jCryption.encrypt(s.$el.serialize(),t,function(t){$encryptedElement.val(t),i(s.$el).find(s.options.formFieldSelector).attr("disabled",!0).end().append($encryptedElement).submit()})}),!1})},s.init()},i.jCryption.getKeys=function(t,e){var s=function(i,t,e){setMaxDigits(parseInt(e,10)),this.e=biFromHex(i),this.m=biFromHex(t),this.chunkSize=2*biHighIndex(this.m),this.radix=16,this.barrett=new BarrettMu(this.m)};i.getJSON(t,function(t){var n=new s(t.e,t.n,t.maxdigits);i.isFunction(e)&&e.call(this,n)})},i.jCryption.encrypt=function(t,e,s){for(var n=0,o=0;o<t.length;o++)n+=t.charCodeAt(o);var r="0123456789abcdef",a="";a+=r.charAt((240&n)>>4)+r.charAt(15&n);for(var d=a+t,g=[],h=0;h<d.length;)g[h]=d.charCodeAt(h),h++;for(;g.length%e.chunkSize!=0;)g[h++]=0;!function(t){function n(){r=new BigInt,o=0;for(var g=a;g<a+e.chunkSize;++o)r.digits[o]=t[g++],r.digits[o]+=t[g++]<<8;var h=e.barrett.powMod(r,e.e),u=16==e.radix?biToHex(h):biToString(h,e.radix);if(d+=u+" ",(a+=e.chunkSize)<t.length)setTimeout(n,1);else{var l=d.substring(0,d.length-1);if(!i.isFunction(s))return l;s(l)}}var o,r,a=0,d="";setTimeout(n,1)}(g)},i.jCryption.defaultOptions={submitElement:!1,submitEvent:"click",getKeysURL:"main.php?generateKeypair=true",beforeEncryption:function(){return!0},postVariable:"jCryption",formFieldSelector:":input"},i.fn.jCryption=function(t){return this.each(function(){new i.jCryption(this,t)})}}(jQuery);var biRadixBase=2,biRadixBits=16,bitsPerDigit=biRadixBits,biRadix=65536,biHalfRadix=biRadix>>>1,biRadixSquared=biRadix*biRadix,maxDigitVal=biRadix-1,maxInteger=9999999999999998,maxDigits,ZERO_ARRAY,bigZero,bigOne,dpl10=15,highBitMasks=new Array(0,32768,49152,57344,61440,63488,64512,65024,65280,65408,65472,65504,65520,65528,65532,65534,65535),hexatrigesimalToChar=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"),hexToChar=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"),lowBitMasks=new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);define("jquery.jcryption",["jquery"],function(i){return function(){return i.jQuery}}(this)),define("common/extension/jQueryjCryptionExtensions",["require","jquery.jcryption"],function(i){"use strict";var t=i("jquery.jcryption");return t.jCryption.encryptKeyWithoutRedundancy=function(i,e,s){if(""===i)return t.isFunction(s)?void s(i):i;for(var n=0,o=0;o<i.length;o++)n+=i.charCodeAt(o);for(var r=[],a=0;a<i.length;)r[a]=i.charCodeAt(a),a++;for(;r.length%e.chunkSize!=0;)r[a++]=0;!function(i){function n(){r=new BigInt,o=0;for(var g=a;g<a+e.chunkSize;++o)r.digits[o]=i[g++],r.digits[o]+=i[g++]<<8;var h=e.barrett.powMod(r,e.e),u=16==e.radix?biToHex(h):biToString(h,e.radix);if(d+=u+" ",(a+=e.chunkSize)<i.length)setTimeout(n,1);else{var l=d.substring(0,d.length-1);if(!t.isFunction(s))return l;s(l)}}var o,r,a=0,d="";setTimeout(n,1)}(r)},t}),define("common/util/encrypter",["require","common/extension/jQueryjCryptionExtensions"],function(i){"use strict";var t=i("common/extension/jQueryjCryptionExtensions"),e={};e.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e.encode16BitString=function(i){var t,s,n,o,r,a,d,g,h,u,l,c,p=[],f="",b=e.code;if(l=i,(u=l.length%2)>0)for(;u++<2;)f+="===",l+="\0";for(u=0;u<l.length;u+=2)t=l.charCodeAt(u),s=l.charCodeAt(u+1),n=t<<16|s,o=n>>26&63,r=n>>20&63,a=n>>14&63,d=n>>8&63,g=n>>2&63,h=3&n,p[u/2]=b.charAt(o)+b.charAt(r)+b.charAt(a)+b.charAt(d)+b.charAt(g)+b.charAt(h);return c=p.join(""),c=c.slice(0,c.length-f.length)+f},e.decode16BitString=function(i){var t,s,n,o,r,a,d,g,h,u,l,c,p=[],f=e.code;c=i;for(var b=0;b<c.length;b+=6)r=f.indexOf(c.charAt(b)),a=f.indexOf(c.charAt(b+1)),d=f.indexOf(c.charAt(b+2)),g=f.indexOf(c.charAt(b+3)),h=f.indexOf(c.charAt(b+4)),u=f.indexOf(c.charAt(b+5)),l=r<<26|a<<20|d<<14|g<<8|h<<2|3&u,t=l>>>24&255,s=l>>>16&255,n=l>>>8&255,o=255&l,p[b/6]=String.fromCharCode(t<<8|s,n<<8|o),64==g&&(p[b/6]=p[b/6]=String.fromCharCode(t<<8|s));return p.join("")};var s={encryptData:function(i,e){if(!i)return void e();t.jCryption.getKeys("GetEncryptionKey",function(t){var n=t,o=[];for(var r in i)o.push(r);var a={};s._encryptDataRecursive(i,o,0,n,a,e)})},_encryptDataRecursive:function(i,e,n,o,r,a){if(e&&e.length!=n){var d=encodeURIComponent(i[e[n]]),g=d.split("").reverse().join("");t.jCryption.encryptKeyWithoutRedundancy(g,o,function(t){r[e[n]]=t,e.length==n+1?a(r):s._encryptDataRecursive(i,e,n+1,o,r,a)})}}};return s}),define("login.form",["jquery","jrs.configs","common/util/encrypter"],function(i,t,e){i(function(){var s=i("#j_username"),n=i("#j_password_pseudo"),o=i("#orgId");webHelpModule.setCurrentContext("login");var r=function(s){if(t.isEncryptionOn){var o={j_password:n.val()};if("undefined"!=typeof doesAllowUserPasswordChange&&doesAllowUserPasswordChange){var r=i("#j_newpassword1_pseudo").val(),a=i("#j_newpassword2_pseudo").val();i.trim(r)&&(o.j_newpassword1=r),i.trim(a)&&(o.j_newpassword2=a)}e.encryptData(o,function(t){for(var e in t)i("#"+e).val(t[e]),i("#"+e+"_pseudo").val("");i("#loginForm").submit()})}else i("#j_password").val(n.val()),i("#j_newpassword1").val(i("#j_newpassword1_pseudo").val()),i("#j_newpassword2").val(i("#j_newpassword2_pseudo").val()),i("#loginForm").submit();s.preventDefault()};i("#submitButton").click(r).removeAttr("disabled"),s.keypress(function(i){13==(i.keyCode||i.which)&&r(i)}),n.keypress(function(i){13==(i.keyCode||i.which)&&r(i)}),o.keypress(function(i){13==(i.keyCode||i.which)&&r(i)})})}),define("login/loginMain",["require","!domReady","login.form","jquery","components.loginBox","jrs.configs"],function(i){"use strict";var t=i("!domReady");i("login.form");var e=i("jquery"),s=i("components.loginBox"),n=i("jrs.configs");window.location.hash&&(window.localStorage.previousPageHash=window.location.hash),t(function(){if(isIPad()&&e("#frame").hide(),n.isProVersion&&(s._initVars=function(i){this._baseInitVars(i),this._organizationId=i.organizationId,this._singleOrganization=i.singleOrganization},s._processTemplate=function(){this._baseProcessTemplate(),this._organizationIdLabel=this._dom.select('label[for="orgId"]')[0],this._organizationIdInput=e("#orgId")},s.initialize=function(i){var t=e("#j_username");this._baseInitialize(i),this._singleOrganization||this._organizationId?this._organizationIdInput.val(this._organizationId):this._organizationIdLabel.removeClassName("hidden"),""===t.val()&&""===e("#j_password_pseudo").val()&&(this._singleOrganization?t.focus():""===this._organizationIdInput.val()&&this._organizationIdInput.focus())}),s.initialize(n.loginState),isIPad()){switch(window.orientation){case 0:e("h2.textAccent").css("font-size","14px").parent().css("width","39%"),e("#copy").css("width","600px"),e("#loginForm").css({left:"524px",right:""});break;case 90:case-90:e("h2.textAccent").css("font-size","16px").parent().css("width","46%"),e("#copy").css("width","766px")}e("#frame").show(),window.addEventListener("orientationchange",function(i){switch(window.orientation){case 0:e("h2.textAccent").css("font-size","14px").parent().css("width","39%"),e("#copy").css("width","600px"),e("#loginForm").css({left:"524px",right:""});break;case 90:case-90:e("h2.textAccent").css("font-size","16px").parent().css("width","46%"),e("#copy").css("width","766px"),e("#loginForm").css({left:"",right:"-10px"})}})}})});