define(["require","jquery","underscore","bundle!all","backbone","text!scheduler/template/editor/holidayCalendarTemplate.htm"],function(e){"use strict";var t=e("jquery"),a=e("underscore"),i=e("bundle!all"),l=e("backbone"),n=e("text!scheduler/template/editor/holidayCalendarTemplate.htm");return l.View.extend({initialize:function(){this.collection.on("reset",this.onReset,this)},onReset:function(){this.$el.empty().append(t(a.template(n,{i18n:i})));var e=this.$el.find(".calendarBlock"),l=this.$el.find("[name=calendarSelect]");if(e.removeClass("disabled").find("select").attr("disabled",!1),l.empty(""),0===this.collection.size())return l.append(t("<option>").attr("value","").text(i["report.scheduling.job.edit.trigger.calendars.nocalendars"])),void e.addClass("disabled").find("select").attr("disabled","disabled");l.append(t("<option>").attr("value","").text(i["label.none"])),this.collection.forEach(function(e){l.append(t("<option>").attr("value",e.id).text(e.id))},this)}})});