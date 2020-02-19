define(["require","exports","module","jquery","underscore","backbone","../model/ImportModel","../model/ImportStateModel","../enum/importPendingStatesEnum","../enum/brokenDependencyStrategyEnum","../../export/view/LoadingDialog","./MergeTenantDialogView","./ImportDependentResourcesDialogView","./ImportWarningsDialogView","../factory/warningsFactory","runtime_dependencies/js-sdk/src/common/component/notification/Notification","runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin","text!../template/importTemplate.htm","bundle!ImportExportBundle","bundle!CommonBundle","runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory","settings!treeComponent","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","../enum/secureKeyTypeEnum","../enum/importRestErrorCodesEnum","../factory/importErrorMessageFactory"],function(e,t,i){function o(){var e=this.stateModel.get("warnings");return c.map(e,function(e){return T(e)})}function n(e,t){t=t||"warning";var i=o.call(this);"import.finished"!==e||c.isEmpty(i)||this.warningsDialogView.open({items:i}),this.notification.show({delay:!1,message:V.create(e),type:t}),this.trigger("import:finished",this.model.get("organization")),this.model.reset(this.type)}function r(){var e=this.stateModel.get("error");e.errorCode===p.BROKEN_DEPS?this.dependentResourcesDialogView.open({items:e.parameters}):e.errorCode===p.TENANT_MISMATCH&&this.mergeTenantDialogView.open({fileTenantId:e.parameters[0],selectedTenantId:this.model.get("organization")})}function s(e,t){return function(i){e.model.set("brokenDependencies",t),e.doImport()}}function a(e){this.model.cancel(),this.stateModel.set("phase",e)}var l=e("jquery"),c=e("underscore"),d=e("backbone"),h=e("../model/ImportModel"),m=e("../model/ImportStateModel"),p=e("../enum/importPendingStatesEnum"),u=e("../enum/brokenDependencyStrategyEnum"),g=e("../../export/view/LoadingDialog"),y=e("./MergeTenantDialogView"),E=e("./ImportDependentResourcesDialogView"),f=e("./ImportWarningsDialogView"),T=e("../factory/warningsFactory"),D=e("runtime_dependencies/js-sdk/src/common/component/notification/Notification"),w=e("runtime_dependencies/js-sdk/src/common/view/mixin/epoxyViewMixin"),v=e("text!../template/importTemplate.htm"),I=e("bundle!ImportExportBundle"),S=e("bundle!CommonBundle"),C=e("runtime_dependencies/bi-repository/src/bi/repository/dialog/resourceChooser/RepositoryChooserDialogFactory"),_=e("settings!treeComponent"),b=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),F=e("../enum/secureKeyTypeEnum"),k=e("../enum/importRestErrorCodesEnum"),V=e("../factory/importErrorMessageFactory"),R=d.View.extend({tagName:"form",className:"import-view",id:"importDataFile",events:{"change input[type='file']":"validateFile","change input.jr-jDefaultKey, input.jr-jKeyValue, input.jr-jKeyFile":"_onKeyTypeChange","input input.jr-jSecretKey":"_onSecretKeyInput","input input.jr-jSecretUri":"_onSecretFileInput","click button.jr-jRepositoryBrowserButton":"_onRepositoryBrowserButtonClick","click .checkBox label":"_clickOnCheckbox"},computeds:{isKeyUseValue:{deps:["keyType"],get:function(e){return e===F.VALUE}},isKeyUseFile:{deps:["keyType"],get:function(e){return e===F.FILE}}},initialize:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.model||(this.model=new h(null,{form:this.el})),this.stateModel=new m,this.loadingDialog=new g({content:S["dialog.overlay.loading"]});var i=C.getDialog("item");this.keyFileDialog=t.keyFileDialog||new i({disableListTab:!0,treeBufferSize:parseInt(_.treeLevelLimit,10),resourcesTypeToSelect:[b.SECURE_FILE]}),this.keyFileDialog.on("close",function(){if(e.keyFileDialog.selectedResource&&e.keyFileDialog.selectedResource.resourceUri){var t=e.keyFileDialog.selectedResource.resourceUri;e.model.set("secretUri",t),e._clearSecureKeyErrors()}}),this.mergeTenantDialogView=new y,this.dependentResourcesDialogView=new E,this.warningsDialogView=new f,this.notification=new D,this.listenTo(this.stateModel,"change:phase",this._handleImportPhase,this);var o={delay:!1,message:I["import.error.cancelled"]},n={delay:!1,message:I["import.error.unexpected"]};this.listenTo(this.model,"change",this._onModelChange),this.listenTo(this.model,"error:notFound",c.bind(this.notification.show,this.notification,o)),this.listenTo(this.stateModel,"error:notFound",c.bind(this.notification.show,this.notification,o)),this.listenTo(this.model,"error:internalServerError",c.bind(this.notification.show,this.notification,n)),this.listenTo(this.stateModel,"error:internalServerError",c.bind(this.notification.show,this.notification,n)),this.listenTo(this.model,"error",c.bind(this.loadingDialog.close,this.loadingDialog)),this.listenTo(this.stateModel,"error",c.bind(this.loadingDialog.close,this.loadingDialog)),this.listenTo(this.mergeTenantDialogView,"button:import",function(){this.model.set("mergeOrganization",!0),this.doImport()},this),this.listenTo(this.mergeTenantDialogView,"button:cancel",c.bind(a,this,m.STATE.CANCELLED)),this.listenTo(this.dependentResourcesDialogView,"button:skip",s(this,u.SKIP)),this.listenTo(this.dependentResourcesDialogView,"button:include",s(this,u.INCLUDE)),this.listenTo(this.dependentResourcesDialogView,"button:cancel",c.bind(a,this,m.STATE.CANCELLED)),this.epoxifyView()},render:function(e){return this.type=e.type,this.model.reset(this.type,{organization:e.tenantId}),this.$el.html(c.template(v)({i18n:I,i18n2:S,model:c.extend(this.model.toJSON(),{secureKeyTypes:F})})),this.applyEpoxyBindings(),this},validateFile:function(e){this.model.set("fileName",l(e.target).val());var t=l(e.target),i=t.parent();this.model.isValid(!0)?i.removeClass("error"):i.addClass("error")},doImport:function(){var e=this,t=new l.Deferred,i=this;return this.loadingDialog.open(),this.model.isValid(!0)?t=this.model.save().fail(function(t){e._onImportFail(t)}).always(function(e){i.stateModel.set(e)}):t.reject(),t},_onImportFail:function(e){var t=e.errorCode;t===k.INVALID_SECRET_KEY?this.model.set("invalidKeyError",I["import.invalid.secretKey"]):t===k.INVALID_SECRET_FILE_CONTENT?this.model.set("invalidSecureFileContentError",I["import.invalid.secretUri.secretFile"]):t===k.INVALID_SECRET_FILE?this.model.set("invalidSecureFileContentError",I["import.invalid.secretUri"]):t===k.INVALID_SECRET_KEY_LENGTH&&this.model.set("invalidSecureFileContentError",I["import.invalid.secretKey.length"])},_handleImportPhase:function(){var e=this.stateModel.get("phase");e!==m.STATE.INPROGRESS&&this.loadingDialog.close(),e===m.STATE.READY?n.call(this,"import.finished","success"):e===m.STATE.FAILED?n.call(this,this.stateModel.get("error").errorCode):e===m.STATE.CANCELLED?n.call(this,"import.error.cancelled"):e===m.STATE.PENDING&&r.call(this)},_onRepositoryBrowserButtonClick:function(){this.keyFileDialog.open()},_clearSecureKeyErrors:function(){this.model.set({invalidKeyError:"",invalidSecureFileContentError:""})},_onKeyTypeChange:function(e){var t=e.target.value;this.model.set("keyType",t),this._clearSecureKeyErrors()},_onSecretKeyInput:function(e){var t=e.target.value;this.model.set("secretKey",t,{silent:!0}),this._clearSecureKeyErrors()},_onSecretFileInput:function(e){var t=e.target.value;this.model.set("secretUri",t,{silent:!0}),this._clearSecureKeyErrors()},_clickOnCheckbox:function(e){var t=l(e.target).next();t[0].disabled||(t[0].checked=!t[0].checked,t.trigger("change"))},_onModelChange:function(){this.model.isValid(!0)}});c.extend(R.prototype,w),i.exports=R});