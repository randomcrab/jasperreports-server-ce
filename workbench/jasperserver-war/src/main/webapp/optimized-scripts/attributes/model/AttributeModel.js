define(["require","exports","module","underscore","jquery","runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension","bundle!AttributeBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage","backbone.epoxy","../../attributes/enum/permissionMasksEnum","../../attributes/enum/validationRulesEnum","./validation/baseProfileAttributeValidation"],function(t,e,i){var n=t("underscore"),r=t("jquery"),s=t("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension"),a=t("bundle!AttributeBundle"),o=t("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),u=t("backbone.epoxy"),d=t("../../attributes/enum/permissionMasksEnum"),l=t("../../attributes/enum/validationRulesEnum"),h=t("./validation/baseProfileAttributeValidation"),c=o.extend({bundle:a}),m=l.MAX_ATTRIBUTE_NAME_LENGTH,f=l.MAX_ATTRIBUTE_VALUE_LENGTH,b=u.Model.extend({defaults:{id:void 0,name:void 0,value:"",description:"",inherited:!1,permissionMask:1,secure:!1},constructor:function(){this._initModelWithPermissionDefaults&&this._initModelWithPermissionDefaults(),u.Model.apply(this,arguments)},initialize:function(){this.get("id")||this.setId(),this.validateSameNames=!1,this.setState("originalState"),this.setState("confirmedState")},url:function(){var t=encodeURIComponent(this.id).replace(/'/g,"%27");return this.collection.url(this.isNew()?"":t)},validation:{name:h.concat([{fn:function(){if(this.attr){for(var t,e,i=this.attr.length,r=0;r<i;r++){if(e=this.attr[r],n.defaults(e,this.defaults),this.holder===e.holder&&this.get("inherited")===e.inherited){t="attributes.error.attribute.name.already.exist";break}if(e.inherited&&e.permissionMask===d.READ_ONLY){t="attributes.error.attribute.name.already.exist.at.higher.level";break}}return this.attr=null,this.holder=null,t&&new c(t)}}},{fn:function(){if(this.validateIfSecure)return new c("attributes.error.attribute.secure.renaming.not.allowed")}}]),value:[{maxLength:f,msg:new c("attributes.error.attribute.value.too.long",f)},{fn:function(){if(this.validateIfSecure)return this.validateIfSecure=!1," "}}],description:[{maxLength:m,msg:new c("attributes.error.attribute.description.too.long",m)}]},setId:function(){var t=this.get("name");t!==this.get("id")&&this.set("id",t)},toggleSameNamesValidation:function(){this.validateSameNames=!this.validateSameNames},resetField:function(t){this.set(t,this.defaults[t])},reset:function(t,e){var i={};return e=this.getState(e),i[t]=e[t],this.set(t?i:e),this},isRenamed:function(){return this.get("name")!==this.get("id")},isOriginallyInherited:function(){return this.originalState.inherited},isOverridden:function(){return!this.compareAttribute("inherited")},compareAttribute:function(t){return this.originalState[t]===this.confirmedState[t]},setState:function(t,e){e=e||this.attributes,this[t||"originalState"]=n.clone(e)},getState:function(t){return this[t||"originalState"]},trimAttrs:function(t,e){n.each(t,function(t){var i=this.get(t);this.set(t,r.trim(i),e)},this)},toJSON:function(t){t=t||{};var e=u.Model.prototype.toJSON.apply(this,arguments);return t.omitValue&&this.validateSecureValue()&&n.omit(e,"value")||e},confirmState:function(t){this.stateConfirmed=t||!0},isStateConfirmed:function(){return this.stateConfirmed},validateSecureValue:function(){var t=n.isEmpty(this.get("value")),e=this.get("secure");return!(this.isNew()||this.isOverridden())&&e&&t}});n.extend(b.prototype,s.mixin),i.exports=b});