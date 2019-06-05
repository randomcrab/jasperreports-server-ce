define(["require","underscore","bundle!all","common/util/browserDetection","bi/repository/model/RepositoryResourceModel","common/component/dialog/DialogWithModelInputValidation","text!dataSource/saveDialog/template/baseSaveDialogTemplate.htm","settings!treeComponent","bi/repository/factory/repositoryTreeFactory","bi/repository/enum/repositoryResourceTypes"],function(e){"use strict";var o=e("underscore"),t=e("bundle!all"),i=(e("common/util/browserDetection"),e("bi/repository/model/RepositoryResourceModel")),a=e("common/component/dialog/DialogWithModelInputValidation"),r=e("text!dataSource/saveDialog/template/baseSaveDialogTemplate.htm"),s=e("settings!treeComponent"),n=e("bi/repository/factory/repositoryTreeFactory"),l=e("bi/repository/enum/repositoryResourceTypes");return a.extend({theDialogIsOpen:!1,autoUpdateResourceID:!0,saveDialogTemplate:r,constructor:function(e){e||(e={}),this.options=e;var i=this.extendModel(this.options.model),r=this._getLabelForSaveButton(i);this.autoUpdateResourceID=!this.options.isEditMode,this.preSelectedFolder=e.parentFolderUri,a.prototype.constructor.call(this,{skipLocation:!!e.skipLocation,modal:!0,model:i,minHeight:500,minWidth:440,setMinSizeAsSize:!0,resizable:!e.skipLocation,additionalCssClasses:"dataSourceSaveDialog"+(e.skipLocation?" no-minheight":""),title:t["resource.datasource.saveDialog.save"],content:o.template(this.saveDialogTemplate,{i18n:t,model:o.extend({},i.attributes),skipLocation:!!this.options.skipLocation,isEmbedded:this.options.isEmbedded,isEditMode:this.options.isEditMode}),buttons:[{label:t[r],action:"save",primary:!0},{label:t["resource.datasource.saveDialog.cancel"],action:"cancel",primary:!1}]}),this.on("button:save",o.bind(this._onSaveDialogSaveButtonClick,this)),this.on("button:cancel",o.bind(this._onSaveDialogCancelButtonClick,this))},initialize:function(e){a.prototype.initialize.apply(this,arguments),!o.isUndefined(this.preSelectedFolder)&&this.preSelectedFolder||(this.preSelectedFolder="/"),e.skipLocation||this.initializeTree(),this.listenTo(this.model,"change:label",this._onDataSourceNameChange),this.$contentContainer.find("[name=name]").change(o.bind(this._onResourceIDInputChange,this))},restoreModel:function(){this.originalModelValidation&&(this.model.validation=this.originalModelValidation)},extendModel:function(e){return this.originalModelValidation=e.validation,e.validation=o.extend({},i.prototype.validation,{label:[{required:!0,msg:t["resource.datasource.saveDialog.validation.not.empty.label"]},{maxLength:i.settings.LABEL_MAX_LENGTH,msg:t["resource.datasource.saveDialog.validation.too.long.label"]}],name:[{required:!0,msg:t["resource.datasource.saveDialog.validation.not.empty.name"]},{maxLength:i.settings.NAME_MAX_LENGTH,msg:t["resource.datasource.saveDialog.validation.too.long.name"]},{doesNotContainSymbols:i.settings.NAME_NOT_SUPPORTED_SYMBOLS,msg:t["resource.datasource.saveDialog.validation.invalid.chars.name"]}],description:[{required:!1},{maxLength:i.settings.DESCRIPTION_MAX_LENGTH,msg:t["resource.datasource.saveDialog.validation.too.long.description"]}],parentFolderUri:[{fn:function(e){if(!this.options.skipLocation){if(o.isNull(e)||o.isUndefined(e)||o.isString(e)&&""===e)return t["resource.datasource.saveDialog.validation.not.empty.parentFolderIsEmpty"];if("/"!==e.slice(0,1))return t["resource.datasource.saveDialog.validation.folder.not.found"].replace("{0}",e)}}}]}),e},initializeTree:function(){this.foldersTree=n({processors:["folderTreeProcessor","treeNodeProcessor","i18nItemProcessor","filterPublicFolderProcessor","cssClassItemProcessor","fakeUriProcessor"],treeBufferSize:s.treeLevelLimit,types:[l.FOLDER],tooltipOptions:{}}),this.listenTo(this.foldersTree,"selection:change",function(e){var t;e&&o.isArray(e)&&e[0]&&e[0].uri&&(t=e[0].uri),t&&this.model.set("parentFolderUri",t)}),this.$el.find(".treeBox .folders").append(this.foldersTree.render().el);var e=this.foldersTree.$el.parent().parent().parent();this.foldersTree._selectTreeNode(this.preSelectedFolder,e)},startSaveDialog:function(){this._openDialog()},_openDialog:function(){this.theDialogIsOpen||(this.bindValidation(),a.prototype.open.apply(this,arguments),this.$contentContainer.find("[name=label]").focus(),this.theDialogIsOpen=!0)},_closeDialog:function(){this.theDialogIsOpen&&(this.unbindValidation(),this.clearValidationErrors(),a.prototype.close.apply(this,arguments),this.theDialogIsOpen=!1)},_getLabelForSaveButton:function(){return"resource.datasource.saveDialog.save"},_onDialogResize:function(){var e=this,o=0,t=this.$contentContainer.find(".control.groupBox.treeBox"),i=this.$contentContainer.closest(".jr-mDialog > .jr-mDialog-body");this.$contentContainer.children().not(t).each(function(){o+=e.$(this).outerHeight(!0)}),t.height(i.outerHeight(!0)-o-40)},_onDataSourceNameChange:function(){if(this.autoUpdateResourceID){var e=i.generateResourceName(this.model.get("label"));this.model.set("name",e),this.$("input[name='name']").val(e)}},_onResourceIDInputChange:function(){this.autoUpdateResourceID=!1},_onSaveDialogCancelButtonClick:function(){this.restoreModel(),this._closeDialog()},_onSaveDialogSaveButtonClick:function(){this.model.isValid(!0)&&this.performSave()},performSave:function(){if(this.options.saveFn)return void this.options.saveFn(this.model.attributes,this.model);this.model.save({},{success:o.bind(this._saveSuccessCallback,this),error:o.bind(this._saveErrorCallback,this)})},_saveSuccessCallback:function(e){this._closeDialog(),o.isFunction(this.options.success)&&this.options.success(e)},_saveErrorCallback:function(e,i,a){var r=this,s=!1,n=!1;try{s=JSON.parse(i.responseText)}catch(e){}o.isArray(s)||(s=[s]),o.each(s,function(e){var o=!1,i=!1;e&&(r.theDialogIsOpen&&("version.not.match"===e.errorCode?(o="name",i=t["resource.dataSource.resource.alreadyInUse"]):"mandatory.parameter.error"===e.errorCode?e.parameters&&e.parameters[0]&&(i=t["resource.datasource.saveDialog.parameterIsMissing"],o=e.parameters[0].substr(e.parameters[0].indexOf(".")+1)):"illegal.parameter.value.error"===e.errorCode?e.parameters&&e.parameters[0]&&(o=e.parameters[0].substr(e.parameters[0].indexOf(".")+1),i=t["resource.datasource.saveDialog.parameterIsWrong"]):"folder.not.found"===e.errorCode?(o="parentFolderUri",i=t["ReportDataSourceValidator.error.folder.not.found"].replace("{0}",e.parameters[0])):"access.denied"===e.errorCode&&(o="parentFolderUri",i=t["jsp.accessDenied.errorMsg"])),i&&o&&-1!==["label","name","description","parentFolderUri"].indexOf(o)&&(r.invalidField("[name="+o+"]",i),n=!0))}),!1===n&&o.isFunction(this.options.error)&&this.options.error(e,i,a)}})});