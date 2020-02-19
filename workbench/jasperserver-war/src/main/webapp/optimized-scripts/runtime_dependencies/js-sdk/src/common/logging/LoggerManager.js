define(["require","exports","module","underscore","./Log","./Level","./appender/ConsoleAppender"],function(e,t,n){var s=e("underscore"),i=e("./Log"),r=e("./Level"),o=e("./appender/ConsoleAppender"),a={console:o},l=function(e){this.initialize(e||{})};s.extend(l.prototype,{defaults:function(){return{enabled:!1,level:"error",appenders:{},appenderInstances:{},loggers:{}}},initialize:function(e){this.attributes=s.defaults(e,this.defaults());var t={};s.each(a,function(e,n){t[n]=new e}),this.set("appenderInstances",t)},get:function(e){return this.attributes[e]},set:function(e,t){this.attributes[e]=t},register:function(e){var t={id:"root"};if("string"==typeof e&&""!==e?t.id=e:e&&e.hasOwnProperty("id")&&(t.id=e.id),!this.get("loggers").hasOwnProperty(t.id)){var n=this.get("loggers");n[t.id]=new i(t,s.bind(this._processLogItem,this)),this.set("loggers",n)}return this.get("loggers")[t.id]},disable:function(){this.set("enabled",!1)},enable:function(e){e&&this.set("level",r.getLevel(e)),this.set("enabled",!0)},setLevel:function(e){this.set("level",e)},_processLogItem:function(e){this.get("enabled")&&e.level.isGreaterOrEqual(this.get("level"))&&this._appendLogItem(e)},_appendLogItem:function(e){var t=this.get("appenders"),n=this.get("appenderInstances");for(var s in t)n.hasOwnProperty(t[s])&&n[t[s]].write(e)}}),n.exports=l});