define(["require","jquery","underscore","bi/repository/model/RepositoryResourceModel","dataSource/model/BaseDataSourceModel","bundle!jasperserver_messages","settings!userTimeZones","backbone","text!dataSource/template/nameAndDescriptionTemplate.htm","text!dataSource/template/saveLocationTemplate.htm","text!dataSource/template/timezoneTemplate.htm","text!dataSource/template/dialog/selectFromRepository.htm","components.dialogs","text!dataSource/template/testConnectionTemplate.htm","backbone.validation"],function(e){"use strict";var t,a,i=e("jquery"),n=e("underscore"),s=e("bi/repository/model/RepositoryResourceModel"),o=e("dataSource/model/BaseDataSourceModel"),r=e("bundle!jasperserver_messages"),d=e("settings!userTimeZones"),l=e("backbone"),c=(e("text!dataSource/template/nameAndDescriptionTemplate.htm"),e("text!dataSource/template/saveLocationTemplate.htm"),e("text!dataSource/template/timezoneTemplate.htm")),m=(e("text!dataSource/template/dialog/selectFromRepository.htm"),e("components.dialogs")),p=e("text!dataSource/template/testConnectionTemplate.htm"),u=e("backbone.validation");return l.View.extend({PAGE_TITLE_NEW_MESSAGE_CODE:void 0,PAGE_TITLE_EDIT_MESSAGE_CODE:void 0,modelConstructor:o,events:{"keyup input[type='text'], input[type='password'], textarea, select":"updateModelProperty","change input[type='text'], input[type='password'], input[type='radio'], input[type='checkbox'], textarea, select":"updateModelProperty","click #testDataSource":"testConnection","click [name=testConnectionMessageDetails]":"showTestConnectionMessageDetails"},initialize:function(e){this.options=e,this.isEditMode=e.isEditMode,this.timezones=e.timezones?e.timezones:d;var t={};if(e.dataSource&&(t=n.extend(t,e.dataSource)),this.model=new this.modelConstructor(t,e),u.bind(this,{valid:this.fieldIsValid,invalid:this.fieldIsInvalid,forceUpdate:!0,selector:"name"}),this.model.initialization){var a=this;this.model.initialization.done(function(){a.render.apply(a)})}else this.render();this.setPageTitle()},testConnection:function(){if(!0!==t){var e,i,n=this.model.testConnection(),s=this;n&&(t=!0,i=s.$el.find("#testDataSource"),i.addClass("disabled"),e=this.$el.find("[name=testConnectionMessage]"),e.removeClass("warning success").addClass("hidden"),e.parent().addClass("error"),e.find("a").addClass("hidden"),n.done(function(){e.addClass("success").find("span").text(r["resource.dataSource.connectionState.passed"])}).fail(function(t){var i=s.getTestConnectionErrorMessage(t);e.addClass("warning").find("span").text(i.text),i.details&&(e.find("a").removeClass("hidden"),a=i.details)}).always(function(){t=!1,e.removeClass("hidden"),i.removeClass("disabled")}))}},showTestConnectionMessageDetails:function(){m.errorPopup.show(a)},getTestConnectionErrorMessage:function(e){var t=!1,a=r["resource.dataSource.connectionState.failed"],i=!1;try{t=JSON.parse(e.responseText)}catch(t){i=e.responseText}return t&&(t.parameters&&t.parameters[2]&&(a=t.parameters[2]),t.parameters&&t.parameters[3]&&(i=t.parameters[3])),{text:a,details:i}},updateModelProperty:function(e){var t=i(e.target),a={},n=t.attr("name"),o="checkbox"===t.attr("type")?t.is(":checked"):i.trim(t.val());if(a[n]=o,this.model.set(a),!this.isEditMode)if("name"===n){var r=s.generateResourceName(this.model.get("label"));o!==r&&(this._idUpdatedManually=!0)}else if("label"===n&&!this._idUpdatedManually){var d=s.generateResourceName(o);this.model.set("name",d),this.$("input[name='name']").val(d)}this.model.validate(a)},render:function(){return this.$el.empty(),this},renderTimezoneSection:function(){this.$el.append(n.template(c,this.templateData()))},renderTestConnectionSection:function(){this.$el.append(n.template(p,this.templateData()))},renderOrAddAnyBlock:function(e,t){if(n.isString(t)){try{t=i(t)}catch(e){t=!1}if(!t)return!1}var a=t.first().attr("name");return!!a&&(e.find("[name="+a+"]").length>0?e.find("[name="+a+"]").empty().append(t.children()):e.append(t),!0)},templateData:function(){return{_:n,i18n:r,modelAttributes:n.clone(this.model.attributes),timezones:this.timezones,isEditMode:this.isEditMode}},setPageTitle:function(){var e,t=i("#display .showingToolBar > .content > .header > .title");e=this.isEditMode?r[this.PAGE_TITLE_EDIT_MESSAGE_CODE]+": "+this.model.get("label"):r[this.PAGE_TITLE_NEW_MESSAGE_CODE],t.text(e)},fieldIsValid:function(e,t,a){var i=e.$("["+a+'="'+t+'"]').parent();i.removeClass("error"),i.find(".message.warning").text("")},fieldIsInvalid:function(e,t,a,i){if(!0!==a){var n=e.$("["+i+'="'+t+'"]').parent();n.addClass("error"),n.find(".message.warning").text(a)}},validField:function(e){var t=this.$(e).parent();t.removeClass("error"),t.find(".message.warning").text("")},invalidField:function(e,t){var a=this.$(e).parent();a.addClass("error"),a.find(".message.warning").text(t.toString())},remove:function(){return i("div[id^='selectFromRepository1'], div[id^='selectFromRepository2']").remove(),u.unbind(this),l.View.prototype.remove.call(this),this}})});