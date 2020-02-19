define(["require","exports","module","underscore","jquery","./JdbcDataSourceModel","./BaseDataSourceModel","../collection/JdbcDriverCollection","../enum/connectionTypes","runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes","bundle!jasperserver_messages","settings!awsSettings","bundle!jasperserver_config","../util/settingsUtility"],function(e,r,t){var s=e("underscore"),i=e("jquery"),o=e("./JdbcDataSourceModel"),a=e("./BaseDataSourceModel"),n=e("../collection/JdbcDriverCollection"),d=e("../enum/connectionTypes"),l=e("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes"),u=e("bundle!jasperserver_messages"),c=e("settings!awsSettings"),v=e("bundle!jasperserver_config"),p=e("../util/settingsUtility"),m=o.extend({otherDriverIsPresent:!1,type:l.AZURE_SQL_DATA_SOURCE,defaults:function(){var e={};return s.extend(e,o.prototype.defaults,{subscriptionId:"",keyStorePassword:"",keyStoreUri:"",serverName:"",dbName:"",selectedDriverClass:"",useMicrosoftDriver:!1,microsoftDriverAvailable:!1,connectionType:d.AZURE_SQL}),e}(),validation:function(){var e={};return s.extend(e,o.prototype.validation,{subscriptionId:[{required:!0,msg:u["ReportDataSourceValidator.error.azureSqlDataSource.subscriptionId"]}],keyStorePassword:[{required:!0,msg:u["ReportDataSourceValidator.error.azureSqlDataSource.keyStorePassword"]}],keyStoreUri:[{required:!0,msg:u["ReportDataSourceValidator.error.azureSqlDataSource.keyStoreUri"]}],serverName:[{required:!0,msg:u["ReportDataSourceValidator.error.azureSqlDataSource.serverName"]}],dbName:[{required:!0,msg:u["ReportDataSourceValidator.error.not.empty.reportDataSource.dbNameIsEmpty"]}],username:[{required:!0,msg:u["ReportDataSourceValidator.error.not.empty.reportDataSource.username"]}]}),e}(),initialize:function(e,r){a.prototype.initialize.apply(this,arguments);p.deepDefaults(r,{awsSettings:c});this.isNew()||(this.set("password",v["input.password.substitution"]),this.set("keyStorePassword",v["input.password.substitution"])),this.initialization=i.Deferred(),this.drivers=new n([],this.options);var t=this;this.drivers.fetch({reset:!0}).done(function(){t.isNew()?t.set("selectedDriverClass",t.drivers.getDriverByName("sqlserver").get("jdbcDriverClass")):t.set("selectedDriverClass",t.get("driverClass"));var e=t.drivers.getDriverByName("sqlserver_standard");null!=e&&(t.set("microsoftDriverAvailable",e.get("available")),t.set("useMicrosoftDriver",t.get("selectedDriverClass")===e.get("jdbcDriverClass"))),t.initialization.resolve()}),this.on("change:dbName change:serverName change:connectionUrlTemplate change:useMicrosoftDriver",this.updateConnectionUrl),this.on("change:useMicrosoftDriver",this.updateDriverClass)},updateConnectionUrl:function(){if(this.get("connectionUrlTemplate")){var e=this.pick(["dbName","serverName","dbPort"]);e.dbPort=1433;var r=this.drivers.getDriverByName("sqlserver_standard"),t=this.get("connectionUrlTemplate");this.get("useMicrosoftDriver")&&null!=r&&(e.serverName+=".database.windows.net",t=r.get("jdbcUrl")),e.dbHost=e.serverName;var s=this.replaceConnectionUrlTemplatePlaceholdersWithValues(t,e);this.set("connectionUrl",s)}},updateDriverClass:function(){var e=this.drivers.getDriverByName("sqlserver_standard"),r=this.get("useMicrosoftDriver")&&null!=e?"sqlserver_standard":"sqlserver",t=this.drivers.getDriverByName(r).get("jdbcDriverClass");this.set("selectedDriverClass",t),this.set("driverClass",t)},toJSON:function(){var e=o.prototype.toJSON.apply(this,arguments);return this.options.isEditMode&&e.keyStorePassword===v["input.password.substitution"]&&(e.keyStorePassword=null),e},getFullDbTreePath:function(){return this.get("serverName")&&this.get("dbName")?"/"+this.get("serverName")+"/"+this.get("dbName"):null}});t.exports=m});